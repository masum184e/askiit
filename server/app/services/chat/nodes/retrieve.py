import asyncio
from functools import lru_cache

from app.services.chat.utils.types import GraphState
from app.services.chat.utils.vectorstore import load_rag_vectorstore
from app.logger import get_logger

log = get_logger(__name__)


@lru_cache(maxsize=1)
def get_vectorstore():
    """Load FAISS vector store once, only when RAG is needed."""
    log.info("Initializing FAISS vector store...")

    vectorstore = load_rag_vectorstore()

    log.info("FAISS vector store initialized successfully")
    return vectorstore


def search_documents(query: str):
    """Synchronous FAISS search."""
    vectorstore = get_vectorstore()
    return vectorstore.similarity_search(query)


async def retrieval_node(state: GraphState) -> GraphState:
    log.info("Retrieval Node")

    query = state.get("normalized_query") or state.get("user_query", "")

    if isinstance(query, list):
        query = next(
            (
                message.content
                for message in reversed(query)
                if getattr(message, "type", "") == "human"
            ),
            "",
        )

    query = str(query).strip()

    if not query:
        return {
            **state,
            "retrieved_docs": [],
            "trace": state.get("trace", []) + [
                {"step": "retrieval_node", "docs_count": 0}
            ],
        }

    log.info("Retrieval query: %s", query)

    try:
        docs = await asyncio.to_thread(search_documents, query)

        log.info("Retrieved %d documents", len(docs))

    except Exception:
        log.exception("Error in retrieval_node")
        docs = []

    return {
        **state,
        "retrieved_docs": docs,
        "trace": state.get("trace", []) + [
            {
                "step": "retrieval_node",
                "docs_count": len(docs),
            }
        ],
    }

    
# # from langchain_community.chains import RetrievalQA

# from app.services.chat.utils.types import GraphState
# from app.services.chat.utils.vectorstore import load_rag_vectorstore
# from app.services.chat.llm_model import model
# from langchain import hub

# vectorstore = load_rag_vectorstore()
# retriever = vectorstore.as_retriever()
# # qa_chain = RetrievalQA.from_chain_type(llm=model, retriever=retriever, return_source_documents=True)

# def retrieval_node(state: GraphState) -> GraphState:
#     print("Retrieval Node")
#     query = state.get("normalized_query", "")
#     # result = qa_chain.invoke({"query": query})
#     # rag_result = result.get("result", "")
#     # docs = result.get("source_documents", [])
#     docs = vectorstore.similarity_search(query)

#     return {
#         **state,
#         "retrieved_docs": docs,
#         "trace": state.get("trace", []) + [{"step": "generate" }]
#     }





# from langchain.chains import RetrievalQA

# from app.services.chat.utils.types import GraphState
# from app.services.chat.utils.vectorstore import load_rag_vectorstore
# from app.services.chat.llm_model import model

# vectorstore = load_rag_vectorstore()
# retriever = vectorstore.as_retriever()
# qa_chain = RetrievalQA.from_chain_type(llm=model, retriever=retriever, return_source_documents=True)

# def retrieve_node(state: GraphState) -> GraphState:
#     print("RAG Node")
#     query = state.get("normalized_query", "")
#     result = qa_chain.invoke({"query": query})
#     rag_result = result.get("result", "")
#     docs = result.get("source_documents", [])

#     return {
#         **state,
#         "rag_answer": rag_result,
#         "retrieved_docs": docs,
#         "final_response": rag_result,
#         "trace": state.get("trace", []) + [{"step": "retrieve", "answer": rag_result}]
#     }