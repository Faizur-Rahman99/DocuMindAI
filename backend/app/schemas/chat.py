from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str
    conversation_id: int
    document_id: int | None = None


class SourceResponse(BaseModel):
    chunk_id: int
    document_id: int
    filename: str
    score: float
    text: str


class ChatResponse(BaseModel):
    answer: str
    conversation_id: int
    sources: list[SourceResponse]


class MessageResponse(BaseModel):
    role: str
    content: str

    class Config:
        from_attributes = True