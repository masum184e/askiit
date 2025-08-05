# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import chat
from app.routers import achievement
from app.routers import student

app = FastAPI(title="AskIIT API")

# Include routers under /api prefix
app.include_router(chat.router, prefix="/api", tags=["Chat"])
app.include_router(achievement.router, prefix="/api", tags=["Achievements"])
app.include_router(student.router, prefix="/api", tags=["Students"])

# CORS configuration - adjust origins as needed
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://askiit.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Optional root endpoint to check server status
@app.get("/", tags=["Root"])
async def root():
    return {"message": "AskIIT FastAPI backend is running"}

# Run with: python main.py
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
