from functools import lru_cache
from uuid import uuid4

from fastapi import APIRouter, Request
from pydantic import BaseModel, Field

from app.services.chat.utils.types import GraphState
from app.services.chat.graph import build_graph
from app.services.chat.tracing import get_config
from app.utils.helper import error_response
from app.logger import get_logger, StepTimer

log = get_logger(__name__)

router = APIRouter()


class ChatRequest(BaseModel):
    input: str = Field(..., max_length=2000)
    thread_id: str | None = Field(None, max_length=64)


@lru_cache(maxsize=1)
def _get_graph():
    """Build the graph once and reuse it across requests."""
    with StepTimer(log, "build_graph"):
        return build_graph()


@router.post("/chat")
async def ask(payload: ChatRequest, request: Request):
    user_query = payload.input.strip()

    if not user_query:
        log.warning("Rejected empty query (session=%s)", payload.thread_id)
        return error_response(
            error_type="ValidationError",
            message="Please provide a question.",
            hint="The 'input' field must not be empty.",
            status_code=400,
        )

    thread_id = payload.thread_id or str(uuid4())
    request_id = request.headers.get("x-request-id", "-")[:64]

    log.info(
        "chat request | req=%s thread=%s len=%d",
        request_id, thread_id, len(user_query),
    )
    log.debug("chat query | thread=%s query=%r", thread_id, user_query)

    initial_state: GraphState = {
        "user_query": user_query,
        "trace": [],
    }

    graph = _get_graph()

    with StepTimer(log, f"graph.ainvoke [thread={thread_id}]"):
        new_state = await graph.ainvoke(
            initial_state,
            config=get_config(
                thread_id = thread_id,
                run_name="askiit_chat",
                tags=["graph"],
                request_id = request_id
            ),
        )

    answer = new_state.get("final_response")
    trace = new_state.get("trace", [])

    log.info(
        "chat done | req=%s thread=%s answer_len=%s trace_steps=%d",
        request_id,
        thread_id,
        len(answer) if isinstance(answer, str) else type(answer).__name__,
        len(trace),
    )

    return {
        "thread_id": thread_id,
        "answer": answer,
        "trace": trace,
    }
