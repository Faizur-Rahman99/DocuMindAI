from sqlalchemy.orm import Session

from app.repositories.chunk_search_repository import (
    ChunkSearchRepository,
)
from app.services.embeddings.embedding_service import (
    EmbeddingService,
)

from app.repositories.keyword_search_repository import (
    KeywordSearchRepository,
)

class SemanticSearchService:
    def __init__(self, db: Session):
        self.embedding_service = None

        self.repository = ChunkSearchRepository(db)

        self.keyword_repository = (
            KeywordSearchRepository(db)
        )

    def search(
            self,
            query: str,
            limit: int = 5,
            document_id: int | None = None,
    ):

        if self.embedding_service is None:
            self.embedding_service = EmbeddingService()

        query_embedding = self.embedding_service.embed_text(query)
        

        vector_results = (
            self.repository.search(
                query_embedding,
                limit * 2,
                document_id,
            )
        )

        keyword_results = (
            self.keyword_repository.search(
                query,
                limit * 2,
                document_id,
            )
        )

        return self.merge_results(
            vector_results,
            keyword_results,
            limit,
        )

    def merge_results(
            self,
            vector_results,
            keyword_results,
            limit,
    ):

        merged = {}

        #
        # Vector search
        #
        for chunk, distance in vector_results:
            similarity = 1.0 - float(distance)

            merged[chunk.id] = {
                "chunk": chunk,
                "vector": similarity,
                "keyword": 0.0,
            }

        #
        # Keyword search
        #
        for chunk, rank in keyword_results:

            rank = float(rank)

            if chunk.id in merged:

                merged[chunk.id]["keyword"] = rank

            else:

                merged[chunk.id] = {
                    "chunk": chunk,
                    "vector": 0.0,
                    "keyword": rank,
                }

        #
        # Weighted hybrid score
        #
        results = []

        for item in merged.values():
            hybrid_score = (
                    0.7 * item["vector"]
                    +
                    0.3 * item["keyword"]
            )

            results.append(
                (
                    item["chunk"],
                    hybrid_score,
                )
            )

        results.sort(
            key=lambda x: x[1],
            reverse=True,
        )

        return results[:limit]