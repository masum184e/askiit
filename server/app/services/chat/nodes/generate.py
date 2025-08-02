from app.services.chat.model import model as llm
from app.services.chat.utils.types import GraphState
from langchain import hub

prompt = hub.pull("rlm/rag-prompt")  # RAG prompt from LangChain hub

def generator_node(state: GraphState) -> GraphState:
    print("Generator Node")

    # Extract the question and documents
    question = state.get("normalized_query", "")
    docs = state.get("retrieved_docs", [])

    # Prepare the context from documents
    docs_content = "\n\n".join(doc.page_content for doc in docs)

    # Format prompt using the retrieved context and the question
    messages = prompt.invoke({
        "question": question,
        "context": docs_content
    })

    # Get response from the LLM
    response = llm.invoke(messages)
    rag_result = response.content

    # Update state and return
    return {
        **state,
        "rag_answer": rag_result,
        "final_response": rag_result,
        "trace": state.get("trace", []) + [{"step": "generate", "answer": rag_result}]
    }
