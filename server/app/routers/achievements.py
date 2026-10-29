from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.services.database.achievements import (
    list_achievements_service,
    get_achievement_service,
)
from app.utils.helper import error_response
from app.logger import get_logger, StepTimer

log = get_logger(__name__)

router = APIRouter()


@router.get("/achievements", response_class=JSONResponse)
async def list_achievements(
    db: AsyncSession = Depends(get_db),
    search: str | None = Query(
        None, max_length=100, description="Search achievements"
    ),
    page: int = Query(1, ge=1),
    size: int = Query(9, ge=1, le=50),
):
    log.info(
        "list_achievements | page=%d size=%d search=%r",
        page, size, search
    )

    with StepTimer(log, f"list_achievements_service [page={page} size={size}]"):
        data = await list_achievements_service(
            db=db,
            search=search,
            page=page,
            size=size,
        )

    total = data.get("total") if isinstance(data, dict) else None
    log.info(
        "list_achievements done | page=%d size=%d search=%r  total=%s",
        page, size, search, total,
    )
    return JSONResponse(status_code=200, content=data)


@router.get("/achievements/{achievement_id}", response_class=JSONResponse)
async def get_achievement(
    achievement_id: int,
    db: AsyncSession = Depends(get_db),
):
    log.info("get_achievement | id=%d", achievement_id)

    with StepTimer(log, f"get_achievement_service [id={achievement_id}]"):
        achievement = await get_achievement_service(
            db=db,
            achievement_id=achievement_id,
        )

    if achievement is None:
        log.info("get_achievement not found | id=%d", achievement_id)
        return error_response(
            error_type="NotFound",
            message=f"Achievement with ID {achievement_id} not found.",
            hint="Check the ID and try again.",
            status_code=404,
        )

    log.info("get_achievement done | id=%d", achievement_id)
    return JSONResponse(status_code=200, content=achievement)