from decouple import config
from groq import Groq

client = Groq(api_key=config("GROQ_API_KEY"))

try:
    models = client.models.list()
    print("Available Models for your API Key:")
    for m in models.data:
        print(f" - {m.id}")
except Exception as e:
    print(f"Error listing models: {e}")

# GEMINI
# curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_GEMINI_API_KEY"