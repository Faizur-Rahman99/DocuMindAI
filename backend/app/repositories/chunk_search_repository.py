from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.models.chunk_embedding import ChunkEmbedding
from app.db.models.document_chunk import DocumentChunk


class ChunkSearchRepository:
    def __init__(self, db: Session):
        self.db = db

    def search(
            self,
            query_embedding: list[float],
            limit: int = 5,
            document_id: int | None = None,
    ):
        stmt = (
            select(
                DocumentChunk,
                ChunkEmbedding.embedding.cosine_distance(
                    query_embedding
                ).label("distance"),
            )
            .join(
                ChunkEmbedding,
                DocumentChunk.id == ChunkEmbedding.chunk_id,
            )
        )

        if document_id is not None:
            stmt = stmt.where(
                DocumentChunk.document_id == document_id
            )

        stmt = (
            stmt.order_by(
                ChunkEmbedding.embedding.cosine_distance(
                    query_embedding
                )
            )
            .limit(limit)
        )

        return self.db.execute(stmt).all()