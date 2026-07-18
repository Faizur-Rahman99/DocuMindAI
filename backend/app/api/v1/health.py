import logging

from fastapi import APIRouter

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/health", tags=["Health"])
async def health():
    logger.info("Health endpoint called")

    return {
        "status": "healthy"
    }