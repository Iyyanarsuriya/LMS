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
      { name: "Quiz Management", path: "/admin/quizzes", icon: FileText },
      { name: "Reports", path: "/admin/reports", icon: BarChart3 },
    ],
    student: [
      { name: "Dashboard", path: "/student", icon: LayoutDashboard },
      { name: "My Courses", path: "/student/courses", icon: BookOpen },
      { name: "Assignments", path: "/student/assignments", icon: FileText },
      { name: "Quizzes", path: "/student/quizzes", icon: ShieldCheck },
      { name: "Messages", path: "/student/messages", icon: MessageSquare },
    ],
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div className={`h-screen w-[260px] bg-white border-r-[1px] border-gray-100 flex flex-col fixed left-0 top-0 z-[50] transition-transform duration-[300ms] lg:translate-x-0 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}>
      <div className="p-[24px] flex items-center justify-between">
        <div className="flex items-center gap-[12px]">
          <div className="w-[44px] h-[44px] bg-blue-600 rounded-[14px] flex items-center justify-center shadow-[0_8px_20px_-6px_rgba(37,99,235,0.3)]">
            <ShieldCheck className="text-white" size={24} />
          </div>
          <span className="font-black text-[22px] text-gray-900 tracking-[-0.02em]">LMS Pro</span>
        </div>
        <button 
          onClick={onClose}
          className="lg:hidden p-[10px] text-gray-400 hover:bg-gray-50 rounded-[12px] transition-colors"
        >
          <X size={22} />
        </button>
      </div>

      <nav className="flex-1 px-[16px] py-[16px] space-y-[4px] overflow-y-auto">
        {currentMenu.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-[12px] px-[16px] py-[12px] rounded-[14px] transition-all duration-[200ms] group ${
                isActive 
                  ? "bg-blue-600 text-white font-bold shadow-[0_4px_12px_-2px_rgba(37,99,235,0.2)]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <item.icon size={20} className={isActive ? "text-white" : "text-gray-400 group-hover:text-blue-600"} />
              <span className="text-[15px]">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-[20px] border-t-[1px] border-gray-50">
        <div className="flex items-center gap-[12px] px-[16px] py-[16px] mb-[12px] bg-gray-50/80 rounded-[20px] border-[1px] border-gray-100/50">
          <div className="w-[42px] h-[42px] rounded-[12px] bg-blue-100 flex items-center justify-center text-blue-600 font-black text-[14px] shadow-sm">
            {JSON.parse(localStorage.getItem("user") || "{}").full_name?.charAt(0) || "U"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-gray-900 truncate">
              {JSON.parse(localStorage.getItem("user") || "{}").full_name || "User"}
            </p>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.05em] mt-[1px]">{role}</p>
          </div>
        </div>
        <button 
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.href = "/";
          }}
          className="flex items-center gap-[12px] px-[16px] py-[14px] w-full rounded-[14px] text-rose-500 font-bold text-[14px] hover:bg-rose-50 transition-all duration-[200ms]"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
