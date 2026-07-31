from datetime import datetime

from pydantic import BaseModel


class DocumentResponse(BaseModel):
    id: int
    filename: str
    original_filename: str
    file_type: str
    file_size: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class RenameDocumentRequest(BaseModel):
    original_filename: str