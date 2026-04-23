import React from "react";
import { Search, Bell, User, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="h-[80px] bg-white/80 backdrop-blur-md border-b-[1px] border-gray-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-[8px] text-gray-500 hover:bg-gray-50 rounded-[10px] lg:hidden transition-all active:scale-95"
        >
          <Menu size={24} />
        </button>
        
        <div className="relative w-[200px] sm:w-[320px] lg:w-[400px] group hidden sm:block">
          <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full pl-[40px] pr-[16px] py-[10px] bg-gray-50 border-[1.5px] border-transparent focus:border-blue-100 rounded-[12px] text-[14px] transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <button className="relative p-[10px] text-gray-500 hover:bg-gray-50 rounded-[12px] transition-colors">
          <Bell size={20} />
          <span className="absolute top-[10px] right-[10px] w-[8px] h-[8px] bg-red-500 rounded-full border-[2px] border-white"></span>
        </button>

        <div className="flex items-center gap-3 pl-3 sm:pl-6 border-l-[1px] border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-[14px] font-semibold text-gray-800 leading-none">John Doe</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-[4px]">Admin</p>
          </div>
          <div className="w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-[12px] sm:rounded-[14px] flex items-center justify-center text-white shadow-lg shadow-blue-100 active:scale-95 transition-transform cursor-pointer">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
