from app.services.embeddings.embedding_service import (
    EmbeddingService,
)

service = EmbeddingService()

embedding = service.embed_text(
    "Artificial Intelligence is amazing."
)

print(type(embedding))
print(len(embedding))
print(embedding[:10])