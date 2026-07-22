const LoadingIndicator = () => {
  return (
    <div className="flex items-start gap-3 mb-4">
      <div className="w-9 h-9 rounded-full bg-[#1a3a5c] flex items-center justify-center flex-shrink-0 shadow-sm">
        <span className="text-white text-xs font-bold">AI</span>
      </div>
      <div className="bg-white border border-[#e2e8f0] rounded-2xl rounded-bl-md px-5 py-3.5 shadow-md">
        <div className="flex gap-1.5 items-center">
          <span className="w-2.5 h-2.5 bg-[#1a3a5c]/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2.5 h-2.5 bg-[#1a3a5c]/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2.5 h-2.5 bg-[#1a3a5c]/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;