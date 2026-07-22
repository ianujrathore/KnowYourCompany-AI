from fastapi import APIRouter, HTTPException
from app.models.schemas import ChatRequest, ChatResponse
from app.services.rag_service import RAGService

router = APIRouter()
rag_service = RAGService()

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        if not request.message.strip():
            raise HTTPException(status_code=400, detail="Message cannot be empty")
        
        answer, sources = rag_service.get_response(request.message)
        
        return ChatResponse(answer=answer, sources=sources)
    except Exception as e:
        return ChatResponse(
            answer="I encountered an error processing your request.",
            sources=[],
            error=str(e)
        )