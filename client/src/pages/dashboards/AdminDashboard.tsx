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
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.full_name || "Admin"}</h1>
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
          {/* Active Courses */}
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

          {/* Real Recent Students */}
          <div className="bg-white rounded-[24px] border-[1px] border-gray-100 shadow-sm p-[24px]">
            <h2 className="text-[20px] font-bold text-gray-800 mb-[24px]">Recent Students</h2>
            <div className="space-y-[24px]">
              {loading ? (
                <div className="text-center py-8 text-gray-400 text-sm italic">Loading students...</div>
              ) : students.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-sm italic">No students registered yet.</div>
              ) : (
                students.slice(0, 5).map((student, i) => (
                  <div key={i} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {student.full_name?.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-800 truncate">{student.full_name}</p>
                      <p className="text-xs text-gray-400 truncate">{student.email}</p>
                    </div>
                    <div className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full uppercase">
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
