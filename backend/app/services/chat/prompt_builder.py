class PromptBuilder:

    @staticmethod
    def build(
        question: str,
        context: str,
        history: str,
    ) -> str:
        return f"""
        Conversation History

        {history}

        --------------------------------------------------

        Retrieved Document Context

        {context}

        --------------------------------------------------

        User Question

        {question}
        """