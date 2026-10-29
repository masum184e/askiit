
from app.services.chat.llm_model import model as llm
from app.services.chat.utils.types import GraphState
from langchain_core.prompts import ChatPromptTemplate


# Define the RAG prompt locally instead of pulling it from LangChain Hub
prompt = ChatPromptTemplate.from_template(
    """You are a helpful assistant for IIT-related questions.

Answer the question using the provided context.
If the context does not contain enough information to answer,
clearly say that you don't have enough information.
Do not invent facts that are not supported by the context.

Context:
{context}

Question:
{question}

Answer:"""
)


def generator_node(state: GraphState) -> GraphState:
    print("Generator Node")

    # Extract the question and retrieved documents
    question = state.get("normalized_query", "")
    docs = state.get("retrieved_docs", [])

    # Prepare the context from documents
    docs_content = "\n\n".join(
        doc.page_content for doc in docs
    )

    # Format the prompt using context and question
    messages = prompt.invoke({
        "question": question,
        "context": docs_content
    })

    # Get the response from the LLM
    response = llm.invoke(messages)
    rag_result = response.content

    # Update graph state
    return {
        **state,
        "rag_answer": rag_result,
        "final_response": rag_result,
        "trace": state.get("trace", []) + [
            {
                "step": "generate",
                "answer": rag_result
            }
        ]
    }
