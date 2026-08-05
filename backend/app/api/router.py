from fastapi import APIRouter

from app.api.v1 import (
    chat,
    conversations,
    documents,
    health,
    users,
    settings,
)

api_router = APIRouter()

api_router.include_router(
    health.router,
)

api_router.include_router(
    documents.router,
    prefix="/documents",
    tags=["Documents"],
)

api_router.include_router(
    users.router,
    prefix="/users",
)

api_router.include_router(
    chat.router,
    prefix="/chat",
    tags=["Chat"],
)

api_router.include_router(
    conversations.router,
    prefix="/conversations",
    tags=["Conversations"],
)

api_router.include_router(
    settings.router,
    prefix="/settings",
    tags=["Settings"],
)