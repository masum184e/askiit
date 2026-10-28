from app.mcp.instance import mcp
from app.database import AsyncSessionLocal

from app.services.database.students import (
    list_students_service,
    get_student_service,
)

@mcp.tool()
async def list_students(
    search: str | None = None,
    session: str | None = None,
    page: int = 1,
    size: int = 10,
) -> dict:
    """Search students by name, email, or mobile.
    Optionally filter by academic session and paginate results.
    """
    async with AsyncSessionLocal() as db:
        return await list_students_service(
            db=db,
            search=search,
            session=session,
            page=page,
            size=size,
        )

@mcp.tool()
async def get_student(student_id: str) -> dict:
    """Retrieve a student by their ID."""
    async with AsyncSessionLocal() as db:
        student = await get_student_service(db, student_id)

        if student is None:
            return {"error": f"Student '{student_id}' not found"}

        return student