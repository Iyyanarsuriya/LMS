import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BookOpen, Trophy, Clock, Target, Play, ChevronRight } from "lucide-react";

const StudentDashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const stats = [
    { label: "Enrolled Courses", value: "8", icon: BookOpen, color: "bg-blue-500" },
    { label: "Certificates Earned", value: "3", icon: Trophy, color: "bg-amber-500" },
    { label: "Study Hours", value: "45h", icon: Clock, color: "bg-purple-500" },
    { label: "Goal Progress", value: "75%", icon: Target, color: "bg-emerald-500" },
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-[32px] sm:space-y-[48px]">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[32px] sm:rounded-[40px] p-[24px] sm:p-[48px] lg:p-[64px] text-white relative overflow-hidden shadow-[0_20px_50px_-12px_rgba(37,99,235,0.25)] active:scale-[0.99] transition-all">
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-[32px] sm:text-[44px] lg:text-[52px] font-black mb-[16px] sm:mb-[24px] leading-tight tracking-[-0.03em]">Welcome back, {user.full_name || "Student"}! 👋</h1>
            <p className="text-blue-100 text-[16px] sm:text-[20px] mb-[32px] sm:mb-[48px] font-medium opacity-90 max-w-[500px] leading-relaxed">You've completed 75% of your weekly study goal. Keep pushing forward!</p>
            <button className="bg-white text-blue-600 px-[32px] py-[16px] sm:px-[44px] sm:py-[20px] rounded-[18px] sm:rounded-[24px] font-black text-[15px] sm:text-[18px] hover:bg-blue-50 transition-all flex items-center gap-[12px] shadow-xl active:scale-95 group">
              <Play size={20} fill="currentColor" className="group-hover:scale-110 transition-transform" />
              Continue Learning
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full -mr-[100px] -mt-[100px] blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[200px] h-[200px] bg-blue-400/20 rounded-full blur-[80px]"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px] sm:gap-[24px]">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-[24px] sm:p-[32px] rounded-[28px] sm:rounded-[32px] border-[1px] border-gray-100 shadow-sm flex items-center gap-[20px] sm:gap-[24px] hover:shadow-lg transition-all active:scale-[0.98] group">
              <div className={`${stat.color} w-[52px] h-[52px] sm:w-[64px] sm:h-[64px] rounded-[16px] sm:rounded-[20px] flex items-center justify-center text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.15)] group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} className="sm:w-[28px] sm:h-[28px]" />
              </div>
              <div>
                <p className="text-gray-400 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] mb-[4px]">{stat.label}</p>
                <p className="text-[24px] sm:text-[28px] font-black text-gray-900 leading-none">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[32px] sm:gap-[40px]">
          {/* Continue Learning */}
          <div className="xl:col-span-2 space-y-[24px] sm:space-y-[32px]">
            <h2 className="text-[24px] sm:text-[28px] font-black text-gray-900 tracking-tight">Continue Learning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px] sm:gap-[32px]">
              {[
                { title: "Mastering React Hooks", lessons: "12/20", progress: 60, image: "RH" },
                { title: "Fullstack Web Dev", lessons: "45/100", progress: 45, image: "WD" },
              ].map((course, i) => (
                <div key={i} className="bg-white rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-sm overflow-hidden group cursor-pointer hover:border-blue-200 hover:shadow-[0_20px_50px_-12px_rgba(37,99,235,0.08)] transition-all active:scale-[0.98]">
                  <div className="h-[140px] sm:h-[180px] bg-gray-50 flex items-center justify-center text-[40px] sm:text-[52px] font-black text-gray-200 group-hover:bg-blue-50 group-hover:text-blue-100 transition-all duration-[400ms]">
                    {course.image}
                  </div>
                  <div className="p-[24px] sm:p-[32px]">
                    <h3 className="text-[18px] sm:text-[20px] font-black text-gray-900 mb-[12px] group-hover:text-blue-600 transition-colors leading-tight">{course.title}</h3>
                    <p className="text-[13px] sm:text-[14px] text-gray-400 font-bold mb-[24px]">{course.lessons} Lessons completed</p>
                    <div className="flex items-center gap-[16px] sm:gap-[20px]">
                      <div className="flex-1 h-[8px] bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.3)]" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className="text-[13px] sm:text-[14px] font-black text-gray-900">{course.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-[24px] sm:space-y-[32px]">
            <h2 className="text-[24px] sm:text-[28px] font-black text-gray-900 tracking-tight">Upcoming</h2>
            <div className="bg-white rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-sm p-[24px] sm:p-[32px] space-y-[24px] sm:space-y-[32px]">
              {[
                { type: "Assignment", title: "React Performance", date: "Oct 24, 2023", color: "text-rose-500", bg: "bg-rose-50" },
                { type: "Quiz", title: "UI Design Principles", date: "Oct 26, 2023", color: "text-amber-500", bg: "bg-amber-50" },
                { type: "Live Class", title: "Career in Tech", date: "Oct 28, 2023", color: "text-blue-500", bg: "bg-blue-50" },
              ].map((event, i) => (
                <div key={i} className="flex gap-[16px] sm:gap-[20px] group cursor-pointer items-start">
                  <div className={`w-[52px] h-[52px] sm:w-[60px] sm:h-[60px] rounded-[16px] sm:rounded-[20px] ${event.bg} flex flex-col items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                    <span className={`text-[14px] sm:text-[16px] font-black uppercase ${event.color}`}>{event.type.charAt(0)}</span>
                  </div>
                  <div className="flex-1 border-b-[1.5px] border-gray-50 pb-[20px] group-last:border-0 group-last:pb-0 group-hover:border-blue-100 transition-colors min-w-0">
                    <h4 className="text-[15px] sm:text-[17px] font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight truncate">{event.title}</h4>
                    <p className="text-[12px] sm:text-[13px] text-gray-400 font-bold mt-[4px]">{event.date}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 mt-[4px] group-hover:text-blue-500 transition-all group-hover:translate-x-[4px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
