from app.services.chat.utils.types import GraphState
from app.services.chat.model import model

def normalizer_node(state: GraphState) -> GraphState:
    messages = state.get("user_query", [])
    last_user_message = next((m.content for m in reversed(messages) if m.type == "human"), "")

    normalized = last_user_message.lower().strip()
    print(f"Normailzer Node: {normalized}")

    trace = state.get("trace", [])
    trace.append({"step": "normalizer", "normalized": normalized})

    return {
        **state,
        "normalized_query": normalized,
        "trace": trace,
    }
