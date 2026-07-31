from sqlalchemy import func
from sqlalchemy.orm import Session

from app.db.models.document_chunk import DocumentChunk


class KeywordSearchRepository:
    def __init__(self, db: Session):
        self.db = db

    def search(
        self,
        query: str,
        limit: int = 5,
        document_id: int | None = None,
    ):

        rank = func.ts_rank(
            func.to_tsvector(
                "english",
                DocumentChunk.chunk_text,
            ),
            func.plainto_tsquery(
                "english",
                query,
            ),
        )

        query_obj = (
            self.db.query(
                DocumentChunk,
                rank.label("rank"),
            )
            .filter(
                func.to_tsvector(
                    "english",
                    DocumentChunk.chunk_text,
                ).match(query)
            )
        )

        if document_id is not None:
            query_obj = query_obj.filter(
                DocumentChunk.document_id == document_id
            )

        return (
            query_obj
            .order_by(rank.desc())
            .limit(limit)
            .all()
        )