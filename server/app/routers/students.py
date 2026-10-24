
from fastapi import APIRouter, Depends, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import SQLAlchemyError

from app.database import get_db
from app.services.database.students import (
    list_students_service,
    get_student_service,
)
from app.utils.helper import error_response

router = APIRouter(tags=["Students"])


@router.get("/students")
async def list_students(
    db: AsyncSession = Depends(get_db),
    search: str | None = Query(None),
    session: str | None = Query(None),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
):
    try:
        data = await list_students_service(
            db=db,
            search=search,
            session=session,
            page=page,
            size=size,
        )
        return JSONResponse(status_code=200, content=data)

    except ValueError as e:
        return error_response(
            error_type="ValidationError",
            message=str(e),
            hint="Check page and size.",
            status_code=422,
        )
    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=type(e).__name__,
            hint="Check the database connection or query.",
            status_code=500,
        )


@router.get("/students/{student_id}")
async def get_student(
    student_id: str,
    db: AsyncSession = Depends(get_db),
):
    try:
        student = await get_student_service(db, student_id)

        if student is None:
            return error_response(
                error_type="NotFound",
                message=f"Student with ID {student_id} not found.",
                hint="Check the ID and try again.",
                status_code=404,
            )

        return JSONResponse(status_code=200, content=student)

    except SQLAlchemyError as e:
        return error_response(
            error_type="DatabaseError",
            message=type(e).__name__,
            hint="Check the database connection.",
            status_code=500,
        )
