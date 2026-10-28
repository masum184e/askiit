
from app.mcp.instance import mcp

# Import every module to register its @mcp.tool() functions.
import app.mcp.tools.students
import app.mcp.tools.spls
import app.mcp.tools.achievements

if __name__ == "__main__":
    mcp.settings.host = "127.0.0.1"
    mcp.settings.port = 8001

    mcp.run(transport="streamable-http")
