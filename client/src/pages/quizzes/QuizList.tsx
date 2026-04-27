import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { BookOpen, Clock, Calendar, ChevronRight, Award, Timer } from "lucide-react";
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
      <div className="space-y-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">Your Quizzes</h1>
            <p className="text-gray-500 mt-2 text-lg">Test your knowledge and track your progress</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <Award size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Overall Ability</p>
              <p className="text-xl font-black text-gray-900">84%</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm animate-pulse h-64"></div>
            ))}
          </div>
        ) : quizzes.length === 0 ? (
          <div className="bg-white p-16 rounded-[40px] border border-dashed border-gray-200 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen size={40} className="text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">No active quizzes</h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto text-lg">You don't have any pending quizzes at the moment. Check back later for new assessments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizzes.map((quiz) => (
              <Link 
                key={quiz.id} 
                to={`/student/quiz/${quiz.id}`}
                className="group relative bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              >
                <div className="absolute top-6 right-6 px-4 py-1.5 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {quiz.course_title}
                </div>
                
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[24px] flex items-center justify-center text-white mb-8 shadow-xl shadow-blue-100 group-hover:scale-110 transition-transform duration-500">
                  <BookOpen size={28} />
                </div>
                
                <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                  {quiz.title}
                </h3>
                
                <p className="text-gray-500 line-clamp-2 mb-8 text-lg flex-grow">
                  {quiz.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-400 font-medium">
                      <Timer size={18} className="text-blue-400" />
                      <span>{quiz.time_limit} Minutes</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 font-medium">
                      <Calendar size={18} className="text-rose-400" />
                      <span>{new Date(quiz.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-50 flex items-center justify-between group-hover:border-blue-50 transition-colors">
                    <span className="text-blue-600 font-black tracking-tight text-lg">Start Quiz</span>
                    <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
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
