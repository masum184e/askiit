
from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from app.database import get_db
from app.services.database.achievements import (
    list_achievements_service,
    get_achievement_service,
)
from app.utils.helper import error_response

router = APIRouter(tags=["Achievements"])


@router.get("/achievements", response_class=JSONResponse)
async def list_achievements(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(9, ge=1, le=50),
    search: str | None = Query(None),
):
    try:
        data = await list_achievements_service(
            db=db,
            page=page,
            size=size,
            search=search,
        )

        return JSONResponse(
            status_code=200,
            content=data,
        )

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=type(e).__name__,
            hint="Check database connection and query validity.",
            status_code=500,
        )

    except Exception as e:
        return error_response(
            error_type="ServerError",
            message=str(e),
            hint="Unexpected error occurred during achievement listing.",
            status_code=500,
        )


@router.get(
    "/achievements/{achievement_id}",
    response_class=JSONResponse,
)
async def get_achievement(
    achievement_id: int,
    db: AsyncSession = Depends(get_db),
):
    try:
        achievement = await get_achievement_service(
            db=db,
            achievement_id=achievement_id,
        )

        if achievement is None:
            return error_response(
                error_type="NotFound",
                message=f"Achievement with ID {achievement_id} not found.",
                hint="Check the ID and try again.",
                status_code=404,
            )

        return JSONResponse(
            status_code=200,
            content=achievement,
        )

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=type(e).__name__,
            hint="Check if the table/column exists and the connection is stable.",
            status_code=500,
        )

    except Exception as e:
        return error_response(
            error_type="ServerError",
            message=str(e),
            hint="Unexpected error occurred while retrieving achievement.",
            status_code=500,
        )
