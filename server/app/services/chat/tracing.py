import os
from decouple import config

from app.logger import get_logger

log = get_logger(__name__)


def setup_tracing() -> bool:
    api_key = config("LANGSMITH_API_KEY", default="")

    if not api_key:
        log.warning("LangSmith API key missing. Tracing disabled.")
        os.environ["LANGSMITH_TRACING"] = "false"
        return False

    os.environ["LANGSMITH_API_KEY"] = api_key
    os.environ["LANGSMITH_TRACING"] = config(
        "LANGSMITH_TRACING", default="true"
    )
    os.environ["LANGSMITH_PROJECT"] = config(
        "LANGSMITH_PROJECT", default="AskIIT"
    )
    os.environ["LANGSMITH_ENDPOINT"] = config(
        "LANGSMITH_ENDPOINT",
        default="https://api.smith.langchain.com",
    )

    log.info(
        "LangSmith tracing enabled (project: %s)",
        os.environ["LANGSMITH_PROJECT"],
    )

    return True


def get_config(
    thread_id: str,
    run_name: str,
    tags: list[str],
    request_id: str,
) -> dict:
    return {
        "configurable": {"thread_id": thread_id},
        "run_name": run_name,
        "tags": tags,
        "metadata": {"request_id": request_id},
    }