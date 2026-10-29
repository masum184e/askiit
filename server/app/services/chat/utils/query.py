from app.services.chat.utils.types import GraphState

def extract_query(state: GraphState, prefer_normalized: bool = False) -> str:
    """Return the latest user text from a string or a list of LangChain messages."""
    query = (state.get("normalized_query") if prefer_normalized else None) or state.get("user_query", "")
    if isinstance(query, str):
        return query.strip()
    return next(
        (m.content for m in reversed(query) if getattr(m, "type", None) == "human"),
        "",
    ).strip()


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