
from app.mcp.instance import mcp

# Import every module to register its @mcp.tool() functions.
import app.mcp.tools.students
import app.mcp.tools.spls
import app.mcp.tools.achievements

if __name__ == "__main__":
    mcp.settings.host = "0.0.0.0"  # Listen on all network interfaces (Render deployment)
    # 127.0.0.1 = Listen only on localhost (local development)
    # mcp.settings.port = 8001

    mcp.run(transport="streamable-http")
