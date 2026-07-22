import { BookOpen, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import { useState } from 'react';

const Sources = ({ sources }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-2 ml-12">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs text-[#64748b] hover:text-[#1a3a5c] transition-colors bg-[#f1f5f9] px-3 py-1.5 rounded-full"
      >
        <BookOpen className="w-3.5 h-3.5" />
        <span className="font-medium">References ({sources.length})</span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {isOpen && (
        <div className="mt-2 p-4 bg-[#f8fafc] rounded-xl border border-[#e2e8f0] shadow-sm">
          <ul className="space-y-1.5">
            {sources.map((source, index) => (
              <li key={index} className="flex items-start gap-2 text-xs text-[#475569]">
                <FileText className="w-3.5 h-3.5 text-[#1a3a5c] flex-shrink-0 mt-0.5" />
                <span>{source}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sources;