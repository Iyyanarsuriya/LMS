import React, { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { GraduationCap, BookOpen, Clock, CheckCircle2, MoreVertical, UserPlus } from "lucide-react";
import AddStudentModal from "../../components/layout/AddStudentModal";
import axiosInstance from "../../apiroutes/axiosInstance";

const AdminDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const response = await axiosInstance.get("/students", {
        headers: { "x-user-role": user.role }
      });
      setStudents(response.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStudents();
  }, []);

  const stats = [
    { label: "Enrolled Students", value: loading ? "..." : students.length.toString(), change: "+8%", icon: GraduationCap, color: "bg-blue-500" },
    { label: "Total Courses", value: "145", change: "+3", icon: BookOpen, color: "bg-indigo-500" },
    { label: "Pending Reviews", value: "28", change: "Action Needed", icon: Clock, color: "bg-rose-500" },
    { label: "Completion Rate", value: "76%", change: "+4%", icon: CheckCircle2, color: "bg-emerald-500" },
  ];

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <DashboardLayout role="admin">
      <div className="space-y-[32px] sm:space-y-[48px]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[24px]">
          <div>
            <h1 className="text-[32px] sm:text-[40px] font-black text-gray-900 tracking-[-0.03em] leading-tight">Welcome, {user.full_name || "Admin"}</h1>
            <p className="text-gray-500 mt-[8px] text-[16px] sm:text-[18px] font-medium">Manage your courses and student progress</p>
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
              <div className="flex items-center gap-[16px] sm:gap-[20px] mb-[20px] sm:mb-[24px]">
                <div className={`${stat.color} w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] rounded-[14px] sm:rounded-[18px] flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform`}>
                  <stat.icon size={20} className="sm:w-[24px] sm:h-[24px]" />
                </div>
                <div>
                  <h3 className="text-gray-400 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] mb-[4px]">{stat.label}</h3>
                  <p className="text-[22px] sm:text-[28px] font-black text-gray-900 leading-none">{stat.value}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-[12px] sm:text-[13px] font-bold">
                <span className={`px-[8px] py-[4px] rounded-[8px] ${stat.change.includes("+") ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"}`}>{stat.change}</span>
                <span className="text-gray-400 font-medium">vs last month</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[32px] sm:gap-[40px]">
          {/* Active Courses */}
          <div className="xl:col-span-2 bg-white rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-sm overflow-hidden">
            <div className="p-[24px] sm:p-[32px] flex items-center justify-between border-b-[1px] border-gray-50 bg-gray-50/20">
              <h2 className="text-[20px] sm:text-[24px] font-black text-gray-900">Active Courses</h2>
              <button className="text-blue-600 text-[14px] sm:text-[15px] font-black hover:bg-blue-50 px-[16px] py-[8px] rounded-[10px] transition-all">View All</button>
            </div>
            <div className="divide-y-[1px] divide-gray-50">
              {[
                { name: "Advanced React Patterns", students: 124, progress: 85, teacher: "Sarah Johnson" },
                { name: "UI/UX Design Fundamentals", students: 89, progress: 62, teacher: "Michael Chen" },
                { name: "Python for Data Science", students: 256, progress: 45, teacher: "David Miller" },
                { name: "Mobile App Development", students: 78, progress: 92, teacher: "Emily White" },
              ].map((course, i) => (
                <div key={i} className="p-[24px] sm:p-[32px] flex items-center gap-[20px] sm:gap-[32px] hover:bg-gray-50 transition-colors cursor-pointer group">
                  <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] bg-gray-50 rounded-[16px] sm:rounded-[20px] flex items-center justify-center font-black text-[18px] text-gray-400 group-hover:bg-white group-hover:text-blue-500 group-hover:shadow-sm transition-all">
                    {course.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-black text-gray-900 text-[16px] sm:text-[18px] truncate leading-tight">{course.name}</p>
                    <p className="text-[12px] sm:text-[13px] text-gray-400 font-bold mt-[2px]">By {course.teacher}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-[15px] sm:text-[16px] font-black text-gray-900">{course.students} Students</p>
                    <div className="w-[120px] h-[8px] bg-gray-100 rounded-full mt-[10px] overflow-hidden">
                      <div className="h-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.3)]" style={{ width: `${course.progress}%` }}></div>
                    </div>
                  </div>
                  <button className="p-[10px] text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-[12px] transition-all active:scale-90">
                    <MoreVertical size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Real Recent Students */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-sm p-[24px] sm:p-[32px]">
            <h2 className="text-[20px] sm:text-[24px] font-black text-gray-900 mb-[24px] sm:mb-[32px]">Recent Students</h2>
            <div className="space-y-[20px] sm:space-y-[24px]">
              {loading ? (
                <div className="text-center py-[48px] text-gray-400 text-[14px] italic font-bold">Loading students...</div>
              ) : students.length === 0 ? (
                <div className="text-center py-[48px] text-gray-400 text-[14px] italic font-bold">No students registered yet.</div>
              ) : (
                students.slice(0, 5).map((student, i) => (
                  <div key={i} className="flex items-center gap-[16px] pb-[20px] border-b-[1px] border-gray-50 last:border-0 last:pb-0 group">
                    <div className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] rounded-[14px] sm:rounded-[18px] bg-blue-50 flex items-center justify-center text-blue-600 font-black text-[14px] sm:text-[16px] group-hover:scale-105 transition-transform">
                      {student.full_name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] sm:text-[15px] font-black text-gray-900 truncate leading-tight">{student.full_name}</p>
                      <p className="text-[11px] sm:text-[12px] text-gray-400 truncate font-bold mt-[2px]">{student.email}</p>
                    </div>
                    <div className="px-[10px] py-[4px] bg-emerald-50 text-emerald-600 text-[10px] font-black rounded-full uppercase tracking-widest">
                      {student.status}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <AddStudentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchStudents} 
      />
    </DashboardLayout>
  );
};

export default AdminDashboard;
