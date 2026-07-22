from app.services.vector_store import VectorStore
from app.services.llm_service import LLMService
from app.utils.helpers import format_sources

class RAGService:
    def __init__(self):
        self.vector_store = VectorStore()
        self.llm_service = LLMService()
    
    def get_response(self, question):
        # Search with more results
        results = self.vector_store.search(question, n_results=8)
        
        if not results['documents'] or not results['documents'][0]:
            return "I couldn't find enough information to answer that accurately. Please contact the HR team for further assistance.", []
        
        documents = results['documents'][0]
        metadatas = results['metadatas'][0]
        
        # Simple filter: only keep pages with substantial content
        filtered_docs = []
        filtered_metas = []
        seen_pages = set()
        
        for doc, meta in zip(documents, metadatas):
            page = meta.get('page', 'N/A')
            
            # Skip if content is too short (likely not a policy page)
            if len(doc.strip()) < 150:
                continue
            
            # Skip duplicate pages
            if page in seen_pages:
                continue
            
            seen_pages.add(page)
            filtered_docs.append(doc)
            filtered_metas.append(meta)
        
        # If we filtered everything, use all results
        if not filtered_docs:
            filtered_docs = documents[:5]
            filtered_metas = metadatas[:5]
        
        # Prepare context
        context_parts = []
        for doc, meta in zip(filtered_docs, filtered_metas):
            page = meta.get('page', 'N/A')
            context_parts.append(f"[Page {page}]\n{doc}")
        
        context = "\n\n---\n\n".join(context_parts)
        
        # Get LLM response
        answer = self.llm_service.get_response(context, question)
        
        # Format sources
        sources = format_sources(filtered_metas)
        
        return answer, sources