from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat.chat_service import ChatService

from fastapi.responses import StreamingResponse

from app.security.dependencies import (
    get_current_user,
)

from app.db.models.user import User

from app.services.conversation.conversation_service import (
    ConversationService,
)

from app.schemas.chat import MessageResponse

from fastapi import HTTPException

router = APIRouter()


@router.post(
    "",
    response_model=ChatResponse,
)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = ChatService(db)

    return service.ask(
        user_id=current_user.id,
        question=request.question,
        conversation_id=request.conversation_id,
        document_id=request.document_id,
    )

@router.post(
    "/stream",
)
def stream_chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user,
    ),
):
    service = ChatService(db)

    return StreamingResponse(
        service.stream(
            user_id=current_user.id,
            question=request.question,
            conversation_id=request.conversation_id,
        ),
        media_type="text/plain",
    )

@router.get(
    "/conversations/{conversation_id}/messages",
    response_model=list[MessageResponse],
)
def get_conversation_messages(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = ConversationService(db)

    conversation = service.get_conversation(
        conversation_id,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found.",
        )

    if conversation.user_id != current_user.id:
        raise HTTPException(
            status_code=403,
            detail="Not allowed.",
        )

    return service.get_history(
        conversation_id,
    )