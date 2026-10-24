from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from app.database import get_db
from app.services.database.spls import (
    list_spls_service,
    get_spl_service,
)
from app.utils.helper import error_response

router = APIRouter(tags=["SPLs"])


@router.get("/spls", response_class=JSONResponse)
async def list_spls(
    db: AsyncSession = Depends(get_db),
    search: str | None = Query(
        None, description="Search by SPL name or description"
    ),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
    category: str | None = Query(
        None, description="Filter by category: spl1, spl2, spl3"
    ),
):
    try:
        data = await list_spls_service(
            db=db,
            search=search,
            category=category,
            page=page,
            size=size,
        )
        return JSONResponse(status_code=200, content=data)

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=type(e).__name__,
            hint="Check database connection or query.",
            status_code=500,
        )
    except Exception as e:
        return error_response(
            error_type="ServerError",
            message=str(e),
            hint="Unexpected error while retrieving SPLs.",
            status_code=500,
        )


@router.get("/spls/{splid}", response_class=JSONResponse)
async def get_spl_by_id(
    splid: int,
    db: AsyncSession = Depends(get_db),
):
    try:
        spl = await get_spl_service(db=db, spl_id=splid)

        if spl is None:
            return error_response(
                error_type="NotFound",
                message=f"SPL with ID {splid} not found.",
                hint="Check the ID and try again.",
                status_code=404,
            )

        return JSONResponse(status_code=200, content=spl)

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=type(e).__name__,
            hint="Check database connection or model definitions.",
            status_code=500,
        )
    except Exception as e:
        return error_response(
            error_type="ServerError",
            message=str(e),
            hint="Unexpected error while retrieving SPL.",
            status_code=500,
        )
