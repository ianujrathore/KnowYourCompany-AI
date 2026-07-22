import { User, Bot } from 'lucide-react';

const MessageBubble = ({ message, isUser, isTyping }) => {
  if (isUser) {
    return (
      <div className="flex items-start justify-end gap-3 mb-4">
        <div className="max-w-[85%] bg-[#1a3a5c] text-white rounded-2xl rounded-br-md px-5 py-3.5 shadow-md">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#1a3a5c]/10 flex items-center justify-center flex-shrink-0">
          <User className="w-4.5 h-4.5 text-[#1a3a5c]" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-9 h-9 rounded-full bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 shadow-sm">
        <Bot className="w-4.5 h-4.5 text-white" />
      </div>
      <div className="max-w-[85%] bg-white border border-[#e2e8f0] rounded-2xl rounded-bl-md px-5 py-3.5 shadow-md">
        <div className="text-sm leading-relaxed whitespace-pre-wrap">
          {message || <span className="animate-pulse">▌</span>}
        </div>
        {isTyping && (
          <span className="inline-block w-1.5 h-4 bg-[#1a3a5c]/60 animate-blink ml-0.5"></span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;