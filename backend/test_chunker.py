from app.services.chunking.text_chunker import TextChunker

text = """
Lorem ipsum dolor sit amet, consectetur adipiscing elit.
""" * 100

chunker = TextChunker(
    chunk_size=200,
    overlap=50,
)

chunks = chunker.split(text)

print(f"Total chunks: {len(chunks)}")

for i, chunk in enumerate(chunks):
    print("=" * 40)
    print(f"Chunk {i}")
    print(chunk[:80])