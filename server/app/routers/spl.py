from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError
from app.database import get_db
from app.models.spl import SPL

router = APIRouter(tags=["SPL"])

def spl_to_hateoas(s: SPL):
    return {
        "spl_id": s.spl_id,
        "name": s.name,
        "github": s.github,
        "live": s.live,
        "mentor": s.mentor,
        "overview": s.overview,
        "banner": s.banner,
        "created_at": str(s.created_at),
        "updated_at": str(s.updated_at),
        "_links": {
            "self": {"href": f"/spl/{s.spl_id}"},
            "all": {"href": "/spl"},
        }
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

@router.get("/spl", response_class=JSONResponse)
async def list_spl(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(9, ge=1, le=100),
    mentor: str | None = Query(None),
    search: str | None = Query(None),
):
    try:
        query = select(SPL).where(SPL.deleted_at.is_(None))

        if mentor:
            query = query.where(SPL.mentor.ilike(f"%{mentor}%"))

        if search:
            query = query.where(SPL.name.ilike(f"%{search}%"))

        count_result = await db.execute(select(func.count()).select_from(query.subquery()))
        total = count_result.scalar_one()

        offset = (page - 1) * size
        paginated_query = query.offset(offset).limit(size)
        result = await db.execute(paginated_query)
        spls = result.scalars().all()

        data = [spl_to_hateoas(s) for s in spls]

        def build_page_link(p: int):
            params = [f"page={p}", f"size={size}"]
            if mentor:
                params.append(f"mentor={mentor}")
            if search:
                params.append(f"search={search}")
            return "/spl?" + "&".join(params)

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
                "spl": data
            }
        })

    except SQLAlchemyError as e:
        return error_response("DatabaseError", str(e.__class__.__name__), "Check DB query/connection.", 500)

    except Exception as e:
        return error_response("ServerError", str(e), "Unexpected server error while listing SPLs.", 500)


@router.get("/spl/{spl_id}", response_class=JSONResponse)
async def get_spl(spl_id: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(
            select(SPL).where(SPL.spl_id == spl_id, SPL.deleted_at.is_(None))
        )
        spl = result.scalar_one_or_none()

        if not spl:
            return error_response(
                "NotFound",
                f"SPL with ID {spl_id} not found.",
                "Check the SPL ID.",
                404
            )

        return JSONResponse(status_code=200, content=spl_to_hateoas(spl))

    except SQLAlchemyError as e:
        return error_response("DatabaseError", str(e.__class__.__name__), "Check DB access.", 500)

    except Exception as e:
        return error_response("ServerError", str(e), "Unexpected error while fetching SPL.", 500)
