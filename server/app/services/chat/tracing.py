import os
from decouple import config

from app.logger import get_logger

log = get_logger(__name__)

def setup_tracing() -> bool:

    api_key = config("LANGSMITH_API_KEY")
    if not api_key:
        log.warning("LANGSMITH_API_KEY not set. Tracing is disabled.")
        os.environ["LANGSMITH_TRACING"] = "false"
        return False

    os.environ["LANGSMITH_TRACING"] = config("LANGSMITH_TRACING")
    os.environ.setdefault("LANGSMITH_PROJECT", config("LANGSMITH_PROJECT"))
    os.environ.setdefault("LANGSMITH_ENDPOINT", config("LANGSMITH_ENDPOINT"))

    # Uncomment if the chat contains sensitive student data:
    # os.environ["LANGSMITH_HIDE_INPUTS"] = "true"
    # os.environ["LANGSMITH_HIDE_OUTPUTS"] = "true"

    log.info("LangSmith tracing enabled (project: %s)", os.environ["LANGSMITH_PROJECT"])
    return True


def get_config(thread_id: str, run_name: str, tags: list[str], request_id: str) -> dict:
    """Config for graph.ainvoke(): checkpointer thread + LangSmith metadata."""
    return {
        "configurable": {"thread_id": thread_id},
        "run_name": run_name,
        "tags": tags,
        "metadata": {
            "request_id": request_id,
        },
    }