from sqlalchemy import select, func, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.student import Student

def student_to_dict(student: Student) -> dict:
    return {
        "student_id": student.student_id,
        "name": student.name,
        "email": student.email,
        "mobile": student.mobile,
        "session": student.session,
        "address": student.address,
        "internship_company": student.internship_company,
        "internship_technology": student.internship_technology,
        "codeforces_handle": student.codeforces_handle,
        "leetcode_handle": student.leetcode_handle,
        "image": student.image,
        "created_at": (
            student.created_at.isoformat()
            if student.created_at else None
        ),
        "updated_at": (
            student.updated_at.isoformat()
            if student.updated_at else None
        ),
        "_links": {
            "self": {"href": f"/students/{student.student_id}"},
            "all": {"href": "/students"},
        },
    }


async def list_students_service(
    db: AsyncSession,
    search: str | None = None,
    session: str | None = None,
    page: int = 1,
    size: int = 10,
) -> dict:
    if page < 1 or not 1 <= size <= 50:
        raise ValueError("Invalid page or size")

    query = select(Student).where(Student.deleted_at.is_(None))

    if session and session.strip():
        query = query.where(
            func.lower(Student.session) == session.strip().lower()
        )

    if search and search.strip():
        term = f"%{search.strip()}%"
        query = query.where(
            or_(
                Student.name.ilike(term),
                Student.email.ilike(term),
                Student.mobile.ilike(term),
            )
        )

    total = (
        await db.execute(
            select(func.count()).select_from(
                query.order_by(None).subquery()
            )
        )
    ).scalar_one()

    result = await db.execute(
        query.order_by(Student.student_id)
        .offset((page - 1) * size)
        .limit(size)
    )

    students = result.scalars().all()
    last_page = max((total + size - 1) // size, 1)

    def page_link(p: int) -> str:
        params = [f"page={p}", f"size={size}"]

        if search:
            params.append(f"search={search}")

        if session:
            params.append(f"session={session}")

        return "/students?" + "&".join(params)

    return {
        "_links": {
            "self": {"href": page_link(page)},
            "first": {"href": page_link(1)},
            "last": {"href": page_link(last_page)},
            "prev": (
                {"href": page_link(page - 1)}
                if page > 1 else None
            ),
            "next": (
                {"href": page_link(page + 1)}
                if page < last_page else None
            ),
        },
        "filters": {
            "search": search,
            "session": session,
        },
        "page": page,
        "size": size,
        "total": total,
        "_embedded": {
            "data": [student_to_dict(s) for s in students]
        },
    }


async def get_student_service(
    db: AsyncSession,
    student_id: str,
) -> dict | None:
    result = await db.execute(
        select(Student).where(
            Student.student_id == student_id,
            Student.deleted_at.is_(None),
        )
    )

    student = result.scalar_one_or_none()

    return student_to_dict(student) if student else None