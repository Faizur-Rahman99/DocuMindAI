from fastapi import (
    APIRouter,
    Depends,
    File,
    UploadFile,
    HTTPException,
    BackgroundTasks,
)

from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.db.models.user import User
from app.schemas.document import (
    DocumentResponse,
    RenameDocumentRequest,
)
from typing import List
from app.security.dependencies import get_current_user
from app.services.document_service import DocumentService


from app.core.exceptions import (
    InvalidFileTypeError,
    FileTooLargeError,
)

router = APIRouter()

@router.get(
    "",
    response_model=list[DocumentResponse],
)
def get_documents(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = DocumentService(db)

    return service.get_documents(
        current_user.id,
    )

@router.get(
    "/{document_id}",
    response_model=DocumentResponse,
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = DocumentService(db)

    return service.get_document(
        document_id=document_id,
        user_id=current_user.id,
    )

@router.post(
    "/upload",
    response_model=DocumentResponse,
)
def upload_document(
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = DocumentService(db)

    try:
        return service.upload_document(
            file=file,
            current_user=current_user,
            background_tasks=background_tasks,
        )

    except InvalidFileTypeError as e:
        raise HTTPException(
            status_code=400,
            detail=str(e),
        )

    except FileTooLargeError as e:
        raise HTTPException(
            status_code=413,
            detail=str(e),
        )

@router.patch(
    "/{document_id}",
    response_model=DocumentResponse,
)
def rename_document(
    document_id: int,
    request: RenameDocumentRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = DocumentService(db)

    return service.rename_document(
        document_id=document_id,
        user_id=current_user.id,
        new_name=request.original_filename,
    )

@router.delete(
    "/{document_id}",
    status_code=204,
)
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    service = DocumentService(db)

    service.delete_document(
        document_id=document_id,
        user_id=current_user.id,
    )