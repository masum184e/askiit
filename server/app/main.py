from fastapi import FastAPI
from app.routers import chat
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(chat.router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)