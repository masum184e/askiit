
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.services.chat.embedding_model import embedding_model
import os

DEFAULT_DIR_PATH = "./app/services/chat/static/pdfs"
INDEX_PATH = "./app/services/chat/static/faiss_index"

def load_rag_vectorstore():
    # Reuse the existing FAISS index if available.
    index_file = os.path.join(INDEX_PATH, "index.faiss")
    metadata_file = os.path.join(INDEX_PATH, "index.pkl")

    if os.path.exists(index_file) and os.path.exists(metadata_file):
        print("Loading existing FAISS vector store...")

        return FAISS.load_local(
            INDEX_PATH,
            embedding_model,
            allow_dangerous_deserialization=True,
        )

    print("Creating new FAISS vector store from PDFs...")

    # Check whether the PDF directory exists.
    if not os.path.isdir(DEFAULT_DIR_PATH):
        raise FileNotFoundError(
            f"PDF directory not found: {DEFAULT_DIR_PATH}"
        )

    # Create the index directory if needed.
    os.makedirs(INDEX_PATH, exist_ok=True)

    # Load all PDFs.
    all_docs = []

    for filename in os.listdir(DEFAULT_DIR_PATH):
        if filename.lower().endswith(".pdf"):
            file_path = os.path.join(DEFAULT_DIR_PATH, filename)
            print(f"Loading PDF: {file_path}")

            loader = PyPDFLoader(file_path)
            documents = loader.load()
            all_docs.extend(documents)

    if not all_docs:
        raise ValueError(
            f"No PDF documents found in {DEFAULT_DIR_PATH}"
        )

    # Split documents into chunks.
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
    )

    split_docs = text_splitter.split_documents(all_docs)

    if not split_docs:
        raise ValueError("No text chunks were extracted from the PDFs.")

    # Build and save the FAISS vector store.
    db = FAISS.from_documents(split_docs, embedding_model)
    db.save_local(INDEX_PATH)

    print("FAISS vector store saved successfully.")

    return db
