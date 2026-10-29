import os
import sys

_COLOR_ENABLED = os.environ.get("NO_COLOR") is None and sys.stdout.isatty()

def _c(code: str) -> str:
    """Return the ANSI escape for `code`, or '' if colors are disabled."""
    return f"\033[{code}m" if _COLOR_ENABLED else ""


RESET = _c("0")

# Request vs response colors (always distinct)
REQUEST_COLOR = _c("35")    # magenta      →  request line (-->)
FAILED_COLOR  = _c("1;31")  # bold red     →  unhandled exception

# Fallback colors by status-code family
SUCCESS_COLOR  = _c("32")   # green        →  2xx
REDIRECT_COLOR = _c("36")   # cyan         →  3xx
CLIENT_COLOR   = _c("33")   # yellow       →  4xx
SERVER_COLOR   = _c("31")   # red          →  5xx
UNKNOWN_COLOR  = _c("37")   # white        →  anything else

# Optional exact-match overrides (takes precedence over family colors).
# Add/remove entries to give individual status codes their own color.
STATUS_COLORS = {
    200: _c("32"),    # green
    201: _c("1;32"),  # bold green
    204: _c("2;32"),  # dim green
    301: _c("36"),    # cyan
    304: _c("2;36"),  # dim cyan
    400: _c("33"),    # yellow
    401: _c("1;33"),  # bold yellow
    403: _c("1;33"),
    404: _c("1;33"),
    422: _c("33"),
    500: _c("1;31"),  # bold red
    502: _c("31"),
    503: _c("31"),
}


def color_for_status(status_code: int) -> str:
    """Return the ANSI color for a given HTTP status code."""
    if status_code in STATUS_COLORS:
        return STATUS_COLORS[status_code]
    if 200 <= status_code < 300:
        return SUCCESS_COLOR
    if 300 <= status_code < 400:
        return REDIRECT_COLOR
    if 400 <= status_code < 500:
        return CLIENT_COLOR
    if 500 <= status_code < 600:
        return SERVER_COLOR
    return UNKNOWN_COLOR
