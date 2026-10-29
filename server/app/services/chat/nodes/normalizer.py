from app.logger import get_logger
from app.services.chat.utils.types import GraphState
from app.services.chat.utils.query import extract_raw_query

log = get_logger(__name__)

NODE_NAME = "normalizer"

def normalizer_node(state: GraphState) -> GraphState:
    raw = extract_raw_query(state)
    normalized = raw.lower().strip()
    
    log.debug("%s | raw=%r -> normalized=%r", NODE_NAME, raw, normalized)
    if not normalized:
        log.warning("%s | produced empty normalized query", NODE_NAME)

    trace = [
        *state.get("trace", []),
        {
            "step": NODE_NAME,
            "input_len": len(raw),
            "normalized": normalized,
        },
    ]

    return {
        **state,
        "normalized_query": normalized,
        "trace": trace,
    }