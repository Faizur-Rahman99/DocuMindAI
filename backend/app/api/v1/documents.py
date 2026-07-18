from fastapi import APIRouter

router = APIRouter()


@router.get("/", tags=["Documents"])
async def get_documents():
    return {
        "documents": []
    }