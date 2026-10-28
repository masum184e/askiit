from app.mcp.instance import mcp
from app.database import AsyncSessionLocal

from app.services.database.achievements import (
    list_achievements_service,
    get_achievement_service,
)

@mcp.tool()
async def list_achievements(
    page: int = 1,
    size: int = 9,
    search: str | None = None,
) -> dict:
    """List achievements with optional search and pagination."""

    async with AsyncSessionLocal() as db:
        return await list_achievements_service(
            db=db,
            page=page,
            size=size,
            search=search,
        )


@mcp.tool()
async def get_achievement(
    achievement_id: int,
) -> dict:
    """Get one achievement by its ID."""

    async with AsyncSessionLocal() as db:
        achievement = await get_achievement_service(
            db=db,
            achievement_id=achievement_id,
        )

        if achievement is None:
            return {
                "error": "NotFound",
                "message": (
                    f"Achievement with ID {achievement_id} not found."
                ),
            }

        return achievement
