import re

import httpx

from app.logger import get_logger
from app.services.chat.utils.query import extract_query
from app.services.chat.utils.types import GraphState

log = get_logger(__name__)

NODE_NAME = "cf"
API_URL = "https://codeforces.com/api/user.info"
TIMEOUT_S = 8.0

EMPTY_MESSAGE = "Please provide a Codeforces handle, e.g. \"rating of tourist\"."
UNAVAILABLE_MESSAGE = "Codeforces isn't responding right now. Please try again in a moment."

# Codeforces handles: 3-24 chars of letters, digits, underscore, hyphen, dot
_TOKEN_RE = re.compile(r"[A-Za-z0-9_.\-]{3,24}")
_PROFILE_URL_RE = re.compile(r"codeforces\.com/profile/([A-Za-z0-9_.\-]{3,24})", re.I)
_STOPWORDS = {
    "the", "and", "for", "has", "are", "was", "not", "can", "you", "your", "his", "her",
    "what", "whats", "show", "get", "tell", "give", "find", "check", "see", "about", "with",
    "codeforces", "cf", "handle", "user", "profile", "rating", "rank", "info", "stats",
    "max", "current", "contribution", "please", "from", "this", "that", "who",
}


def extract_handle(text: str) -> str:
    match = _PROFILE_URL_RE.search(text)
    if match:
        return match.group(1)
    candidates = [t.strip(".-") for t in _TOKEN_RE.findall(text)]
    candidates = [t for t in candidates if len(t) >= 3 and t.lower() not in _STOPWORDS]
    return candidates[-1] if candidates else ""


def format_user(u: dict) -> str:
    handle = u["handle"]
    return (
        f"Codeforces user: {handle}\n"
        f"- Rating: {u.get('rating', 'Unrated')}\n"
        f"- Max rating: {u.get('maxRating', 'N/A')}\n"
        f"- Rank: {u.get('rank', 'Unranked')}\n"
        f"- Max rank: {u.get('maxRank', 'N/A')}\n"
        f"- Contribution: {u.get('contribution', 0)}\n"
        f"- Profile: https://codeforces.com/profile/{handle}"
    )


async def fetch_user(handle: str) -> tuple[int, dict]:
    async with httpx.AsyncClient(timeout=TIMEOUT_S) as client:
        resp = await client.get(API_URL, params={"handles": handle})
    try:
        data = resp.json()
    except ValueError:
        data = {}
    return resp.status_code, data


async def cf_node(state: GraphState) -> GraphState:
    query = extract_query(state)
    handle = extract_handle(query)
    outcome = "ok"

    if not handle:
        log.warning("%s | no handle found in query=%r", NODE_NAME, query)
        answer, outcome = EMPTY_MESSAGE, "no_handle"
    else:
        log.debug("%s | handle=%r", NODE_NAME, handle)
        try:
            status_code, data = await fetch_user(handle)

            if data.get("status") == "OK" and data.get("result"):
                answer = format_user(data["result"][0])
            elif "not found" in str(data.get("comment", "")).lower():
                answer = f"I couldn't find a Codeforces user with the handle '{handle}'."
                outcome = "not_found"
            else:
                log.error("%s | unexpected response: http=%s body=%r", NODE_NAME, status_code, data)
                answer, outcome = UNAVAILABLE_MESSAGE, "api_error"
        except httpx.TimeoutException:
            log.error("%s | timeout fetching handle=%r", NODE_NAME, handle)
            answer, outcome = UNAVAILABLE_MESSAGE, "timeout"
        except httpx.HTTPError:
            log.exception("%s | request failed for handle=%r", NODE_NAME, handle)
            answer, outcome = UNAVAILABLE_MESSAGE, "http_error"

    log.info("%s | handle=%r outcome=%s", NODE_NAME, handle, outcome)

    trace = [
        *state.get("trace", []),
        {
            "step": NODE_NAME,
            "handle": handle,
            "outcome": outcome
        },
    ]
    return {
        **state, 
        "final_response": answer, 
        "trace": trace
    }