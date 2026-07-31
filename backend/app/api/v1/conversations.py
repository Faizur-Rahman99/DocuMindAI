from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.db.models.user import User
from app.schemas.conversation import (
    ConversationResponse,
    RenameConversationRequest,
)
from app.security.dependencies import get_current_user
from app.services.conversation.conversation_service import (
    ConversationService,
)

router = APIRouter()

@router.get(
    "",
    response_model=list[ConversationResponse],
)
def list_conversations(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = ConversationService(db)

    return service.list_conversations(
        current_user.id
    )

@router.get(
    "/{conversation_id}",
    response_model=ConversationResponse,
)
def get_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = ConversationService(db)

    conversation = service.get_conversation(
        conversation_id
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return conversation

@router.patch(
    "/{conversation_id}",
    response_model=ConversationResponse,
)
def rename_conversation(
    conversation_id: int,
    request: RenameConversationRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = ConversationService(db)

    conversation = service.rename_conversation(
        conversation_id,
        request.title,
    )

    if conversation is None:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return conversation

@router.delete(
    "/{conversation_id}",
)
def delete_conversation(
    conversation_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = ConversationService(db)

    success = service.delete_conversation(
        conversation_id
    )

    if not success:
        raise HTTPException(
            status_code=404,
            detail="Conversation not found",
        )

    return {
        "message": "Conversation deleted successfully"
    }

@router.post("")
def create_conversation(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = ConversationService(db)

    conversation = service.start_conversation(
        current_user.id,
    )

    return conversation