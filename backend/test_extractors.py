from pathlib import Path

from app.services.extraction.factory import ExtractorFactory


path = Path("uploads/user_1/3d63dc2a-d2b9-4a92-96f0-a2fdf756ce64.txt")

extractor = ExtractorFactory.get_extractor(path)

text = extractor.extract(path)

print(text)