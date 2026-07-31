from app.services.llm.ollama_service import (
    OllamaService,
)

service = OllamaService()

answer = service.answer(
    question="What is machine learning?",
    context="""
Machine learning is a subset of artificial intelligence.
It enables computers to learn from data.
""",
)

print(answer)