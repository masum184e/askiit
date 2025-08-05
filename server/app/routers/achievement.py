from fastapi import FastAPI, Depends, HTTPException, APIRouter, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError, DBAPIError
from app.database import get_db
from app.models.achievement import Achievement

router = APIRouter(tags=["Achievements"])


def achievement_to_hateoas(a: Achievement):
    return {
        "achievement_id": a.achievement_id,
        "competition_name": a.competition_name,
        "position": a.position,
        "overview": a.overview,
        "created_at": str(a.created_at),
        "updated_at": str(a.updated_at),
        "_links": {
            "self": {"href": f"/achievements/{a.achievement_id}"},
            "all": {"href": "/achievements"},
        },
    }


def error_response(error_type: str, message: str, hint: str, status_code: int):
    return JSONResponse(status_code=status_code, content={
        "error": {
            "type": error_type,
            "message": message,
            "hint": hint,
            "status_code": status_code
        }
    })


@router.get("/achievements", response_class=JSONResponse)
async def list_achievements(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(9, ge=1, le=9),
    search: str | None = Query(None),
):
    try:
        query = select(Achievement).where(Achievement.deleted_at.is_(None))

        if search:
            query = query.where(Achievement.competition_name.ilike(f"%{search}%"))

        # Total count
        count_result = await db.execute(select(func.count()).select_from(query.subquery()))
        total = count_result.scalar_one()

        offset = (page - 1) * size
        paginated_query = query.offset(offset).limit(size)
        result = await db.execute(paginated_query)
        achievements = result.scalars().all()

        data = [achievement_to_hateoas(a) for a in achievements]

        def build_page_link(p: int):
            params = [f"page={p}", f"size={size}"]
            if search:
                params.insert(0, f"search={search}")
            return "/achievements?" + "&".join(params)

        last_page = max((total + size - 1) // size, 1)

        return JSONResponse(status_code=200, content={
            "_links": {
                "self": {"href": build_page_link(page)},
                "first": {"href": build_page_link(1)},
                "last": {"href": build_page_link(last_page)},
                "prev": {"href": build_page_link(page - 1)} if page > 1 else None,
                "next": {"href": build_page_link(page + 1)} if page < last_page else None,
            },
            "page": page,
            "size": size,
            "total": total,
            "_embedded": {
                "achievements": data
            }
        })

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=str(e.__class__.__name__),
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


@router.get("/achievements/{achievement_id}", response_class=JSONResponse)
async def get_achievement(achievement_id: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(
            select(Achievement).where(Achievement.achievement_id == achievement_id)
        )
        achievement = result.scalar_one_or_none()

        if not achievement:
            return error_response(
                error_type="NotFound",
                message=f"Achievement with ID {achievement_id} not found.",
                hint="Check the ID and try again.",
                status_code=404,
            )

        return JSONResponse(status_code=200, content=achievement_to_hateoas(achievement))

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=str(e.__class__.__name__),
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
