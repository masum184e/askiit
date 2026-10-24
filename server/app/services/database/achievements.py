
from urllib.parse import urlencode

from sqlalchemy import func, or_, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.achievement import Achievement


def achievement_to_dict(a: Achievement) -> dict:
    """Convert an Achievement ORM object to a JSON-compatible dictionary."""

    return {
        "achievement_id": a.achievement_id,
        "competition_name": a.competition_name,
        "position": a.position,
        "description": a.description,
        "students": [
            {
                "id": student.student_id,
                "image": student.image,
            }
            for student in a.students
            if student.student_id
        ],
        "created_at": str(a.created_at),
        "updated_at": str(a.updated_at),
        "_links": {
            "self": {
                "href": f"/achievements/{a.achievement_id}"
            },
            "all": {
                "href": "/achievements"
            },
        },
    }


def build_achievement_page_link(
    page: int,
    size: int,
    search: str | None = None,
) -> str:
    """Build a pagination URL while safely encoding query parameters."""

    params = {
        "page": page,
        "size": size,
    }

    if search:
        params["search"] = search

    return f"/achievements?{urlencode(params)}"


async def list_achievements_service(
    db: AsyncSession,
    page: int = 1,
    size: int = 9,
    search: str | None = None,
) -> dict:
    """Search, paginate, and serialize achievements."""

    if page < 1:
        raise ValueError("page must be greater than or equal to 1")

    if size < 1 or size > 50:
        raise ValueError("size must be between 1 and 50")

    normalized_search = search.strip() if search else None
    if not normalized_search:
        normalized_search = None

    filters = [Achievement.deleted_at.is_(None)]

    if normalized_search:
        search_term = f"%{normalized_search}%"

        filters.append(
            or_(
                func.lower(Achievement.competition_name).ilike(
                    search_term.lower()
                ),
                func.lower(Achievement.description).ilike(
                    search_term.lower()
                ),
            )
        )

    # Count matching achievements.
    count_query = (
        select(func.count())
        .select_from(Achievement)
        .where(*filters)
    )

    count_result = await db.execute(count_query)
    total = count_result.scalar_one()

    # Fetch the requested page.
    offset = (page - 1) * size

    query = (
        select(Achievement)
        .options(selectinload(Achievement.students))
        .where(*filters)
        .order_by(Achievement.achievement_id)
        .offset(offset)
        .limit(size)
    )

    result = await db.execute(query)
    achievements = result.scalars().all()

    data = [
        achievement_to_dict(achievement)
        for achievement in achievements
    ]

    last_page = max((total + size - 1) // size, 1)

    def page_link(p: int) -> str:
        return build_achievement_page_link(
            page=p,
            size=size,
            search=normalized_search,
        )

    return {
        "_links": {
            "self": {"href": page_link(page)},
            "first": {"href": page_link(1)},
            "last": {"href": page_link(last_page)},
            "prev": page_link(page - 1) if page > 1 else None,
            "next": page_link(page + 1) if page < last_page else None,
        },
        "filters": {
            "search": normalized_search,
        },
        "page": page,
        "size": size,
        "total": total,
        "_embedded": {
            "data": data,
        },
    }


async def get_achievement_service(
    db: AsyncSession,
    achievement_id: int,
) -> dict | None:
    """Retrieve and serialize one non-deleted achievement."""

    query = (
        select(Achievement)
        .options(selectinload(Achievement.students))
        .where(
            Achievement.achievement_id == achievement_id,
            Achievement.deleted_at.is_(None),
        )
    )

    result = await db.execute(query)
    achievement = result.scalar_one_or_none()

    if achievement is None:
        return None

    return achievement_to_dict(achievement)
