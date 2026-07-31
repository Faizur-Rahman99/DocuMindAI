from sqlalchemy.orm import Session

from app.services.search.semantic_search_service import (
    SemanticSearchService,
)
from app.services.llm.ollama_service import (
    OllamaService,
)
from app.services.conversation.conversation_service import (
    ConversationService,
)


class ChatService:
    def __init__(self, db: Session):
        self.search_service = SemanticSearchService(db)
        self.conversation_service = ConversationService(db)
        self.llm = OllamaService()

    def ask(
            self,
            user_id: int,
            question: str,
            conversation_id: int,
            document_id: int | None = None,
    ):

        # Start a new conversation if needed

        self.conversation_service.add_user_message(
            conversation_id,
            question,
        )

        conversation = self.conversation_service.get_conversation(
            conversation_id,
        )

        if conversation.title == "New Conversation":

            title = question.strip()

            if len(title) > 60:
                title = title[:57] + "..."

            self.conversation_service.rename_conversation(
                conversation_id,
                title,
            )


        # Load conversation history
        history = (
            self.conversation_service.get_history(
                conversation_id
            )
        )

        history_text = "\n".join(
            f"{message.role}: {message.content}"
            for message in history
        )

        # Semantic search
        results = self.search_service.search(
            query=question,
            limit=5,
            document_id=document_id,
        )

        context = "\n\n".join(
            chunk.chunk_text
            for chunk, distance in results
        )

        # Generate answer
        answer = self.llm.answer(
            question=question,
            context=context,
            history=history_text,
        )

        # Save assistant reply
        self.conversation_service.add_assistant_message(
            conversation_id,
            answer,
        )

        return {
            "conversation_id": conversation_id,
            "answer": answer,
            "sources": [
                {
                    "chunk_id": chunk.id,
                    "document_id": chunk.document_id,
                    "filename": chunk.document.original_filename,
                    "score": float(distance),
                    "text": chunk.chunk_text,
                }
                for chunk, distance in results
            ],
        }

    def stream(
            self,
            user_id: int,
            question: str,
            conversation_id: int,
    ):

        self.conversation_service.add_user_message(
            conversation_id,
            question,
        )

        conversation = self.conversation_service.get_conversation(
            conversation_id,
        )

        if conversation.title == "New Conversation":

            title = question.strip()

            if len(title) > 60:
                title = title[:57] + "..."

            self.conversation_service.rename_conversation(
                conversation_id,
                title,
            )

        history = (
            self.conversation_service.get_history(
                conversation_id
            )
        )

        history_text = "\n".join(
            f"{m.role}: {m.content}"
            for m in history
        )

        results = self.search_service.search(
            query=question,
            limit=5,
        )

        context = "\n\n".join(
            chunk.chunk_text
            for chunk, _ in results
        )

        full_answer = ""

        for token in self.llm.stream_answer(
                question=question,
                context=context,
                history=history_text,
        ):
            full_answer += token
            yield token

        self.conversation_service.add_assistant_message(
            conversation_id,
            full_answer,
        )