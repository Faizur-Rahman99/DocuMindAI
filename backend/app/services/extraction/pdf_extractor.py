from pathlib import Path

from pypdf import PdfReader

from app.services.extraction.base import BaseExtractor


class PdfExtractor(BaseExtractor):
    def extract(self, file_path: Path) -> str:
        reader = PdfReader(file_path)

        text = []

        for page in reader.pages:
            extracted = page.extract_text()

            if extracted:
                text.append(extracted)

        return "\n".join(text)