from app.db.session import SessionLocal
from app.services.conversation.conversation_service import (
    ConversationService,
)

db = SessionLocal()

service = ConversationService(db)

conversation = service.start_conversation(
    user_id=1,
)

print(f"Conversation ID: {conversation.id}")

service.add_user_message(
    conversation.id,
    "What is machine learning?",
)

service.add_assistant_message(
    conversation.id,
    "Machine learning is a field of AI...",
)

history = service.get_history(
    conversation.id,
)

print("\nConversation History:\n")

for message in history:
    print(
        f"{message.role}: {message.content}"
    )

db.close()