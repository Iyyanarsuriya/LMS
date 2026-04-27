import React from "react";
import { Search, Bell, User, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  return (
    <header className="h-[80px] bg-white/80 backdrop-blur-md border-b-[1px] border-gray-100 flex items-center justify-between px-[16px] sm:px-[24px] lg:px-[32px] sticky top-0 z-40">
      <div className="flex items-center gap-[16px]">
        <button 
          onClick={onMenuClick}
          className="p-[10px] text-gray-500 hover:bg-gray-50 rounded-[12px] lg:hidden transition-all active:scale-95"
        >
          <Menu size={24} />
        </button>
        
        <div className="relative w-[200px] sm:w-[320px] lg:w-[400px] group hidden sm:block">
          <Search className="absolute left-[14px] top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-[44px] pr-[16px] py-[12px] bg-gray-50 border-[1.5px] border-transparent focus:border-blue-100 rounded-[14px] text-[14px] transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-[12px] sm:gap-[24px]">
        <button className="relative p-[11px] text-gray-500 hover:bg-gray-50 rounded-[14px] transition-colors group">
          <Bell size={21} className="group-hover:rotate-12 transition-transform" />
          <span className="absolute top-[12px] right-[12px] w-[8px] h-[8px] bg-rose-500 rounded-full border-[2px] border-white shadow-sm"></span>
        </button>

        <div className="flex items-center gap-[12px] sm:gap-[20px] pl-[12px] sm:pl-[24px] border-l-[1px] border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-bold text-gray-900 leading-none">{user.full_name || "Guest User"}</p>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.05em] mt-[4px]">{user.role || "Guest"}</p>
          </div>
          <div className="w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] bg-gradient-to-br from-blue-500 to-blue-700 rounded-[14px] sm:rounded-[16px] flex items-center justify-center text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.25)] active:scale-95 transition-all cursor-pointer hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.4)] font-bold text-[18px]">
            {user.full_name ? user.full_name.charAt(0) : <User size={22} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
