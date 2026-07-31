from app.db.session import SessionLocal

from app.services.chat.chat_service import (
    ChatService,
)

db = SessionLocal()

chat = ChatService(db)

response = chat.ask(
    "Summarize the uploaded document."
)

print("\nANSWER\n")
print(response["answer"])

print("\nSOURCES\n")

for source in response["sources"]:
    print("-" * 60)
    print(source)