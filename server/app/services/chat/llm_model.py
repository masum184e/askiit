from decouple import config

from langchain_groq import ChatGroq

model = ChatGroq(
    model="qwen/qwen3.8-27b",
    api_key=config("GROQ_API_KEY"),
    temperature=0.7,
)

# from langchain_google_genai import ChatGoogleGenerativeAI

# model = ChatGoogleGenerativeAI(
#     model="gemini-3.8-flash",
#     google_api_key=config("GOOGLE_API_KEY")
# )

# from langchain_deepseek import ChatDeepSeek

# model = ChatDeepSeek(
#     model="deepseek-chat",          # or "deepseek-reasoner" for R1-style reasoning
#     api_key=config("DEEPSEEK_API_KEY"),
#     temperature=0.7,
# )

# from langchain_huggingface import HuggingFaceEndpoint, ChatHuggingFace

# llm = HuggingFaceEndpoint(
#     repo_id="meta-llama/Llama-3.2-3B-Instruct",   # or Mistral-7B-Instruct-v0.3
#     # repo_id="meta-llama/Llama-3.1-8B-Instruct",   # or Mistral-7B-Instruct-v0.3
#     huggingfacehub_api_token=config("HF_TOKEN"),
#     task="text-generation",
#     max_new_tokens=512,
# )
# model = ChatHuggingFace(llm=llm)