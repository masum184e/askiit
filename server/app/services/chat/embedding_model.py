# from langchain_google_genai import GoogleGenerativeAIEmbeddings

# embedding_model = GoogleGenerativeAIEmbeddings(
#     model="models/gemini-embedding-2",
#     google_api_key=config("GOOGLE_API_KEY")
# )

from langchain_huggingface import HuggingFaceEndpoint

embedding_model = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={"device": "cpu"},
    encode_kwargs={"normalize_embeddings": True},
)