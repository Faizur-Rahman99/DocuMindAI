from sqlalchemy.orm import Session

from app.core.exceptions import (
    InvalidCredentialsError,
    UserAlreadyExistsError,
)

from app.security.hashing import (
    hash_password,
    verify_password,
)

from app.repositories.user_repository import UserRepository
from app.schemas.user import UserCreate
from app.db.models.user import User
from app.security.jwt import create_access_token



class UserService:
    def __init__(self, db: Session):
        self.repository = UserRepository(db)

    def register_user(self, user: UserCreate) -> User:
        if self.repository.get_by_email(user.email):
            raise UserAlreadyExistsError("Email already exists.")

        if self.repository.get_by_username(user.username):
            raise UserAlreadyExistsError("Username already exists.")

        hashed_password = hash_password(user.password)

        return self.repository.create(
            user,
            hashed_password,
        )

    def login_user(
            self,
            email: str,
            password: str,
    ) -> dict:
        user = self.repository.get_by_email(email)

        if not user:
            raise InvalidCredentialsError("Invalid email or password.")

        if not verify_password(password, user.hashed_password):
            raise InvalidCredentialsError("Invalid email or password.")

        token = create_access_token(
            {"sub": user.email}
        )

        return {
            "access_token": token,
            "token_type": "bearer",
        }

