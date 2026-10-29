from app.logger import get_logger, StepTimer
log = get_logger(__name__)

import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

from app.routers import chat, achievements, students, spls
from app.services.chat.tracing import setup_tracing
from app.database import engine
from sqlalchemy import text 

from app.utils.log_color import STATUS_COLORS, color_for_status, FAILED_COLOR, RESET, REQUEST_COLOR

# Lifespan: log clean startup / shutdown events
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("Warming DB pool…")
    try:
        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))
        log.info("DB pool warm — startup complete")
    except Exception:
        log.exception("DB warm-up failed — first request may be slow")
    yield
    log.info("AskIIT API shutting down")


# App + tracing
log.info("Booting AskIIT API…")

with StepTimer(log, "Tracing setup"):
    setup_tracing()

app = FastAPI(title="AskIIT API", lifespan=lifespan)

# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.time()
    log.debug(
        "%s--> %s %s%s",
        REQUEST_COLOR, request.method, request.url.path, RESET,
    )

    try:
        response = await call_next(request)
    except Exception as exc:
        elapsed = time.time() - start
        log.error(
            "%s<-- %s %s FAILED after %.3fs: %s%s",
            FAILED_COLOR, request.method, request.url.path, elapsed, exc, RESET,
            exc_info=True,
        )
        raise

    elapsed = time.time() - start
    color = color_for_status(response.status_code)
    log.info(
        "%s<-- %s %s %d (%.3fs)%s",
        color, request.method, request.url.path,
        response.status_code, elapsed, RESET,
    )
    return response


# CORS
ALLOWED_ORIGINS = [
    "https://askiit.vercel.app",
    "http://localhost:3000",
]
log.info("CORS allowed origins: %s", ALLOWED_ORIGINS)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
_ROUTERS = [
    (chat.router,         "Chat"),
    (achievements.router, "Achievements"),
    (students.router,     "Students"),
    (spls.router,         "SPL"),
]

for router, tag in _ROUTERS:
    app.include_router(router, prefix="/api", tags=[tag])
    log.info("Registered router '%s' under /api", tag)


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    log.info("Root health-check hit")
    return {"message": "AskIIT FastAPI backend is running"}


# Entry point
if __name__ == "__main__":
    import uvicorn

    log.info("Launching uvicorn -> http://127.0.0.1:8000 (reload=True)")
    uvicorn.run(
        "main:app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        log_config=None,
    )