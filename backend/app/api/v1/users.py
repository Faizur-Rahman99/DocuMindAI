from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies.database import get_db
from app.schemas.user import UserCreate, UserResponse
from app.services.user_service import UserService
from app.core.exceptions import UserAlreadyExistsError
from app.schemas.auth import (
    LoginRequest,
    Token,
)
from app.core.exceptions import InvalidCredentialsError

from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()


@router.post(
    "/register",
    response_model=UserResponse,
    status_code=201,
)
def register(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    return service.register_user(user)

@router.post(
    "/login",
    response_model=Token,
)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db),
):
    service = UserService(db)

    try:
        return service.login_user(
            login_data.email,
            login_data.password,
        )

    except InvalidCredentialsError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )

@router.post(
    "/token",
    response_model=Token,
)
def token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    service = UserService(db)

    try:
        return service.login_user(
            form_data.username,
            form_data.password,
        )

    except InvalidCredentialsError as e:
        raise HTTPException(
            status_code=401,
            detail=str(e),
        )

from app.db.models.user import User
from app.security.dependencies import get_current_user


@router.get("/me")
def read_me(
    current_user: User = Depends(get_current_user),
):
    return {
        "id": current_user.id,
        "email": current_user.email,
        "username": current_user.username,
    }