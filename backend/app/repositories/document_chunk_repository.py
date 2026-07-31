from sqlalchemy.orm import Session

from app.db.models.document_chunk import DocumentChunk


class DocumentChunkRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_many(
            self,
            document_id: int,
            chunks: list[str],
    ):

        db_chunks = []

        for index, chunk in enumerate(chunks):
            db_chunks.append(
                DocumentChunk(
                    document_id=document_id,
                    chunk_index=index,
                    chunk_text=chunk,
                )
            )

        self.db.add_all(db_chunks)
        self.db.commit()

        for chunk in db_chunks:
            self.db.refresh(chunk)

        return db_chunks