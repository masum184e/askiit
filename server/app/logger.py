import copy
import logging
import os
import sys
import time
from pathlib import Path

# Config
LOG_DIR = Path("output/logs")
LOG_LEVEL = logging.DEBUG
CONSOLE_LEVEL = logging.DEBUG
FILE_LEVEL = logging.DEBUG

DATE_FORMAT = "%Y-%m-%d %H:%M:%S"

# Plain format — goes into the log file (and into the console when not a TTY - Teletypewriter: text-based terminal interface).
FILE_FORMAT = "%(asctime)s | %(levelname)-8s | %(name)-25s | %(message)s"

# Console format — padding is done by ColorFormatter so ANSI codes don't count toward the width specifiers.
CONSOLE_FORMAT = "%(asctime)s | %(levelname)s | %(name)s | %(message)s"

# ANSI color helpers
RESET = "\033[0m"
DIM = "\033[2m"

LEVEL_COLORS = {
    "DEBUG":    "\033[36m",       # cyan
    "INFO":     "\033[32m",       # green
    "WARNING":  "\033[33m",       # yellow
    "ERROR":    "\033[31m",       # red
    "CRITICAL": "\033[1;37;41m",  # bold white on red
}


def _enable_ansi_windows() -> None:
    """Turn on VT100 escape handling on Windows 10+ consoles."""
    if sys.platform != "win32":
        return
    try:
        import colorama
        colorama.just_fix_windows_console()
    except ImportError:
        # Spawning an empty cmd enables VT processing process-wide.
        os.system("")


def _should_color(stream) -> bool:
    if os.environ.get("NO_COLOR"):      # https://no-color.org/
        return False
    if os.environ.get("FORCE_COLOR"):   # common convention, e.g. CI
        return True
    return hasattr(stream, "isatty") and stream.isatty()


class ColorFormatter(logging.Formatter):
    """logging.Formatter that colorizes level and logger name."""

    def format(self, record: logging.LogRecord) -> str:
        # Copy so we don't mutate the shared record (other handlers see the
        # same object — coloring it would also color the file output).
        record = copy.copy(record)
        color = LEVEL_COLORS.get(record.levelname, "")
        record.levelname = f"{color}{record.levelname:<8}{RESET}"
        record.name = f"{DIM}{record.name}{RESET}"
        return super().format(record)


_configured = False


def _configure_root():
    global _configured
    if _configured:
        return

    LOG_DIR.mkdir(parents=True, exist_ok=True)
    run_stamp = time.strftime("%Y%m%d_%H%M%S")
    log_file = LOG_DIR / f"run_{run_stamp}.log"

    root = logging.getLogger()
    root.setLevel(LOG_LEVEL)

    for noisy in ("matplotlib", "PIL", "urllib3", "tensorflow", "httpcore", "httpx"):
        logging.getLogger(noisy).setLevel(logging.WARNING)

    # --- Console: color if TTY, plain if piped ---
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(CONSOLE_LEVEL)
    if _should_color(sys.stdout):
        _enable_ansi_windows()
        console_handler.setFormatter(
            ColorFormatter(CONSOLE_FORMAT, datefmt=DATE_FORMAT)
        )
    else:
        console_handler.setFormatter(
            logging.Formatter(FILE_FORMAT, datefmt=DATE_FORMAT)
        )
    root.addHandler(console_handler)

    # --- File: never colored ---
    file_handler = logging.FileHandler(log_file, encoding="utf-8")
    file_handler.setLevel(FILE_LEVEL)
    file_handler.setFormatter(logging.Formatter(FILE_FORMAT, datefmt=DATE_FORMAT))
    root.addHandler(file_handler)

    # --- Route uvicorn's loggers through ours (works with log_config=None) ---
    for name in ("uvicorn", "uvicorn.error", "uvicorn.access"):
        lg = logging.getLogger(name)
        lg.handlers.clear()
        lg.propagate = True

    _configured = True
    root.info(f"Logging initialized -> {log_file}")


def get_logger(name: str) -> logging.Logger:
    _configure_root()
    return logging.getLogger(name)


class StepTimer:
    def __init__(self, logger: logging.Logger, step_name: str):
        self.logger = logger
        self.step_name = step_name
        self.start = None

    def __enter__(self):
        self.start = time.time()
        self.logger.info(f"START | {self.step_name}")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        elapsed = time.time() - self.start
        if exc_type is None:
            self.logger.info(f"DONE  | {self.step_name} ({elapsed:.2f}s)")
        else:
            self.logger.error(
                f"FAILED | {self.step_name} ({elapsed:.2f}s) -> {exc_val}",
                exc_info=True,
            )
        return False