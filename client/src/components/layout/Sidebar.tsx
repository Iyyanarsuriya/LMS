import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Settings, 
  LogOut, 
  GraduationCap, 
  BarChart3, 
  ShieldCheck,
  MessageSquare,
  FileText,
  X
} from "lucide-react";

interface SidebarProps {
  role: "superadmin" | "admin" | "student";
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = {
    superadmin: [
      { name: "Dashboard", path: "/super-admin", icon: LayoutDashboard },
      { name: "User Management", path: "/super-admin/users", icon: Users },
      { name: "Global Analytics", path: "/super-admin/analytics", icon: BarChart3 },
      { name: "System Settings", path: "/super-admin/settings", icon: Settings },
    ],
    admin: [
      { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
      { name: "Course Management", path: "/admin/courses", icon: BookOpen },
      { name: "Student List", path: "/admin/students", icon: GraduationCap },
      { name: "Reports", path: "/admin/reports", icon: FileText },
    ],
    student: [
      { name: "Dashboard", path: "/student", icon: LayoutDashboard },
      { name: "My Courses", path: "/student/courses", icon: BookOpen },
      { name: "Assignments", path: "/student/assignments", icon: FileText },
      { name: "Messages", path: "/student/messages", icon: MessageSquare },
    ],
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div className={`h-screen w-[256px] bg-white border-r-[1px] border-gray-100 flex flex-col fixed left-0 top-0 z-[50] transition-transform duration-300 lg:translate-x-0 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}>
      <div className="p-[24px] flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <div className="w-[40px] h-[40px] bg-blue-600 rounded-[12px] flex items-center justify-center shadow-lg shadow-blue-200">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="font-bold text-[20px] text-gray-800 tracking-tight">LMS Pro</span>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-[8px] text-gray-400 hover:bg-gray-50 rounded-[10px]"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {currentMenu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-blue-50 text-blue-600 font-semibold shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
              }`}
            >
              <item.icon size={20} />
              <span className="text-[14px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-50">
        <div className="flex items-center gap-3 px-4 py-4 mb-2 bg-gray-50/50 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
            {JSON.parse(localStorage.getItem("user") || "{}").full_name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-800 truncate">
              {JSON.parse(localStorage.getItem("user") || "{}").full_name || "User"}
            </p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{role}</p>
          </div>
        </div>
        <button 
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";
          }}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="text-[14px] font-semibold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
