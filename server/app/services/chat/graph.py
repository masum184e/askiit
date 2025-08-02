from langgraph.graph import StateGraph, START, END
from app.services.chat.utils.types import GraphState
from app.services.chat.nodes.normalizer import normalizer_node
from app.services.chat.nodes.classifier import classifier_node
from app.services.chat.nodes.qa import qa_node
from app.services.chat.nodes.retrieve import retrieval_node
from app.services.chat.nodes.generate import generator_node
from app.services.chat.nodes.assemble import assemble_node

def build_graph():
    builder = StateGraph(GraphState)

    builder.add_node("Normalizer", normalizer_node)
    builder.add_node("IntentClassifier", classifier_node)
    builder.add_node("QANode", qa_node)
    builder.add_node("RAGNode", retrieval_node)
    builder.add_node("Generate", generator_node)
    builder.add_node("Assemble", assemble_node)

    builder.add_edge(START, "Normalizer")
    builder.add_edge("Normalizer", "IntentClassifier")
    builder.add_conditional_edges(
        "IntentClassifier",
        lambda state: state.get("intent"),
        {
            "qa": "QANode",
            "rag": "RAGNode"
        }
    )
    builder.add_edge("RAGNode", "Generate")
    
    builder.add_edge("QANode", "Assemble")
    builder.add_edge("Generate", "Assemble")
    builder.add_edge("Assemble", END)
    
    return builder.compile()