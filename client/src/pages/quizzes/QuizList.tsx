import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BookOpen, Calendar, ChevronRight, Award, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import axiosInstance from "../../apiroutes/axiosInstance";

const QuizList: React.FC = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axiosInstance.get("/quizzes", {
        headers: { 
          "x-user-role": user.role,
          "x-user-id": user.id 
        }
      });
      setQuizzes(response.data);
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="student">
      <div className="space-y-[32px] sm:space-y-[48px] max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[24px]">
          <div>
            <h1 className="text-[32px] sm:text-[44px] font-black text-gray-900 tracking-[-0.03em] leading-tight">Your Quizzes</h1>
            <p className="text-gray-500 mt-[8px] text-[16px] sm:text-[18px] font-medium">Test your knowledge and track your progress</p>
          </div>
          <div className="bg-blue-50/50 p-[20px] sm:p-[24px] rounded-[24px] sm:rounded-[32px] border-[1px] border-blue-100/50 flex items-center gap-[16px] sm:gap-[20px] shadow-sm">
            <div className="w-[48px] h-[48px] sm:w-[56px] sm:h-[56px] bg-blue-600 rounded-[16px] sm:rounded-[20px] flex items-center justify-center text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.3)]">
              <Award size={24} className="sm:w-[28px] sm:h-[28px]" />
            </div>
            <div>
              <p className="text-[10px] sm:text-[11px] font-black text-blue-600 uppercase tracking-[0.05em]">Overall Ability</p>
              <p className="text-[20px] sm:text-[24px] font-black text-gray-900">84%</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] sm:gap-[32px]">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-[32px] rounded-[32px] border-[1px] border-gray-100 shadow-sm animate-pulse h-[300px]"></div>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <div className="bg-white p-[48px] sm:p-[80px] rounded-[32px] sm:rounded-[48px] border-[1px] border-dashed border-gray-200 text-center shadow-sm">
            <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-[24px]">
              <BookOpen size={40} className="text-gray-300 sm:w-[48px] sm:h-[48px]" />
            </div>
            <h3 className="text-[20px] sm:text-[24px] font-black text-gray-900">No active quizzes</h3>
            <p className="text-gray-500 mt-[8px] max-w-[400px] mx-auto text-[15px] sm:text-[16px]">You don't have any pending quizzes at the moment. Check back later for new assessments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] sm:gap-[32px]">
            {quizzes.map((quiz) => (
              <Link 
                key={quiz.id} 
                to={`/student/quiz/${quiz.id}`}
                className="group relative bg-white p-[24px] sm:p-[32px] rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(37,99,235,0.12)] transition-all duration-[400ms] hover:-translate-y-[8px] flex flex-col h-full active:scale-[0.98]"
              >
                <div className="absolute top-[24px] right-[24px] px-[12px] py-[6px] bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-[0.05em] rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-[300ms]">
                  {quiz.course_title}
                </div>
                
                <div className="w-[56px] h-[56px] sm:w-[64px] sm:h-[64px] bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[18px] sm:rounded-[22px] flex items-center justify-center text-white mb-[24px] sm:mb-[32px] shadow-[0_8px_20px_-4px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform duration-[400ms]">
                  <BookOpen size={24} className="sm:w-[28px] sm:h-[28px]" />
                </div>
                
                <h3 className="text-[20px] sm:text-[24px] font-black text-gray-900 leading-tight mb-[12px] group-hover:text-blue-600 transition-colors">
                  {quiz.title}
                </h3>
                
                <p className="text-gray-500 line-clamp-2 mb-[24px] sm:mb-[32px] text-[15px] sm:text-[16px] font-medium flex-grow leading-relaxed">
                  {quiz.description}
                </p>
                
                <div className="space-y-[16px] sm:space-y-[20px]">
                  <div className="flex items-center justify-between text-[13px] sm:text-[14px]">
                    <div className="flex items-center gap-[8px] text-gray-500 font-bold">
                      <Timer size={18} className="text-blue-500" />
                      <span>{quiz.time_limit} Minutes</span>
                    </div>
                    <div className="flex items-center gap-[8px] text-gray-500 font-bold">
                      <Calendar size={18} className="text-rose-500" />
                      <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-[20px] sm:pt-[24px] border-t-[1px] border-gray-50 flex items-center justify-between group-hover:border-blue-50 transition-colors">
                    <span className="text-blue-600 font-black tracking-tight text-[16px] sm:text-[18px]">Start Quiz</span>
                    <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-[300ms] shadow-sm">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default QuizList;
