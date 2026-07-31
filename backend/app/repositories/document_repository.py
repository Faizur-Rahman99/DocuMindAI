from sqlalchemy.orm import Session

from app.db.models.document import Document


class DocumentRepository:
    def __init__(self, db: Session):
        self.db = db

    def create(self, document: Document) -> Document:
        self.db.add(document)
        self.db.commit()
        self.db.refresh(document)
        return document

    def get_by_id(self, document_id: int) -> Document | None:
        return (
            self.db.query(Document)
            .filter(Document.id == document_id)
            .first()
        )

    def get_user_documents(self, user_id: int):
        return (
            self.db.query(Document)
            .filter(Document.user_id == user_id)
            .all()
        )

    def get_all_by_user(
            self,
            user_id: int,
    ):
        return (
            self.db.query(Document)
            .filter(
                Document.user_id == user_id
            )
            .order_by(
                Document.created_at.desc()
            )
            .all()
        )

    def get_by_id_and_user(
            self,
            document_id: int,
            user_id: int,
    ):
        return (
            self.db.query(Document)
            .filter(
                Document.id == document_id,
                Document.user_id == user_id,
            )
            .first()
        )

    def rename(
            self,
            document,
            new_name: str,
    ):
        document.original_filename = new_name

        self.db.commit()
        self.db.refresh(document)

        return document

    def delete(
            self,
            document,
    ):
        self.db.delete(document)
        self.db.commit()