from app.dependencies.database import SessionLocal
from app.repositories.keyword_search_repository import (
    KeywordSearchRepository,
)

db = SessionLocal()

repo = KeywordSearchRepository(db)

results = repo.search(
    "machine learning",
)

print()

for chunk in results:
    print(chunk.id)
    print(chunk.chunk_text[:100])
    print("-" * 50)