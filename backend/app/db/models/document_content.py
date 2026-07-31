from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    Text,
)

from sqlalchemy.orm import relationship

from app.db.base import Base


class DocumentContent(Base):
    __tablename__ = "document_contents"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    document_id = Column(
        Integer,
        ForeignKey("documents.id"),
        unique=True,
        nullable=False,
    )

    extracted_text = Column(
        Text,
        nullable=False,
    )

    document = relationship(
        "Document",
        back_populates="content",
    )