from urllib.parse import urlencode

from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.spl import SPL


def spl_to_dict(spl: SPL) -> dict:
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
                "id": student.student_id,
                "name": student.name,
            }
            for student in spl.students
            if student.student_id
        ],
        "_links": {
            "self": {"href": f"/spls/{spl.spl_id}"},
            "all": {"href": "/spls"},
        },
    }


async def list_spls_service(
    db: AsyncSession,
    search: str | None = None,
    category: str | None = None,
    page: int = 1,
    size: int = 10,
) -> dict:
    if page < 1 or not 1 <= size <= 50:
        raise ValueError("page must be >= 1 and size must be between 1 and 50")

    # Shared filters
    filters = [SPL.deleted_at.is_(None)]

    if category and category.strip():
        filters.append(
            func.lower(SPL.categories) == category.strip().lower()
        )

    if search and search.strip():
        term = f"%{search.strip()}%"
        filters.append(
            or_(
                SPL.name.ilike(term),
                SPL.description.ilike(term),
            )
        )

    # Count matching SPLs
    count_result = await db.execute(
        select(func.count(SPL.spl_id)).where(*filters)
    )
    total = count_result.scalar_one()

    # Fetch current page and related students
    query = (
        select(SPL)
        .options(selectinload(SPL.students))
        .where(*filters)
        .order_by(SPL.spl_id)
        .offset((page - 1) * size)
        .limit(size)
    )

    result = await db.execute(query)
    spls = result.scalars().all()

    last_page = max((total + size - 1) // size, 1)

    def build_page_link(p: int) -> str:
        params = {"page": p, "size": size}

        if search:
            params["search"] = search

        if category:
            params["category"] = category

        return f"/spls?{urlencode(params)}"

    return {
        "_links": {
            "self": {"href": build_page_link(page)},
            "first": {"href": build_page_link(1)},
            "last": {"href": build_page_link(last_page)},
            "prev": (
                {"href": build_page_link(page - 1)}
                if page > 1 else None
            ),
            "next": (
                {"href": build_page_link(page + 1)}
                if page < last_page else None
            ),
        },
        "filters": {
            "category": category,
            "search": search,
        },
        "page": page,
        "size": size,
        "total": total,
        "_embedded": {
            "data": [spl_to_dict(spl) for spl in spls]
        },
    }


async def get_spl_service(
    db: AsyncSession,
    spl_id: int,
) -> dict | None:
    result = await db.execute(
        select(SPL)
        .options(selectinload(SPL.students))
        .where(
            SPL.spl_id == spl_id,
            SPL.deleted_at.is_(None),
        )
    )

    spl = result.scalar_one_or_none()

    if spl is None:
        return None

    return spl_to_dict(spl)
