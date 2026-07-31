from pathlib import Path

from app.services.extraction.base import BaseExtractor


class TxtExtractor(BaseExtractor):
    def extract(self, file_path: Path) -> str:
        return file_path.read_text(
            encoding="utf-8",
            errors="ignore",
        )