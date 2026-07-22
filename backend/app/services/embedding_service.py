from sentence_transformers import SentenceTransformer
from app.config import EMBEDDING_MODEL

class EmbeddingService:
    _instance = None
    _model = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        if self._model is None:
            print(f"Loading: {EMBEDDING_MODEL}")
            self._model = SentenceTransformer(EMBEDDING_MODEL)
            print("Embedding model ready")
    
    def embed_texts(self, texts):
        return self._model.encode(texts).tolist()