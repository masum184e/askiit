from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.services.chat.model import embedding_model
import os

VECTOR_STORE_PATH = "./app/services/chat/vectorstore"
DEFAULT_DIR_PATH = "./app/services/chat/static/pdfs"  # Directory with all PDFs

def load_rag_vectorstore(pdf_dir_path: str = DEFAULT_DIR_PATH) -> FAISS:
    if os.path.exists(VECTOR_STORE_PATH):
        db = FAISS.load_local(VECTOR_STORE_PATH, embedding_model, allow_dangerous_deserialization=True)
        print("✅ Loaded existing FAISS vector store from disk")
    else:
        print("📄 Creating new FAISS vector store from multiple PDFs...")

        # Load all PDFs in the directory
        all_docs = []
        for filename in os.listdir(pdf_dir_path):
            if filename.endswith(".pdf"):
                file_path = os.path.join(pdf_dir_path, filename)
                print(f"🔍 Loading: {file_path}")
                loader = PyPDFLoader(file_path)
                documents = loader.load()

                # Split and accumulate documents
                text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
                split_docs = text_splitter.split_documents(documents)
                all_docs.extend(split_docs)

        # Build the vector store
        db = FAISS.from_documents(all_docs, embedding_model)
        db.save_local(VECTOR_STORE_PATH)
        print("✅ FAISS vector store saved for future use.")

    return db
