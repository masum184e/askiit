from textwrap import dedent

from langchain_core.messages import HumanMessage, SystemMessage

from app.logger import get_logger, StepTimer
from app.services.chat.llm_model import model
from app.services.chat.utils.query import content_to_text, extract_query
from app.services.chat.utils.types import GraphState

log = get_logger(__name__)

NODE_NAME = "qa"
HISTORY_TURNS = 6  # recent messages to include for follow-up questions
FALLBACK_MESSAGE = "Sorry, I couldn't generate a response right now. Please try again."
EMPTY_MESSAGE = "I didn't catch that. What would you like to ask?"

SYSTEM_PROMPT = dedent("""\
    You are a concise, friendly, student-oriented AI assistant for Software Engineering
    students at the Institute of Information Technology (IIT), Noakhali Science and
    Technology University (NSTU).

    You help with:
    - Software Engineering topics (algorithms, databases, OOP, architecture)
    - Projects, internships, and coding tips
    - General brainstorming, writing, and career advice

    Guidelines:
    - Keep answers brief and natural unless the user asks for a detailed explanation.
    - For greetings or small talk, reply simply without restating your role.
    - Reply in the language the user writes in.
    - You do NOT have access to the university's documents or student database in this
      mode. If asked about specific faculty, syllabus details, course plans, student
      records, or SPL projects, say you don't have that information here and suggest
      the course handbook, the department website, or an academic advisor.
    - Avoid hallucinations. If you're unsure, say so.

    Examples:
    User: Hi
    AI: Hi! How can I help?

    User: Who are you?
    AI: I'm here to help you with Software Engineering and NSTU-related questions.

    User: Can you explain quicksort?
    AI: Sure! Quicksort is a divide-and-conquer algorithm that sorts by partitioning
    the array around a pivot... (continue only if needed or asked)
""")


def build_messages(state: GraphState, query: str) -> list:
    """System prompt + recent history (if user_query is a message list) + current query."""
    messages = [SystemMessage(content=SYSTEM_PROMPT)]

    history = state.get("user_query")
    if isinstance(history, list) and len(history) > 1:
        # Everything except the latest message, limited to the last few turns.
        messages.extend(history[:-1][-HISTORY_TURNS:])

    messages.append(HumanMessage(content=query))
    return messages


async def qa_node(state: GraphState) -> GraphState:
    query = extract_query(state, prefer_normalized=True)
    failed = False

    if not query:
        log.warning("%s | empty query", NODE_NAME)
        answer = EMPTY_MESSAGE
    else:
        log.debug("%s | query=%r", NODE_NAME, query)
        try:
            with StepTimer(log, f"{NODE_NAME}.ainvoke"):
                response = await model.ainvoke(build_messages(state, query))
            answer = content_to_text(response.content).strip() or FALLBACK_MESSAGE
        except Exception:
            log.exception("%s | model call failed", NODE_NAME)
            answer = FALLBACK_MESSAGE
            failed = True

    log.debug(
        "%s | answer=%s...%s answer_len=%d failed=%s",
        NODE_NAME, answer[:5], answer[-5:], len(answer), failed
    )

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