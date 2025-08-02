from fastapi import APIRouter, Request
from app.services.chat.utils.types import GraphState
from app.services.chat.graph import build_graph

router = APIRouter(tags=["Chat"])

@router.post("/chat")
async def ask(request: Request):
    data = await request.json()
    user_query = data.get("input")

    if not user_query:
        return {"error": "No messages provided"}

    initial_state: GraphState = {
        "user_query": user_query,
        "trace": []
    }

    graph = build_graph()
    new_state = await graph.ainvoke(initial_state)

    # from IPython.display import Image, display

    # try:
    #     # display(Image(graph.get_graph().draw_mermaid_png())) # Jupyter Notebook
    #     with open("graph.png", "wb") as f:
    #         f.write(graph.get_graph().draw_mermaid_png())
    # except Exception:
    #     # This requires some extra dependencies and is optional
    #     pass

    return {
        "answer": new_state.get("final_response"),
        "trace": new_state.get("trace", [])
    }
