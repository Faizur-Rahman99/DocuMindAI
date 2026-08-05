from fastapi import APIRouter, Depends

from app.core.config import settings
from app.db.models.user import User
from app.security.dependencies import get_current_user

router = APIRouter()


@router.get("")
def get_settings(
    current_user: User = Depends(get_current_user),
):
    return {
        "account": {
            "email": current_user.email,
            "username": current_user.username,
            "active": current_user.is_active,
            "member_since": current_user.created_at,
        },
        "ai": {
            "provider": "Ollama",
            "model": settings.OLLAMA_MODEL,
            "embedding_model": "all-MiniLM-L6-v2",
            "retrieval": "Hybrid Search",
            "streaming": True,
            "chunk_size": 500,
            "chunk_overlap": 50,
        },
        "system": {
            "application": settings.APP_NAME,
            "version": settings.APP_VERSION,
            "backend": "FastAPI",
            "frontend": "React + TypeScript",
            "database": "PostgreSQL",
            "vector_database": "pgvector",
        },
    }