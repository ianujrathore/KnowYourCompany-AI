import chromadb
from app.config import CHROMA_DB_PATH
from app.services.embedding_service import EmbeddingService

class VectorStore:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    def __init__(self):
        if not hasattr(self, 'collection'):
            self._initialize()
    
    def _initialize(self):
        self.client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
        self.embedding_service = EmbeddingService()
        self.collection = self.client.get_or_create_collection(
            name="company_handbook"
        )
        print(f"ChromaDB: {self.collection.count()} documents")
    
    def add_documents(self, texts, metadatas, ids):
        embeddings = self.embedding_service.embed_texts(texts)
        self.collection.add(
            documents=texts,
            embeddings=embeddings,
            metadatas=metadatas,
            ids=ids
        )
        print(f"Added {len(texts)} documents to ChromaDB")
    
    def search(self, query, n_results=5):
        query_embedding = self.embedding_service.embed_texts([query])[0]
        return self.collection.query(
            query_embeddings=[query_embedding],
            n_results=n_results
        )