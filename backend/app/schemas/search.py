from pydantic import BaseModel


class SearchRequest(BaseModel):
    query: str
    limit: int = 5


class SearchResult(BaseModel):
    chunk_text: str
    score: float


class SearchResponse(BaseModel):
    results: list[SearchResult]