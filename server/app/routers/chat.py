from fastapi import APIRouter

router = APIRouter(tags=["Chat"])

@router.post("/chat")
def ask():
    return {"answer": "Hello, this is a chat response!"}
