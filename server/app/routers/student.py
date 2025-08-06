from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, or_
from sqlalchemy.orm import selectinload
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import or_

from app.database import get_db
from app.models.student import Student
from app.utils.helper import error_response

router = APIRouter(tags=["Students"])

def student_to_hateoas(student: Student):
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
        "created_at": str(student.created_at),
        "updated_at": str(student.updated_at),
        "_links": {
            "self": {"href": f"/students/{student.student_id}"},
            "all": {"href": "/students"},
        },
    }

@router.get("/students", response_class=JSONResponse)
async def list_students(
    db: AsyncSession = Depends(get_db),
    search: str | None = Query(None, description="Search by name, email or mobile"),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
    session: str | None = Query(None, description="Filter by session (e.g., 2023, 2024)"),
):
    try:
        query = select(Student).where(Student.deleted_at.is_(None))

        if session:
            query = query.where(func.lower(Student.session) == session.strip().lower())

        if search:
            query = query.where(
                or_(
                    func.lower(Student.name).ilike(f"%{search.lower()}%"),
                    func.lower(Student.email).ilike(f"%{search.lower()}%"),
                )
            )

        # total count
        count_result = await db.execute(select(func.count()).select_from(query.subquery()))
        total = count_result.scalar_one()

        offset = (page - 1) * size
        paginated_query = query.offset(offset).limit(size)
        result = await db.execute(paginated_query)
        students = result.scalars().all()

        data = [student_to_hateoas(s) for s in students]

        def build_page_link(p: int):
            params = [f"page={p}", f"size={size}"]
            if search:
                params.insert(0, f"search={search}")
            return "/students?" + "&".join(params)

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
                "search": search,
                "session": session,
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
            hint="Unexpected error while retrieving students.",
            status_code=500,
        )


@router.get("/students/{student_id}", response_class=JSONResponse)
async def get_student_by_id(student_id: str, db: AsyncSession = Depends(get_db)):
    try:
        result = await db.execute(
            select(Student).where(Student.student_id == student_id, Student.deleted_at.is_(None))
        )
        student = result.scalar_one_or_none()

        if not student:
            return error_response(
                error_type="NotFound",
                message=f"Student with ID {student_id} not found.",
                hint="Check the ID and try again.",
                status_code=404,
            )

        return JSONResponse(status_code=200, content=student_to_hateoas(student))

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
            hint="Unexpected error while retrieving student.",
            status_code=500,
        )
