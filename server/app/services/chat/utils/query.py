from app.services.chat.utils.types import GraphState

def extract_raw_query(state: GraphState) -> str:
    """Latest user text exactly as the user sent it. Only the normalizer should use this."""
    query = state.get("user_query", "")
    if isinstance(query, str):
        return query.strip()
    for m in reversed(query or []):
        if getattr(m, "type", None) == "human":
            return content_to_text(m.content).strip()
    return ""


def extract_query(state: GraphState) -> str:
    """Normalized query for every node after the normalizer (falls back to raw)."""
    return (state.get("normalized_query") or "").strip() or extract_raw_query(state)

def content_to_text(content) -> str:
    """Some providers return a list of content blocks instead of a string."""
    if isinstance(content, str):
        return content
    parts = []
    for block in content or []:
        if isinstance(block, str):
            parts.append(block)
        elif isinstance(block, dict) and block.get("type") == "text":
            parts.append(block.get("text", ""))
    return "".join(parts)