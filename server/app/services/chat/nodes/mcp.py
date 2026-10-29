from decouple import config
import asyncio
from textwrap import dedent

from langchain.agents import create_agent
from langchain_mcp_adapters.client import MultiServerMCPClient

from app.logger import get_logger, StepTimer
from app.services.chat.llm_model import model
from app.services.chat.utils.query import content_to_text, extract_query
from app.services.chat.utils.types import GraphState

log = get_logger(__name__)

NODE_NAME = "mcp"
MCP_URL = config("ASK_IIT_MCP_URL", "http://127.0.0.1:8001/mcp")
TIMEOUT_S = 45
RECURSION_LIMIT = 12  # caps agent <-> tool round trips
FALLBACK_MESSAGE = "Sorry, I couldn't fetch the information right now. Please try again."
EMPTY_MESSAGE = "I didn't catch that. What would you like to ask?"
NO_RESULT_MESSAGE = "I couldn't find an answer."

SYSTEM_PROMPT = dedent("""\
    You answer questions about IIT, NSTU students, SPL projects, achievements,
    mentors, and related records using the provided tools.

    - Answer only from tool results. Never invent records, names, or numbers.
    - If the tools return nothing relevant, say you couldn't find it.
    - Keep answers concise and reply in the language the user writes in.
""")

_agent = None
_agent_lock = asyncio.Lock()


async def get_agent():
    """Build the MCP client, fetch tools and create the agent once; reuse afterwards."""
    global _agent
    if _agent is not None:
        return _agent
    async with _agent_lock:
        if _agent is None:
            client = MultiServerMCPClient(
                {"ask_iit": {"transport": "streamable_http", "url": MCP_URL}}
            )
            tools = await client.get_tools()
            log.info("%s | loaded %d tools: %s", NODE_NAME, len(tools), [t.name for t in tools])
            _agent = create_agent(model, tools, system_prompt=SYSTEM_PROMPT)
    return _agent


def reset_agent() -> None:
    global _agent
    _agent = None


async def mcp_node(state: GraphState) -> GraphState:
    global _agent
    query = extract_query(state, prefer_normalized=True)
    failed = False

    if not query:
        log.warning("%s | empty query", NODE_NAME)
        answer = EMPTY_MESSAGE
    else:
        log.debug("%s | query=%r", NODE_NAME, query)
        try:
            agent = await get_agent()
            with StepTimer(log, f"{NODE_NAME}.ainvoke"):
                response = await asyncio.wait_for(
                    agent.ainvoke(
                        {"messages": [{"role": "user", "content": query}]},
                        config={"recursion_limit": RECURSION_LIMIT},
                    ),
                    timeout=TIMEOUT_S,
                )
            answer = content_to_text(response["messages"][-1].content).strip() or NO_RESULT_MESSAGE
        except asyncio.TimeoutError:
            log.error("%s | timed out after %ss", NODE_NAME, TIMEOUT_S)
            answer, failed = FALLBACK_MESSAGE, True
            reset_agent()
        except Exception:
            log.exception("%s | agent call failed", NODE_NAME)
            answer, failed = FALLBACK_MESSAGE, True
            reset_agent()  # rebuild client/tools on next request

    log.debug("%s | answer_len=%d answer=%s...%s failed=%s", NODE_NAME, len(answer), answer[:5], answer[-5:], failed)

    trace = [
        *state.get("trace", []),
        {
            "step": NODE_NAME,
             "answer_len": len(answer),
             "failed": failed
        },
    ]

    return {
        **state, 
        "final_response": answer,
        "trace": trace
    }