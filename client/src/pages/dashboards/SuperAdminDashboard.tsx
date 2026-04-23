import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Users, BookOpen, DollarSign, Activity, TrendingUp, ShieldAlert, UserPlus } from "lucide-react";
import AddStudentModal from "../../components/layout/AddStudentModal";

const SuperAdminDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = [
    { label: "Total Users", value: "12,450", change: "+12%", icon: Users, color: "bg-blue-500" },
    { label: "Active Courses", value: "856", change: "+5%", icon: BookOpen, color: "bg-purple-500" },
    { label: "Total Revenue", value: "$45,230", change: "+18%", icon: DollarSign, color: "bg-emerald-500" },
    { label: "System Health", value: "99.9%", change: "Stable", icon: Activity, color: "bg-amber-500" },
  ];

  return (
    <DashboardLayout role="superadmin">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Super Admin Overview</h1>
            <p className="text-gray-500 mt-1">Global system performance and management</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            <UserPlus size={20} />
            Add Student
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon size={24} />
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith("+") ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent System Activity</h2>
              <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {[
                { action: "New School Registered", user: "Greenwood Academy", time: "2 hours ago", icon: TrendingUp, color: "text-blue-500" },
                { action: "Security Update Deployed", user: "System", time: "5 hours ago", icon: ShieldAlert, color: "text-amber-500" },
                { action: "Major Database Backup", user: "System", time: "12 hours ago", icon: Activity, color: "text-emerald-500" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                    <item.icon className={item.color} size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{item.action}</p>
                    <p className="text-xs text-gray-400">{item.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* User Distribution */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">User Distribution</h2>
            <div className="space-y-6">
              {[
                { label: "Students", value: 85, color: "bg-blue-500" },
                { label: "Teachers", value: 10, color: "bg-purple-500" },
                { label: "Admins", value: 5, color: "bg-amber-500" },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.label}</span>
                    <span className="text-gray-400">{item.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
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
