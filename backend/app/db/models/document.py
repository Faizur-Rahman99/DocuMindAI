from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    ForeignKey,
)
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from app.db.base import Base

from app.core.enums import DocumentStatus


class Document(Base):
    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True,
    )

    filename = Column(
        String(255),
        nullable=False,
    )

    original_filename = Column(
        String(255),
        nullable=False,
    )

    file_type = Column(
        String(255),
        nullable=False,
    )

    file_size = Column(
        Integer,
        nullable=False,
    )

    storage_path = Column(
        String(500),
        nullable=False,
    )



    status = Column(
        String(50),
        default=DocumentStatus.UPLOADED.value,
        nullable=False,
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    owner = relationship(
        "User",
        back_populates="documents",
    )

    content = relationship(
        "DocumentContent",
        back_populates="document",
        cascade="all, delete-orphan",
        uselist=False,
    )

    chunks = relationship(
        "DocumentChunk",
        back_populates="document",
        cascade="all, delete-orphan",
    )