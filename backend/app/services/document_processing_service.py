from pathlib import Path

from sqlalchemy.orm import Session

from app.db.models.document import Document

from app.repositories.document_content_repository import (
    DocumentContentRepository,
)

from app.services.extraction.factory import (
    ExtractorFactory,
)

from app.repositories.document_chunk_repository import (
    DocumentChunkRepository,
)

from app.services.chunking.text_chunker import (
    TextChunker,
)

from app.services.embeddings.embedding_service import (
    EmbeddingService,
)

from app.repositories.chunk_embedding_repository import (
    ChunkEmbeddingRepository,
)

from app.core.enums import DocumentStatus

import logging

logger = logging.getLogger(__name__)

class DocumentProcessingService:
    def __init__(self, db: Session):
        self.db = db

        self.content_repository = (
            DocumentContentRepository(db)
        )

        self.chunk_repository = (
            DocumentChunkRepository(db)
        )

        self.chunker = TextChunker()

        self.embedding_service = None

        self.embedding_repository = (
            ChunkEmbeddingRepository(db)
        )

    def extract_text(
        self,
        storage_path: Path,
    ) -> str:

        extractor = (
            ExtractorFactory.get_extractor(
                storage_path
            )
        )

        return extractor.extract(storage_path)

    def chunk_text(
            self,
            extracted_text: str,
    ) -> list[str]:
        return self.chunker.split(
            extracted_text
        )

    def save_chunks(
            self,
            document_id: int,
            chunks: list[str],
    ):
        return self.chunk_repository.create_many(
            document_id=document_id,
            chunks=chunks,
        )

    def save_document_content(
        self,
        document_id: int,
        extracted_text: str,
    ):
        self.content_repository.create(
            document_id=document_id,
            extracted_text=extracted_text,
        )

    def generate_embeddings(self, chunks):
        if self.embedding_service is None:
            logger.info("Loading SentenceTransformer model...")
            self.embedding_service = EmbeddingService()
            logger.info("SentenceTransformer loaded")

        return self.embedding_service.embed_texts(chunks)

    def save_embeddings(
            self,
            saved_chunks,
            embeddings,
    ):
        chunk_ids = [
            chunk.id
            for chunk in saved_chunks
        ]

        self.embedding_repository.create_many(
            chunk_ids=chunk_ids,
            embeddings=embeddings,
        )

    def process_document(
            self,
            document: Document,
            storage_path: Path,
    ):
        try:
            logger.info("Started processing document %s", document.id)

            document.status = DocumentStatus.PROCESSING.value
            self.db.commit()

            logger.info("Extracting text...")
            extracted_text = self.extract_text(
                storage_path
            )
            logger.info("Text extraction complete")

            logger.info("Saving extracted text...")
            self.save_document_content(
                document.id,
                extracted_text,
            )

            logger.info("Chunking document...")
            chunks = self.chunk_text(
                extracted_text
            )
            logger.info(f"Created {len(chunks)} chunks")

            logger.info("Saving chunks...")
            saved_chunks = self.save_chunks(
                document.id,
                chunks,
            )

            logger.info("Generating embeddings...")
            embeddings = self.generate_embeddings(
                chunks,
            )
            logger.info("Embeddings generated")

            logger.info("Saving embeddings...")
            self.save_embeddings(
                saved_chunks,
                embeddings,
            )

            logger.info("Marking document READY")
            document.status = DocumentStatus.READY.value
            self.db.commit()

            logger.info(f"Finished processing document {document.id}")

        except Exception:
            logger.exception("Document processing failed")

            document.status = DocumentStatus.FAILED.value
            self.db.commit()
            raise