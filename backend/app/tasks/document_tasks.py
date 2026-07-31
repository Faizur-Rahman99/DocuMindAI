from pathlib import Path

from app.db.session import SessionLocal
from app.services.document_processing_service import (
    DocumentProcessingService,
)
from app.repositories.document_repository import (
    DocumentRepository,
)


def process_document_task(
    document_id: int,
    storage_path: str,
):
    db = SessionLocal()

    try:
        repository = DocumentRepository(db)

        document = repository.get_by_id(document_id)

        if document is None:
            return

        service = DocumentProcessingService(db)

        service.process_document(
            document=document,
            storage_path=Path(storage_path),
        )

    finally:
        db.close()