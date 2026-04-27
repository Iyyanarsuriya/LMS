import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Award, BookOpen, RefreshCcw } from "lucide-react";
import axiosInstance from "../../apiroutes/axiosInstance";

const QuizResult: React.FC = () => {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchResult();
  }, [attemptId]);

  const fetchResult = async () => {
    try {
      // In a real app, you'd have a specific endpoint for attempt details
      // For now, let's fetch all results for this student and filter
      const response = await axiosInstance.get(`/quizzes/results/${user.id}`);
      const currentResult = response.data.find((r: any) => r.id === parseInt(attemptId!));
      setResult(currentResult);
    } catch (err) {
      console.error("Failed to fetch result", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!result) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Award size={48} className="text-gray-300 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800">Result not found</h1>
      <button onClick={() => navigate("/student/quizzes")} className="mt-4 text-blue-600 font-bold hover:underline">
        Back to Quizzes
      </button>
    </div>
  );

  const scorePercentage = 85; // Mocking this for the visual, usually calculate from score/total_points

  return (
    <DashboardLayout role="student">
      <div className="max-w-[1000px] mx-auto space-y-[32px] sm:space-y-[64px] animate-in zoom-in-95 duration-[600ms]">
        {/* Hero Result Section */}
        <div className="bg-white p-[32px] sm:p-[64px] lg:p-[80px] rounded-[40px] sm:rounded-[64px] shadow-[0_20px_60px_-12px_rgba(37,99,235,0.1)] border-[1px] border-gray-50 text-center relative overflow-hidden">
          {/* Background Decorative Circles */}
          <div className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-blue-50/50 rounded-full blur-[80px] opacity-60"></div>
          <div className="absolute -bottom-[100px] -right-[100px] w-[300px] h-[300px] bg-indigo-50/50 rounded-full blur-[80px] opacity-60"></div>
          
          <div className="relative z-10">
            <div className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px] bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[28px] sm:rounded-[36px] flex items-center justify-center text-white mx-auto mb-[32px] shadow-[0_12px_32px_-8px_rgba(245,158,11,0.4)] animate-bounce">
              <Award size={48} className="sm:w-[56px] sm:h-[56px]" />
            </div>
            
            <h1 className="text-[32px] sm:text-[48px] lg:text-[60px] font-black text-gray-900 mb-[12px] leading-tight tracking-[-0.03em]">Congratulations!</h1>
            <p className="text-[16px] sm:text-[20px] text-gray-500 font-medium max-w-[440px] mx-auto leading-relaxed">
              You've completed the <span className="text-blue-600 font-black">{result.quiz_title}</span> quiz.
            </p>

            <div className="mt-[48px] mb-[48px] sm:mt-[64px] sm:mb-[64px] flex flex-col items-center">
              <div className="relative w-[180px] h-[180px] sm:w-[240px] sm:h-[240px] flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90 drop-shadow-sm">
                  <circle
                    cx="120"
                    cy="120"
                    r="110"
                    stroke="currentColor"
                    strokeWidth="20"
                    fill="transparent"
                    className="text-gray-100"
                  />
                  <circle
                    cx="120"
                    cy="120"
                    r="110"
                    stroke="currentColor"
                    strokeWidth="20"
                    fill="transparent"
                    strokeDasharray={691.15}
                    strokeDashoffset={691.15 * (1 - scorePercentage / 100)}
                    strokeLinecap="round"
                    className="text-blue-600 transition-all duration-[1500ms] ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-[44px] sm:text-[64px] font-black text-gray-900 leading-none">{result.score}</span>
                  <span className="text-gray-400 font-black uppercase tracking-[0.1em] text-[10px] sm:text-[12px] mt-[8px]">Points</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-[16px] sm:gap-[24px] max-w-[600px] mx-auto text-left">
              <div className="bg-gray-50/80 p-[20px] sm:p-[28px] rounded-[24px] sm:rounded-[32px] border-[1px] border-gray-100/50 backdrop-blur-sm">
                <p className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] mb-[4px]">Duration</p>
                <p className="text-[18px] sm:text-[22px] font-black text-gray-900">12:45</p>
              </div>
              <div className="bg-gray-50/80 p-[20px] sm:p-[28px] rounded-[24px] sm:rounded-[32px] border-[1px] border-gray-100/50 backdrop-blur-sm">
                <p className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] mb-[4px]">Rank</p>
                <p className="text-[18px] sm:text-[22px] font-black text-gray-900">#4 / 128</p>
              </div>
              <div className="bg-gray-50/80 p-[20px] sm:p-[28px] rounded-[24px] sm:rounded-[32px] border-[1px] border-gray-100/50 backdrop-blur-sm col-span-2 md:col-span-1 text-center md:text-left">
                <p className="text-[10px] sm:text-[11px] font-black text-gray-400 uppercase tracking-[0.1em] mb-[4px]">Ability</p>
                <p className="text-[18px] sm:text-[22px] font-black text-emerald-600">+4.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px] justify-center">
          <button 
            onClick={() => navigate("/student/quizzes")}
            className="flex items-center justify-center gap-[12px] bg-white text-gray-900 px-[32px] py-[18px] sm:px-[48px] sm:py-[22px] rounded-[20px] sm:rounded-[28px] font-black text-[16px] sm:text-[18px] hover:bg-gray-50 transition-all shadow-lg border-[1px] border-gray-100 active:scale-95"
          >
            <BookOpen size={20} />
            My Quizzes
          </button>
          <button 
            onClick={() => navigate(`/student/quiz/${result.quiz_id}`)}
            className="flex items-center justify-center gap-[12px] bg-blue-600 text-white px-[32px] py-[18px] sm:px-[48px] sm:py-[22px] rounded-[20px] sm:rounded-[28px] font-black text-[16px] sm:text-[18px] hover:bg-blue-700 transition-all shadow-[0_12px_24px_-4px_rgba(37,99,235,0.25)] active:scale-95"
          >
            <RefreshCcw size={20} />
            Retake Quiz
          </button>
        </div>

        {/* Performance Insights */}
        <div className="bg-white p-[32px] sm:p-[48px] rounded-[40px] sm:rounded-[48px] border-[1px] border-gray-100 shadow-sm">
          <h2 className="text-[22px] sm:text-[28px] font-black text-gray-900 mb-[32px] sm:mb-[40px]">Ability Analysis</h2>
          <div className="space-y-[24px] sm:space-y-[32px]">
            <div className="flex items-center gap-[20px] sm:gap-[32px]">
              <div className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] bg-emerald-50 text-emerald-600 rounded-[16px] sm:rounded-[20px] flex items-center justify-center shrink-0 font-black text-[18px] sm:text-[22px]">
                A
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-[8px] sm:mb-[12px]">
                  <span className="font-bold text-gray-800 text-[14px] sm:text-[16px]">Concept Mastery</span>
                  <span className="text-emerald-600 font-black text-[14px] sm:text-[16px]">Excellent</span>
                </div>
                <div className="w-full h-[10px] sm:h-[12px] bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-[20px] sm:gap-[32px]">
              <div className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px] bg-blue-50 text-blue-600 rounded-[16px] sm:rounded-[20px] flex items-center justify-center shrink-0 font-black text-[18px] sm:text-[22px]">
                B
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-[8px] sm:mb-[12px]">
                  <span className="font-bold text-gray-800 text-[14px] sm:text-[16px]">Speed & Accuracy</span>
                  <span className="text-blue-600 font-black text-[14px] sm:text-[16px]">Very Good</span>
                </div>
                <div className="w-full h-[10px] sm:h-[12px] bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default QuizResult;
