from sqlalchemy.orm import Session

from app.db.models.chunk_embedding import ChunkEmbedding


class ChunkEmbeddingRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_many(
        self,
        chunk_ids: list[int],
        embeddings: list[list[float]],
    ):

        objects = []

        for chunk_id, embedding in zip(
            chunk_ids,
            embeddings,
        ):
            objects.append(
                ChunkEmbedding(
                    chunk_id=chunk_id,
                    embedding=embedding,
                )
            )

        self.db.add_all(objects)
        self.db.commit()

        return objects