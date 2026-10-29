from fastapi import APIRouter, Depends, Path, Query
from fastapi.responses import JSONResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.services.database.students import (
    list_students_service,
    get_student_service,
)
from app.utils.helper import error_response
from app.logger import get_logger, StepTimer

log = get_logger(__name__)

router = APIRouter()


@router.get("/students", response_class=JSONResponse)
async def list_students(
    db: AsyncSession = Depends(get_db),
    search: str | None = Query(
        None, max_length=100, description="Search by Student name or email or mobile"
    ),
    session: str | None = Query(None, max_length=50),
    page: int = Query(1, ge=1),
    size: int = Query(10, ge=1, le=50),
):
    log.info(
        "list_students | page=%d size=%d search=%r session=%s",
        page, size, search, session
    )

    with StepTimer(log, f"list_students_service [page={page} size={size}]"):
        data = await list_students_service(
            db=db,
            search=search,
            session=session,
            page=page,
            size=size,
        )

    total = data.get("total") if isinstance(data, dict) else None
    log.info(
        "list_students done | page=%d size=%d search=%r session=%s total=%s",
        page, size, search, session, total,
    )
    return JSONResponse(status_code=200, content=data)


@router.get("/students/{student_id}", response_class=JSONResponse)
async def get_student(
    student_id: str = Path(..., min_length=1, max_length=64),
    db: AsyncSession = Depends(get_db),
):
    log.info("get_student | id=%s", student_id)

    with StepTimer(log, f"get_student_service [id={student_id}]"):
        student = await get_student_service(db=db, student_id=student_id)

    if student is None:
        log.info("get_student not found | id=%s", student_id)
        return error_response(
            error_type="NotFound",
            message=f"Student with ID {student_id} not found.",
            hint="Check the ID and try again.",
            status_code=404,
        )

    log.info("get_student done | id=%s", student_id)
    return JSONResponse(status_code=200, content=student)