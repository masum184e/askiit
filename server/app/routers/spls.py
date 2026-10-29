from enum import Enum

from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.services.database.spls import (
    list_spls_service,
    get_spl_service,
)
from app.utils.helper import error_response
from app.logger import get_logger, StepTimer

log = get_logger(__name__)

router = APIRouter()


class SplCategory(str, Enum):
    spl1 = "spl1"
    spl2 = "spl2"
    spl3 = "spl3"


@router.get("/spls", response_class=JSONResponse)
async def list_spls(
    db: AsyncSession = Depends(get_db),
    search: str | None = Query(
        None, max_length=100, description="Search by SPL name or description"
    ),
    category: SplCategory | None = Query(None, description="Filter by category"),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
):
    log.info(
        "list_spls | page=%d size=%d search=%r category=%s",
        page, size, search, cat,
    )

    with StepTimer(log, f"list_spls_service [page={page} size={size}]"):
        data = await list_spls_service(
            db=db,
            search=search,
            category=cat,
            page=page,
            size=size,
        )

    total = data.get("total") if isinstance(data, dict) else None
    log.info(
        "list_spls done | search=%r page=%d size=%d category=%s total=%s",
        page, size, search, cat, total,
    )
    return JSONResponse(status_code=200, content=data)


@router.get("/spls/{spl_id}", response_class=JSONResponse)
async def get_spl(
    spl_id: int,
    db: AsyncSession = Depends(get_db),
):
    log.info("get_spl | id=%d", spl_id)

    with StepTimer(log, f"get_spl_service [id={spl_id}]"):
        spl = await get_spl_service(db=db, spl_id=spl_id)

    if spl is None:
        log.info("get_spl not found | id=%d", spl_id)
        return error_response(
            error_type="NotFound",
            message=f"SPL with ID {spl_id} not found.",
            hint="Check the ID and try again.",
            status_code=404,
        )

    log.info("get_spl done | id=%d", spl_id)
    return JSONResponse(status_code=200, content=spl)