from sqlalchemy.orm import Session

from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate


class UserService:
    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def create_user(self, user: UserCreate, hashed_password: str):
        return self.repository.create(user, hashed_password)

    def email_exists(self, email: str) -> bool:
        return self.repository.get_by_email(email) is not None

    def username_exists(self, username: str) -> bool:
        return self.repository.get_by_username(username) is not None