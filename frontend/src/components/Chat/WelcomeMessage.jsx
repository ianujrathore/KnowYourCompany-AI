import { Sparkles, FileText } from 'lucide-react';

const WelcomeMessage = ({ onSuggestionClick }) => {
  const suggestions = [
    "What are the leave policies?",
    "What are the working hours?",
    "How do I report harassment?",
    "What is the promotion policy?"
  ];

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-[#1a3a5c]/10 text-[#1a3a5c] px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          <span>Tech Solutions Pvt. Ltd.</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1a3a5c] mb-3">
          KnowYourCompany AI Assistant
        </h2>
        
        <p className="text-[#64748b] text-sm sm:text-base mb-8 max-w-lg mx-auto">
          Your intelligent HR assistant. Ask me anything about company policies, benefits, and procedures.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick(suggestion)}
              className="bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm text-[#1e293b] hover:border-[#1a3a5c] hover:shadow-md transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#1a3a5c] flex-shrink-0" />
              <span className="text-left">{suggestion}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;