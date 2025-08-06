from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import or_

from app.database import get_db
from app.models.spl import SPL
from app.utils.helper import error_response

router = APIRouter(tags=["SPLs"])

def spl_to_hateoas(spl: SPL):
    return {
        "spl_id": spl.spl_id,
        "name": spl.name,
        "mentor": spl.mentor,
        "categories": spl.categories,
        "github": spl.github,
        "live": spl.live,
        "banner": spl.banner,
        "description": spl.description,
        "students": [
            {
                "id": s.student_id,
                "name": s.name,
            }
            for s in spl.students if s.student_id
        ],
        "_links": {
            "self": {"href": f"/spls/{spl.spl_id}"},
            "all": {"href": "/spls"},
        },
    }

@router.get("/spls", response_class=JSONResponse)
async def list_spls(
    db: AsyncSession = Depends(get_db),
    search: str | None = Query(None, description="Search by SPL name or mentor"),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
    category: str | None = Query(None, description="Optional category filter: spl1, spl2, spl3"),
):
    try:
        query = select(SPL).options(selectinload(SPL.students)).where(SPL.deleted_at.is_(None))

        if category:
            query = query.where(func.lower(SPL.categories) == category.strip().lower())

        if search:
            query = query.where(
                or_(
                func.lower(SPL.name).ilike(f"%{search.strip().lower()}%"),
                func.lower(SPL.description).ilike(f"%{search.strip().lower()}%")
                )
            )

        # Total count
        count_result = await db.execute(select(func.count()).select_from(query.subquery()))
        total = count_result.scalar_one()

        offset = (page - 1) * size
        paginated_query = query.offset(offset).limit(size)
        result = await db.execute(paginated_query)
        spls = result.scalars().all()

        data = [spl_to_hateoas(spl) for spl in spls]

        def build_page_link(p: int):
            params = [f"page={p}", f"size={size}"]
            if category:
                params.insert(0, f"category={category}")
            if search:
                params.insert(0, f"search={search}")
            return "/spls?" + "&".join(params)

        last_page = max((total + size - 1) // size, 1)

        return JSONResponse(status_code=200, content={
            "_links": {
                "self": {"href": build_page_link(page)},
                "first": {"href": build_page_link(1)},
                "last": {"href": build_page_link(last_page)},
                "prev": {"href": build_page_link(page - 1)} if page > 1 else None,
                "next": {"href": build_page_link(page + 1)} if page < last_page else None,
            },
            "filters": {
                "category": category,
                "search": search,
            },
            "page": page,
            "size": size,
            "total": total,
            "_embedded": {
                "data": data
            }
        })

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=str(e.__class__.__name__),
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
async def get_spl_by_id(splid: int, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(
            select(SPL).where(SPL.spl_id == splid, SPL.deleted_at.is_(None)).options(selectinload(SPL.students))
        )
        spl = result.scalar_one_or_none()

        if not spl:
            return error_response(
                error_type="NotFound",
                message=f"SPL with ID {splid} not found.",
                hint="Check the ID and try again.",
                status_code=404,
            )

        return JSONResponse(status_code=200, content=spl_to_hateoas(spl))

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=str(e.__class__.__name__),
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
