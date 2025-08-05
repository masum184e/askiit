from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.exc import SQLAlchemyError
from app.database import get_db
from app.models.student import Student

router = APIRouter(tags=["Students"])

def student_to_hateoas(s: Student):
    return {
        "student_id": s.student_id,
        "name": s.name,
        "email": s.email,
        "whatsapp": s.whatsapp,
        "session": s.session,
        "address": s.address,
        "internship_company": s.internship_company,
        "internship_technology": s.internship_technology,
        "created_at": str(s.created_at),
        "updated_at": str(s.updated_at),
        "_links": {
            "self": {"href": f"/students/{s.student_id}"},
            "all": {"href": "/students"},
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


@router.get("/students", response_class=JSONResponse)
async def list_students(
    db: AsyncSession = Depends(get_db),
    page: int = Query(1, ge=1),
    size: int = Query(9, ge=1, le=100),
    session: str | None = Query(None),
    search: str | None = Query(None),
):
    try:
        query = select(Student).where(Student.deleted_at.is_(None))

        if session:
            query = query.where(Student.session == session)

        if search:
            query = query.where(Student.name.ilike(f"%{search}%"))

        count_result = await db.execute(select(func.count()).select_from(query.subquery()))
        total = count_result.scalar_one()

        offset = (page - 1) * size
        paginated_query = query.offset(offset).limit(size)
        result = await db.execute(paginated_query)
        students = result.scalars().all()

        data = [student_to_hateoas(s) for s in students]

        def build_page_link(p: int):
            params = [f"page={p}", f"size={size}"]
            if session:
                params.append(f"session={session}")
            if search:
                params.append(f"search={search}")
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
            "page": page,
            "size": size,
            "total": total,
            "_embedded": {
                "students": data
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
            hint="Unexpected error occurred during student listing.",
            status_code=500,
        )


@router.get("/students/{student_id}", response_class=JSONResponse)
async def get_student(student_id: int, db: AsyncSession = Depends(get_db)):
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
            hint="Check if the table/column exists and the connection is stable.",
            status_code=500,
        )
    except Exception as e:
        return error_response(
            error_type="ServerError",
            message=str(e),
            hint="Unexpected error occurred while retrieving student.",
            status_code=500,
        )
