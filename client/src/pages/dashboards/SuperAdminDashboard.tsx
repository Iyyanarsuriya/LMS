import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Users, BookOpen, DollarSign, Activity, TrendingUp, ShieldAlert, UserPlus } from "lucide-react";
import AddStudentModal from "../../components/layout/AddStudentModal";

const SuperAdminDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const stats = [
    { label: "Total Users", value: "12,450", change: "+12%", icon: Users, color: "bg-blue-500" },
    { label: "Active Courses", value: "856", change: "+5%", icon: BookOpen, color: "bg-purple-500" },
    { label: "Total Revenue", value: "$45,230", change: "+18%", icon: DollarSign, color: "bg-emerald-500" },
    { label: "System Health", value: "99.9%", change: "Stable", icon: Activity, color: "bg-amber-500" },
  ];

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-[32px] sm:space-y-[48px]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[24px]">
          <div>
            <h1 className="text-[32px] sm:text-[40px] font-black text-gray-900 tracking-[-0.03em] leading-tight">Welcome, {user.full_name || "Super Admin"}</h1>
            <p className="text-gray-500 mt-[8px] text-[16px] sm:text-[18px] font-medium">Global system performance and management</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center justify-center gap-[12px] bg-blue-600 text-white px-[24px] py-[14px] sm:px-[32px] sm:py-[18px] rounded-[18px] sm:rounded-[22px] font-black text-[15px] sm:text-[17px] hover:bg-blue-700 transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.3)] active:scale-95"
          >
            <UserPlus size={20} className="sm:w-[24px] sm:h-[24px]" />
            Add Student
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[24px]">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-[24px] sm:p-[32px] rounded-[28px] sm:rounded-[32px] border-[1px] border-gray-100 shadow-sm hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.05)] transition-all active:scale-[0.98] group">
              <div className="flex items-center justify-between mb-[20px] sm:mb-[24px]">
                <div className={`${stat.color} w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-[14px] sm:rounded-[18px] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} className="sm:w-[24px] sm:h-[24px]" />
                </div>
                <span className={`text-[11px] sm:text-[12px] font-black px-[10px] py-[4px] rounded-full tracking-wider ${stat.change.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] mb-[4px]">{stat.label}</h3>
              <p className="text-[22px] sm:text-[28px] font-black text-gray-900 leading-none tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[32px] sm:gap-[40px]">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-sm p-[24px] sm:p-[40px]">
            <div className="flex items-center justify-between mb-[32px]">
              <h2 className="text-[20px] sm:text-[24px] font-black text-gray-900 tracking-tight">Recent System Activity</h2>
              <button className="text-blue-600 text-[14px] sm:text-[15px] font-black hover:bg-blue-50 px-[16px] py-[8px] rounded-[10px] transition-all">View All</button>
            </div>
            <div className="space-y-[24px] sm:space-y-[32px]">
              {[
                { action: "New School Registered", user: "Greenwood Academy", time: "2 hours ago", icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
                { action: "Security Update Deployed", user: "System", time: "5 hours ago", icon: ShieldAlert, color: "text-amber-500", bg: "bg-amber-50" },
                { action: "Major Database Backup", user: "System", time: "12 hours ago", icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-[16px] sm:gap-[20px] group cursor-pointer p-[12px] -m-[12px] rounded-[20px] hover:bg-gray-50 transition-all">
                  <div className={`w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-[14px] sm:rounded-[18px] ${item.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                    <item.icon className={`${item.color} sm:w-[24px] sm:h-[24px]`} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] sm:text-[16px] font-black text-gray-900 group-hover:text-blue-600 transition-colors truncate">{item.action}</p>
                    <p className="text-[12px] sm:text-[13px] text-gray-400 font-bold mt-[2px]">{item.user}</p>
                  </div>
                  <span className="text-[11px] sm:text-[12px] text-gray-400 font-black uppercase tracking-wider">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Distribution */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-sm p-[24px] sm:p-[40px]">
            <h2 className="text-[20px] sm:text-[24px] font-black text-gray-900 mb-[32px] tracking-tight">User Distribution</h2>
            <div className="space-y-[24px] sm:space-y-[32px]">
              {[
                { label: "Students", value: 85, color: "bg-blue-500" },
                { label: "Teachers", value: 10, color: "bg-purple-500" },
                { label: "Admins", value: 5, color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.label} className="space-y-[12px]">
                  <div className="flex justify-between text-[14px] sm:text-[15px]">
                    <span className="font-black text-gray-800">{item.label}</span>
                    <span className="text-gray-400 font-bold">{item.value}%</span>
                  </div>
                  <div className="h-[10px] sm:h-[12px] w-full bg-gray-50 rounded-full overflow-hidden border-[1px] border-gray-100/50">
                    <div className={`h-full ${item.color} shadow-[0_0_8px_rgba(0,0,0,0.1)]`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-[48px] p-[24px] bg-blue-50/50 rounded-[24px] border-[1px] border-blue-100/50">
              <p className="text-[12px] text-blue-600 font-black uppercase tracking-[0.05em] mb-[8px]">System Status</p>
              <div className="flex items-center gap-[12px]">
                <div className="w-[10px] h-[10px] bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                <span className="text-[15px] font-black text-blue-900">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={() => alert("Student added successfully!")} 
      />
    </DashboardLayout>
  );
};

export default SuperAdminDashboard;
