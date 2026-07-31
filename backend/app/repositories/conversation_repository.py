from sqlalchemy.orm import Session

from app.db.models.conversation import Conversation


class ConversationRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        user_id: int,
    ) -> Conversation:

        conversation = Conversation(
            user_id=user_id,
        )

        self.db.add(conversation)
        self.db.commit()
        self.db.refresh(conversation)

        return conversation

    def get(
        self,
        conversation_id: int,
    ) -> Conversation | None:

        return (
            self.db.query(Conversation)
            .filter(
                Conversation.id == conversation_id
            )
            .first()
        )

    def list_by_user(
        self,
        user_id: int,
    ) -> list[Conversation]:

        return (
            self.db.query(Conversation)
            .filter(
                Conversation.user_id == user_id
            )
            .order_by(
                Conversation.updated_at.desc()
            )
            .all()
        )

    def rename(
        self,
        conversation_id: int,
        title: str,
    ) -> Conversation | None:

        conversation = self.get(
            conversation_id
        )

        if conversation is None:
            return None

        conversation.title = title

        self.db.commit()
        self.db.refresh(conversation)

        return conversation

    def delete(
        self,
        conversation_id: int,
    ) -> bool:

        conversation = self.get(
            conversation_id
        )

        if conversation is None:
            return False

        self.db.delete(conversation)
        self.db.commit()

        return True