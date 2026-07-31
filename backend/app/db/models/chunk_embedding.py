from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
)

from sqlalchemy.orm import relationship

from pgvector.sqlalchemy import Vector

from app.db.base import Base


class ChunkEmbedding(Base):
    __tablename__ = "chunk_embeddings"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    chunk_id = Column(
        Integer,
        ForeignKey("document_chunks.id"),
        nullable=False,
        unique=True,
    )

    embedding = Column(
        Vector(384),
        nullable=False,
    )

    chunk = relationship(
        "DocumentChunk",
        back_populates="embedding",
    )