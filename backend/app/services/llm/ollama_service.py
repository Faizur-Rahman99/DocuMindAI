from ollama import Client
from ollama import ResponseError

import httpx

from app.core.config import settings
from app.services.chat.prompt_builder import PromptBuilder
from app.services.chat.system_prompt import SYSTEM_PROMPT


class OllamaService:
    def __init__(self):
        self.client = Client(
            host=settings.OLLAMA_BASE_URL
        )

        self.model = settings.OLLAMA_MODEL

    def answer(
            self,
            question: str,
            context: str,
            history: str,
    ) -> str:
        prompt = PromptBuilder.build(
            question=question,
            context=context,
            history=history,
        )

        try:

            response = self.client.chat(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT,
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    },
                ],
            )

            return response["message"]["content"]

        except (
                httpx.ConnectError,
                ResponseError,
                Exception,
        ):

            return self._demo_response()

    def stream_answer(
            self,
            question: str,
            context: str,
            history: str,
    ):
        prompt = PromptBuilder.build(
            question=question,
            context=context,
            history=history,
        )

        try:

            stream = self.client.chat(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": SYSTEM_PROMPT,
                    },
                    {
                        "role": "user",
                        "content": prompt,
                    },
                ],
                stream=True,
            )

            for chunk in stream:
                yield chunk["message"]["content"]

        except (
                httpx.ConnectError,
                ResponseError,
                Exception,
        ):

            yield self._demo_response()

        for chunk in stream:
            print(repr(chunk["message"]["content"]))
            yield chunk["message"]["content"]

    def _demo_response(self) -> str:
        return (
            "⚠️ AI responses are disabled in the public demo.\n\n"
            "This deployment showcases the production-ready architecture of "
            "DocuMind AI, including authentication, document upload, "
            "conversation management, vector database integration, "
            "and the complete RAG pipeline.\n\n"
            "To enable AI responses, configure an external LLM provider "
            "or run Ollama locally."
        )