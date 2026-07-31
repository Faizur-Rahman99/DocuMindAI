from pathlib import Path

from app.services.extraction.base import BaseExtractor
from app.services.extraction.txt_extractor import TxtExtractor
from app.services.extraction.pdf_extractor import PdfExtractor
from app.services.extraction.docx_extractor import DocxExtractor


class ExtractorFactory:

    @staticmethod
    def get_extractor(file_path: Path) -> BaseExtractor:
        suffix = file_path.suffix.lower()

        if suffix == ".txt":
            return TxtExtractor()

        if suffix == ".pdf":
            return PdfExtractor()

        if suffix == ".docx":
            return DocxExtractor()

        raise ValueError(
            f"No extractor for {suffix}"
        )