from app.db.session import SessionLocal
from app.services.search.semantic_search_service import (
    SemanticSearchService,
)

print("Creating database session...")
db = SessionLocal()

print("Creating search service...")
service = SemanticSearchService(db)

print("Searching...")
results = service.search(
    "What is artificial intelligence?",
    limit=5,
)

print(f"Found {len(results)} result(s).")
print(results)

for chunk, distance in results:
    print("=" * 80)
    print(f"Distance: {distance:.4f}")
    print(chunk.chunk_text)