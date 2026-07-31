from sqlalchemy.orm import Session

from app.db.models.document_content import DocumentContent


class DocumentContentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(
        self,
        document_id: int,
        extracted_text: str,
    ) -> DocumentContent:

        content = DocumentContent(
            document_id=document_id,
            extracted_text=extracted_text,
        )

        self.db.add(content)
        self.db.commit()
        self.db.refresh(content)

        return content