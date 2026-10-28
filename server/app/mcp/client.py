import asyncio
from langchain_mcp_adapters.client import MultiServerMCPClient
from app.services.chat.llm_model import model
from langchain.agents import create_agent

async def main():
    mcp_client = MultiServerMCPClient(
        {
            "ask_iit": {
                "transport": "streamable_http",
                "url": "http://127.0.0.1:8001/mcp",
            }
        }
    )
        
    print("Fetching tools from MCP server...")
    tools = await mcp_client.get_tools()
    print(f"Found {len(tools)} tools:")
    for tool in tools:
        print(f"- {tool.name}: {tool.description}")

    print("-> Creating agent...")
    agent = create_agent(model, tools)
    
    # print("-> Invoking agent with prompt...")
    # response = await agent.ainvoke(
    #     {"messages": [{"role": "user", "content": "give me list of students from session 2020-2021"}]}
    # )
    # Stream events to see when the tool finishes and where the LLM hangs
    async for event in agent.astream(
        {"messages": [{"role": "user", "content": "give me list of students from session 2020-2021"}]}
    ):
        print("--- Stream Event ---")
        print(event)

    # print("Agent answer:", response["messages"][-1].content)

if __name__ == "__main__":
    asyncio.run(main())