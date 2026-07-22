import { Send } from 'lucide-react';
import { useState } from 'react';

const InputBox = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 sm:gap-3">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about company policies, benefits, or procedures..."
            disabled={isLoading}
            className="w-full px-4 py-3 sm:px-5 sm:py-3.5 bg-white border border-[#e2e8f0] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/30 focus:border-[#1a3a5c] transition-all text-sm placeholder:text-[#94a3b8] disabled:opacity-60"
          />
        </div>
        <button
          type="submit"
          disabled={!message.trim() || isLoading}
          className="px-4 py-3 sm:px-6 sm:py-3.5 bg-[#1a3a5c] text-white rounded-2xl hover:bg-[#15304d] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg flex-shrink-0"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline text-sm font-medium">Send</span>
        </button>
      </form>
    </div>
  );
};

export default InputBox;