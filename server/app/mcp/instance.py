
from mcp.server.fastmcp import FastMCP
from mcp.server.transport_security import TransportSecuritySettings

mcp = FastMCP(
    "Ask IIT",
    transport_security=TransportSecuritySettings(
        enable_dns_rebinding_protection=True,
        allowed_hosts=[
            "askiit-mcp.onrender.com",
        ],
        allowed_origins=[
            "https://askiit-mcp.onrender.com",
        ],
    ),
    instructions=(
        "Provides read access to student records, SPLs, "
        "and academic achievements."
    ),
)