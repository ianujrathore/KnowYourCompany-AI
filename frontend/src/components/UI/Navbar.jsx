import { Building2, MessageSquare, Sparkles } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-[#e2e8f0] px-4 sm:px-6 py-3 shadow-sm flex-shrink-0">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#1a3a5c] to-[#2a5a7c] rounded-xl flex items-center justify-center shadow-md">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base sm:text-xl font-bold text-[#1a3a5c] tracking-tight">KnowYourCompany</h1>
            <p className="text-[10px] sm:text-xs text-[#64748b] -mt-0.5 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              <span>AI Assistant</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-[#64748b] bg-[#f1f5f9] px-2 py-1 sm:px-3 sm:py-1.5 rounded-full">
          <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Employee Support</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;