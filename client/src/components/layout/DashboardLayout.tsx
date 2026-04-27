import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: "superadmin" | "admin" | "student";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/40 backdrop-blur-[4px] z-[45] lg:hidden animate-in fade-in duration-[300ms]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar role={role} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="lg:pl-[260px] flex flex-col min-h-screen transition-all duration-[300ms]">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="p-[16px] sm:p-[24px] lg:p-[40px] flex-1">
          <div className="max-w-[1440px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
