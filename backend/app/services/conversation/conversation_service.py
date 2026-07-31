from sqlalchemy.orm import Session

from app.repositories.conversation_repository import (
    ConversationRepository,
)
from app.repositories.message_repository import (
    MessageRepository,
)


class ConversationService:
    def __init__(self, db: Session):

        self.conversations = (
            ConversationRepository(db)
        )

        self.messages = (
            MessageRepository(db)
        )

    def start_conversation(
        self,
        user_id: int,
    ):
        return self.conversations.create(
            user_id
        )

    def add_user_message(
        self,
        conversation_id: int,
        content: str,
    ):
        return self.messages.create(
            conversation_id,
            "user",
            content,
        )

    def add_assistant_message(
        self,
        conversation_id: int,
        content: str,
    ):
        return self.messages.create(
            conversation_id,
            "assistant",
            content,
        )

    def get_history(
        self,
        conversation_id: int,
    ):
        return self.messages.get_history(
            conversation_id
        )

    def list_conversations(
        self,
        user_id: int,
    ):
        return self.conversations.list_by_user(
            user_id
        )

    def get_conversation(
        self,
        conversation_id: int,
    ):
        return self.conversations.get(
            conversation_id
        )

    def rename_conversation(
        self,
        conversation_id: int,
        title: str,
    ):
        return self.conversations.rename(
            conversation_id,
            title,
        )

    def delete_conversation(
        self,
        conversation_id: int,
    ):
        return self.conversations.delete(
            conversation_id
        )