from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.langgraph_agent.graph import graph

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
def ai_chat(request: ChatRequest):
    try:
        result = graph.invoke(
            {
                "user_message": request.message
            }
        )

        return {
            "success": True,
            "message": result.get("response"),
            "data": result
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )