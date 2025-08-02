from langchain_google_genai import ChatGoogleGenerativeAI
from decouple import config
from langchain_google_genai import GoogleGenerativeAIEmbeddings

model = ChatGoogleGenerativeAI(
    model="gemini-2.0-flash",
    google_api_key=config("GOOGLE_API_KEY")
)

embedding_model = GoogleGenerativeAIEmbeddings(
    model="models/embedding-001",
    google_api_key=config("GOOGLE_API_KEY")
)
