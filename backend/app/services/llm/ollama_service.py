from ollama import Client

from app.services.chat.prompt_builder import (
    PromptBuilder,
)

from app.services.chat.system_prompt import (
    SYSTEM_PROMPT,
)

from app.core.config import settings

class OllamaService:
    def __init__(self):
        self.client = Client(
            host=settings.OLLAMA_BASE_URL,
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
            print(repr(chunk["message"]["content"]))
            yield chunk["message"]["content"]