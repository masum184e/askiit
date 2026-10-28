from app.mcp.instance import mcp
from app.database import AsyncSessionLocal

from app.services.database.spls import (
    list_spls_service,
    get_spl_service,
)

@mcp.tool()
async def list_spls(
    search: str | None = None,
    category: str | None = None,
    page: int = 1,
    size: int = 10,
) -> dict:
    """Search SPLs by name or description.
    Filter by category and paginate results.
    Returns SPL details and associated students.
    """
    async with AsyncSessionLocal() as db:
        return await list_spls_service(
            db=db,
            search=search,
            category=category,
            page=page,
            size=size,
        )


@mcp.tool()
async def get_spl(spl_id: int) -> dict:
    """Get one SPL by ID, including its associated students."""
    async with AsyncSessionLocal() as db:
        spl = await get_spl_service(
            db=db,
            spl_id=spl_id,
        )

        if spl is None:
            return {"error": f"SPL with ID {spl_id} not found"}

        return spl