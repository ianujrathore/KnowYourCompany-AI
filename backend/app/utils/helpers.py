def format_sources(metadatas):
    """Extract and format source information."""
    sources = []
    for meta in metadatas:
        source = meta.get('source', 'Unknown')
        page = meta.get('page', 'N/A')
        sources.append(f"{source} (Page {page})")
    return list(set(sources))[:3]