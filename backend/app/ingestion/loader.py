import os
from langchain_community.document_loaders import PyPDFLoader
from app.config import DATA_PATH

class PDFLoader:
    def load_all_pdfs(self):
        documents = []
        
        if not os.path.exists(DATA_PATH):
            raise FileNotFoundError(f"Data folder not found: {DATA_PATH}")
        
        pdf_files = [f for f in os.listdir(DATA_PATH) if f.endswith('.pdf')]
        
        if not pdf_files:
            raise ValueError(f"No PDF files in {DATA_PATH}")
        
        for pdf_file in pdf_files:
            print(f"Loading: {pdf_file}")
            loader = PyPDFLoader(os.path.join(DATA_PATH, pdf_file))
            docs = loader.load()
            for doc in docs:
                doc.metadata['source'] = pdf_file
            documents.extend(docs)
        
        print(f"Loaded {len(documents)} pages")
        return documents