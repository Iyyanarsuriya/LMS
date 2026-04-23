import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { GraduationCap, BookOpen, Clock, CheckCircle2, MoreVertical, UserPlus } from "lucide-react";
import AddStudentModal from "../../components/layout/AddStudentModal";

const AdminDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const stats = [
    { label: "Enrolled Students", value: "3,240", change: "+8%", icon: GraduationCap, color: "bg-blue-500" },
    { label: "Total Courses", value: "145", change: "+3", icon: BookOpen, color: "bg-indigo-500" },
    { label: "Pending Reviews", value: "28", change: "Action Needed", icon: Clock, color: "bg-rose-500" },
    { label: "Completion Rate", value: "76%", change: "+4%", icon: CheckCircle2, color: "bg-emerald-500" },
  ];

  return (
    <DashboardLayout role="admin">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your courses and student progress</p>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-[24px] rounded-[24px] border-[1px] border-gray-100 shadow-sm hover:shadow-md transition-all active:scale-[0.98]">
              <div className="flex items-center gap-[16px] mb-[16px]">
                <div className={`${stat.color} w-[40px] h-[40px] rounded-[12px] flex items-center justify-center text-white`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</h3>
                  <p className="text-[20px] font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[12px] font-medium">
                <span className={stat.change.includes("+") ? "text-emerald-600" : "text-amber-600"}>{stat.change}</span>
                <span className="text-gray-400">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[32px]">
          {/* Active  */}
          <div className="xl:col-span-2 bg-white rounded-[24px] border-[1px] border-gray-100 shadow-sm overflow-hidden">
            <div className="p-[24px] flex items-center justify-between border-b-[1px] border-gray-50">
              <h2 className="text-[20px] font-bold text-gray-800">Active Courses</h2>
              <button className="text-blue-600 text-[14px] font-semibold hover:underline">View All</button>
            </div>
            <div className="divide-y-[1px] divide-gray-50">
              {[
                { name: "Advanced React Patterns", students: 124, progress: 85, teacher: "Sarah Johnson" },
                { name: "UI/UX Design Fundamentals", students: 89, progress: 62, teacher: "Michael Chen" },
                { name: "Python for Data Science", students: 256, progress: 45, teacher: "David Miller" },
                { name: "Mobile App Development", students: 78, progress: 92, teacher: "Emily White" },
              ].map((course, i) => (
                <div key={i} className="p-[24px] flex items-center gap-[24px] hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-[48px] h-[48px] bg-gray-50 rounded-[12px] flex items-center justify-center font-bold text-gray-400 group-hover:bg-white group-hover:text-blue-400 transition-all">
                    {course.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate">{course.name}</p>
                    <p className="text-[12px] text-gray-400">By {course.teacher}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-[14px] font-bold text-gray-800">{course.students} Students</p>
                    <div className="w-[100px] h-[6px] bg-gray-100 rounded-full mt-[8px] overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                  <button className="p-[8px] text-gray-400 hover:bg-gray-100 rounded-[10px]">
                    <MoreVertical size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-[24px] border-[1px] border-gray-100 shadow-sm p-[24px]">
            <h2 className="text-[20px] font-bold text-gray-800 mb-[24px]">Pending Approvals</h2>
            <div className="space-y-[24px]">
              {[
                { name: "Alex Rivera", task: "Assignment: Final Project", time: "15m ago" },
                { name: "Jessica Smith", task: "Course Registration: Python", time: "1h ago" },
                { name: "Tom Hardy", task: "Refund Request", time: "3h ago" },
                { name: "Maria Garcia", task: "Assignment: Intro to HTML", time: "5h ago" },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-[4px] pb-[16px] border-b-[1px] border-gray-50 last:border-0 last:pb-0">
                  <div className="flex justify-between items-start">
                    <span className="font-bold text-gray-800 text-[14px]">{item.name}</span>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{item.time}</span>
                  </div>
                  <p className="text-[12px] text-gray-500">{item.task}</p>
                  <div className="flex gap-[8px] mt-[12px]">
                    <button className="flex-1 py-[8px] bg-blue-50 text-blue-600 rounded-[12px] text-[11px] font-bold hover:bg-blue-100 transition-all active:scale-[0.98]">Approve</button>
                    <button className="flex-1 py-[8px] bg-gray-50 text-gray-400 rounded-[12px] text-[11px] font-bold hover:bg-gray-100 transition-all active:scale-[0.98]">Reject</button>
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

export default AdminDashboard;
