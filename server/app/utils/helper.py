
from fastapi.responses import JSONResponse

def error_response(error_type: str, message: str, hint: str, status_code: int):
    return JSONResponse(status_code=status_code, content={
        "error": {
            "type": error_type,
            "message": message,
            "hint": hint,
            "status_code": status_code
        }
    })