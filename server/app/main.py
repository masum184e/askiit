
import time
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from sqlalchemy.exc import SQLAlchemyError

from app.logger import get_logger, StepTimer
from app.routers import chat, achievements, students, spls
from app.services.chat.tracing import setup_tracing
from app.database import engine
from app.utils.helper import error_response
from app.utils.log_color import (
    color_for_status,
    FAILED_COLOR,
    RESET,
    REQUEST_COLOR,
)

log = get_logger(__name__)


# Lifespan
@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("Starting AskIIT API...")

    # Database connectivity check
    try:
        log.info("Checking database connection...")

        async with engine.connect() as conn:
            await conn.execute(text("SELECT 1"))

        log.info("Database connection successful")

    except Exception:
        log.exception("Database connection failed")

    # Shutdown
    yield

    log.info("AskIIT API shutting down")

    # Dispose database connections
    try:
        await engine.dispose()
        log.info("Database connections closed")
    except Exception:
        log.exception("Database shutdown failed")


# Application startup
log.info("Booting AskIIT API...")

# Tracing setup
try:
    with StepTimer(log, "Tracing setup"):
        setup_tracing()
except Exception:
    log.exception("Tracing initialization failed")


app = FastAPI(
    title="AskIIT API",
    description="AskIIT Backend API",
    version="1.0.0",
    lifespan=lifespan,
)


# Exception handlers
@app.exception_handler(SQLAlchemyError)
async def sqlalchemy_handler(request: Request, exc: SQLAlchemyError):
    log.exception(
        "DB error | %s %s",
        request.method,
        request.url.path,
    )

    return error_response(
        error_type="DatabaseError",
        message="Database error.",
        hint="Check the database connection or query.",
        status_code=500,
    )


@app.exception_handler(Exception)
async def unhandled_handler(request: Request, exc: Exception):
    log.exception(
        "Unhandled error | %s %s",
        request.method,
        request.url.path,
    )

    return error_response(
        error_type="ServerError",
        message="Internal server error.",
        hint="Unexpected server error.",
        status_code=500,
    )


# Request logging middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    start = time.perf_counter()

    log.debug(
        "%s--> %s %s%s",
        REQUEST_COLOR,
        request.method,
        request.url.path,
        RESET,
    )

    try:
        response = await call_next(request)

    except Exception:
        elapsed = time.perf_counter() - start

        log.error(
            "%s<-- %s %s FAILED after %.3fs%s",
            FAILED_COLOR,
            request.method,
            request.url.path,
            elapsed,
            RESET,
        )

        raise

    elapsed = time.perf_counter() - start
    color = color_for_status(response.status_code)

    log.info(
        "%s<-- %s %s %d (%.3fs)%s",
        color,
        request.method,
        request.url.path,
        response.status_code,
        elapsed,
        RESET,
    )

    return response


# CORS
ALLOWED_ORIGINS = [
    "https://askiit.vercel.app",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
_ROUTERS = [
    (chat.router, "Chat"),
    (achievements.router, "Achievements"),
    (students.router, "Students"),
    (spls.router, "SPLs"),
]

for router, tag in _ROUTERS:
    app.include_router(router, prefix="/api", tags=[tag])
    log.info("Registered router '%s' under /api", tag)


# Health check
@app.get("/health", tags=["Health"])
async def health():
    return {"status": "healthy"}


# Root endpoint
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "AskIIT FastAPI backend is running",
        "status": "healthy",
    }


# Local development entry point
if __name__ == "__main__":
    import uvicorn

    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_config=None,
    )
