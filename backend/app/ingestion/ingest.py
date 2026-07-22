import uuid
from app.ingestion.loader import PDFLoader
from app.ingestion.splitter import TextSplitter
from app.services.vector_store import VectorStore

class IngestionPipeline:
    def __init__(self):
        self.loader = PDFLoader()
        self.splitter = TextSplitter()
        self.vector_store = VectorStore()
    
    def ingest(self):
        print("Starting ingestion...")
        
        docs = self.loader.load_all_pdfs()
        chunks = self.splitter.split_documents(docs)
        
        texts = [c.page_content for c in chunks]
        metadatas = [c.metadata for c in chunks]
        ids = [str(uuid.uuid4()) for _ in chunks]
        
        # Clear existing data
        try:
            self.vector_store.client.delete_collection("company_handbook")
        except:
            pass
        
        # Re-initialize
        self.vector_store._initialize()
        
        # Add documents with embeddings
        self.vector_store.add_documents(texts, metadatas, ids)
        
        print(f"Ingestion complete! {len(chunks)} chunks stored")
        return len(chunks)

if __name__ == "__main__":
    pipeline = IngestionPipeline()
    pipeline.ingest()