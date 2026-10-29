from langgraph.graph import StateGraph, START, END

from app.services.chat.utils.types import GraphState
from app.services.chat.nodes.normalizer import normalizer_node
from app.services.chat.nodes.intent_classifier import intent_classifier_node
from app.services.chat.nodes.qa import qa_node
from app.services.chat.nodes.retrieve import retrieval_node
from app.services.chat.nodes.generate import generator_node
from app.services.chat.nodes.assemble import assemble_node
from app.services.chat.nodes.mcp import mcp_node
from app.services.chat.nodes.cf import cf_node
from app.services.chat.memory import checkpointer


ROUTES = {
    "qa": "QANode",
    "rag": "RAGNode",
    "mcp": "MCPNode",
    "cf": "CFNode",
}


def route_intent(state: GraphState) -> str:
    """Return a valid route key; fall back to qa on unexpected intents."""
    intent = state.get("intent")
    return intent if intent in ROUTES else "mcp"


def build_graph():
    builder = StateGraph(GraphState)

    builder.add_node("Normalizer", normalizer_node)
    builder.add_node("IntentClassifier", intent_classifier_node)
    builder.add_node("QANode", qa_node)
    builder.add_node("RAGNode", retrieval_node)
    builder.add_node("MCPNode", mcp_node)
    builder.add_node("CFNode", cf_node)
    builder.add_node("Generate", generator_node)
    builder.add_node("Assemble", assemble_node)

    builder.add_edge(START, "Normalizer")
    builder.add_edge("Normalizer", "IntentClassifier")

    builder.add_conditional_edges("IntentClassifier", route_intent, ROUTES)

    # mcp_node already produces final_response.
    builder.add_edge("MCPNode", "Assemble")

    builder.add_edge("RAGNode", "Generate")
    builder.add_edge("Generate", "Assemble")

    builder.add_edge("QANode", "Assemble")
    builder.add_edge("CFNode", "Assemble")

    builder.add_edge("Assemble", END)

    return builder.compile(checkpointer=checkpointer)