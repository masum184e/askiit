import asyncio
from app.services.chat.utils.types import GraphState
from app.services.chat.utils.vectorstore import load_rag_vectorstore

vectorstore = load_rag_vectorstore()
retriever = vectorstore.as_retriever()

async def retrieval_node(state: GraphState) -> GraphState:
    print("Retrieval Node")
    
    # Fallback to user_query if normalized_query is missing or empty
    query = state.get("normalized_query") or state.get("user_query", "")
    if isinstance(query, list):
        query = next((m.content for m in reversed(query) if getattr(m, "type", "") == "human"), "")
    
    query = str(query).strip()
    print(f"Retrieval Query: {query}")

    try:
        # Run similarity search safely in a thread pool since FAISS search is synchronous
        docs = await asyncio.to_thread(vectorstore.similarity_search, query)
    except Exception as e:
        print(f"Error in retrieval_node: {e}")
        docs = []

    return {
        **state,
        "retrieved_docs": docs,
        "trace": state.get("trace", []) + [{"step": "retrieval_node", "docs_count": len(docs)}]
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