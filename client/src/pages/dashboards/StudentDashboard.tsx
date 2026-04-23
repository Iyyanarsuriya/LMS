import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BookOpen, Trophy, Clock, Target, Play, ChevronRight } from "lucide-react";

const StudentDashboard: React.FC = () => {
  const stats = [
    { label: "Enrolled Courses", value: "8", icon: BookOpen, color: "bg-blue-500" },
    { label: "Certificates Earned", value: "3", icon: Trophy, color: "bg-amber-500" },
    { label: "Study Hours", value: "45h", icon: Clock, color: "bg-purple-500" },
    { label: "Goal Progress", value: "75%", icon: Target, color: "bg-emerald-500" },
  ];

  return (
    <DashboardLayout role="student">
      <div className="space-y-[32px]">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-[32px] p-[24px] sm:p-[40px] text-white relative overflow-hidden shadow-xl shadow-blue-200 active:scale-[0.99] transition-all">
          <div className="relative z-10 max-w-xl">
            <h1 className="text-[28px] sm:text-[40px] font-bold mb-[16px] leading-tight">Welcome back, Student! 👋</h1>
            <p className="text-blue-100 text-[14px] sm:text-[18px] mb-[32px] opacity-90">You've completed 75% of your weekly study goal. Keep pushing forward!</p>
            <button className="bg-white text-blue-600 px-[32px] py-[12px] rounded-[16px] font-bold hover:bg-blue-50 transition-all flex items-center gap-[8px] shadow-lg active:scale-95">
              <Play size={18} fill="currentColor" />
              Continue Learning
            </button>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-[256px] h-[256px] bg-white/10 rounded-full -mr-[80px] -mt-[80px] blur-[120px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[128px] h-[128px] bg-blue-400/20 rounded-full blur-[80px]"></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[24px]">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-[24px] rounded-[24px] border-[1px] border-gray-100 shadow-sm flex items-center gap-[16px] hover:shadow-md transition-all">
              <div className={`${stat.color} w-[48px] h-[48px] rounded-[14px] flex items-center justify-center text-white shadow-lg shadow-gray-100`}>
                <stat.icon size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-[12px] font-bold uppercase tracking-wider">{stat.label}</p>
                <p className="text-[24px] font-bold text-gray-800">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-[32px]">
          {/* Continue Learning */}
          <div className="xl:col-span-2 space-y-[24px]">
            <h2 className="text-[24px] font-bold text-gray-800">Continue Learning</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
              {[
                { title: "Mastering React Hooks", lessons: "12/20", progress: 60, image: "RH" },
                { title: "Fullstack Web Dev", lessons: "45/100", progress: 45, image: "WD" },
              ].map((course, i) => (
                <div key={i} className="bg-white rounded-[24px] border-[1px] border-gray-100 shadow-sm overflow-hidden group cursor-pointer hover:border-blue-200 hover:shadow-lg transition-all active:scale-[0.98]">
                  <div className="h-[128px] bg-gray-50 flex items-center justify-center text-[32px] font-bold text-gray-300 group-hover:bg-blue-50 group-hover:text-blue-200 transition-colors">
                    {course.image}
                  </div>
                  <div className="p-[20px]">
                    <h3 className="font-bold text-gray-800 mb-[8px] group-hover:text-blue-600 transition-colors">{course.title}</h3>
                    <p className="text-[12px] text-gray-400 mb-[16px]">{course.lessons} Lessons completed</p>
                    <div className="flex items-center gap-[16px]">
                      <div className="flex-1 h-[6px] bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <span className="text-[12px] font-bold text-gray-700">{course.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-[24px]">
            <h2 className="text-[24px] font-bold text-gray-800">Upcoming</h2>
            <div className="bg-white rounded-[24px] border-[1px] border-gray-100 shadow-sm p-[24px] space-y-[24px]">
              {[
                { type: "Assignment", title: "React Performance", date: "Oct 24, 2023", color: "text-rose-500", bg: "bg-rose-50" },
                { type: "Quiz", title: "UI Design Principles", date: "Oct 26, 2023", color: "text-amber-500", bg: "bg-amber-50" },
                { type: "Live Class", title: "Career in Tech", date: "Oct 28, 2023", color: "text-blue-500", bg: "bg-blue-50" },
              ].map((event, i) => (
                <div key={i} className="flex gap-[16px] group cursor-pointer">
                  <div className={`w-[48px] h-[48px] rounded-[14px] ${event.bg} flex flex-col items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm`}>
                    <span className={`text-[12px] font-bold uppercase ${event.color}`}>{event.type.charAt(0)}</span>
                  </div>
                  <div className="flex-1 border-b-[1px] border-gray-50 pb-[16px] last:border-0 group-hover:border-blue-100 transition-colors">
                    <h4 className="text-[14px] font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{event.title}</h4>
                    <p className="text-[12px] text-gray-400 mt-[4px]">{event.date}</p>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 mt-[4px] group-hover:text-blue-400 transition-colors" />
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
