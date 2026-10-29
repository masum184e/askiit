from app.services.chat.graph import build_graph

with open("graph.png", "wb") as f:
    f.write(build_graph().get_graph().draw_mermaid_png())