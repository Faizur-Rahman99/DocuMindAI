from pathlib import Path
from uuid import uuid4

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.db.models.document import Document
from app.db.models.user import User
from app.repositories.document_repository import DocumentRepository
from fastapi import HTTPException


from app.core.constants import (
    ALLOWED_CONTENT_TYPES,
    ALLOWED_EXTENSIONS,
    MAX_FILE_SIZE,
    UPLOAD_DIR,
)

from app.core.exceptions import (
    InvalidFileTypeError,
    FileTooLargeError,
)

from app.services.document_processing_service import (
            DocumentProcessingService,
        )


class DocumentService:
    def __init__(self, db: Session):

        self.processing_service = (
            DocumentProcessingService(db)
        )

        self.repository = DocumentRepository(db)

    from fastapi import BackgroundTasks

    def upload_document(
            self,
            file: UploadFile,
            current_user: User,
            background_tasks: BackgroundTasks,
    ) -> Document:

        if not file.filename:
            raise ValueError("Uploaded file must have a filename.")

        extension = Path(file.filename).suffix.lower()

        if extension not in ALLOWED_EXTENSIONS:
            raise InvalidFileTypeError(
                f"Unsupported file type: {extension}"
            )

        if file.content_type not in ALLOWED_CONTENT_TYPES:
            raise InvalidFileTypeError(
                f"Unsupported content type: {file.content_type}"
            )

        file.file.seek(0, 2)
        file_size = file.file.tell()
        file.file.seek(0)

        if file_size > MAX_FILE_SIZE:
            raise FileTooLargeError(
                "File exceeds maximum size of 10 MB."
            )

        user_upload_dir = (
                UPLOAD_DIR / f"user_{current_user.id}"
        )

        user_upload_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

        unique_filename = (
            f"{uuid4()}{extension}"
        )

        storage_path = (
                user_upload_dir / unique_filename
        )

        with open(storage_path, "wb") as buffer:
            buffer.write(file.file.read())

        document = Document(
            filename=unique_filename,
            original_filename=file.filename,
            file_type=file.content_type,
            file_size=file_size,
            storage_path=str(storage_path),
            status="uploaded",
            user_id=current_user.id,
        )

        saved_document = self.repository.create(document)

        background_tasks.add_task(
            self.processing_service.process_document,
            saved_document,
            storage_path,
        )

        return saved_document

    def get_documents(
            self,
            user_id: int,
    ):
        return self.repository.get_all_by_user(
            user_id
        )

    def get_document(
            self,
            document_id: int,
            user_id: int,
    ):
        document = self.repository.get_by_id_and_user(
            document_id,
            user_id,
        )

        if document is None:
            raise HTTPException(
                status_code=404,
                detail="Document not found.",
            )

        return document

    def rename_document(
            self,
            document_id: int,
            user_id: int,
            new_name: str,
    ):
        document = self.get_document(
            document_id=document_id,
            user_id=user_id,
        )

        return self.repository.rename(
            document,
            new_name,
        )

    def delete_document(
            self,
            document_id: int,
            user_id: int,
    ):
        document = self.get_document(
            document_id=document_id,
            user_id=user_id,
        )

        file_path = Path(
            document.storage_path
        )

        if file_path.exists():
            file_path.unlink()

        self.repository.delete(document)