import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Award, CheckCircle2, XCircle, ChevronRight, BookOpen, RefreshCcw } from "lucide-react";
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
      <div className="max-w-4xl mx-auto space-y-12 animate-in zoom-in-95 duration-500">
        {/* Hero Result Section */}
        <div className="bg-white p-12 md:p-16 rounded-[48px] shadow-2xl shadow-blue-100/50 border border-gray-50 text-center relative overflow-hidden">
          {/* Background Decorative Circles */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50"></div>
          
          <div className="relative z-10">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[32px] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-orange-100 animate-bounce">
              <Award size={48} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Congratulations!</h1>
            <p className="text-xl text-gray-500 font-medium max-w-md mx-auto">
              You've completed the <span className="text-blue-600 font-bold">{result.quiz_title}</span> quiz.
            </p>

            <div className="mt-12 mb-12 flex flex-col items-center">
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="transparent"
                    className="text-gray-100"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="transparent"
                    strokeDasharray={552.92}
                    strokeDashoffset={552.92 * (1 - scorePercentage / 100)}
                    strokeLinecap="round"
                    className="text-blue-600 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-5xl font-black text-gray-900 leading-none">{result.score}</span>
                  <span className="text-gray-400 font-bold uppercase tracking-widest text-xs mt-2">Points</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mx-auto text-left">
              <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Duration</p>
                <p className="text-xl font-black text-gray-900">12:45</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Rank</p>
                <p className="text-xl font-black text-gray-900">#4 / 128</p>
              </div>
              <div className="bg-gray-50 p-6 rounded-[32px] border border-gray-100 col-span-2 md:col-span-1">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Ability</p>
                <p className="text-xl font-black text-emerald-600">+4.2%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={() => navigate("/student/quizzes")}
            className="flex items-center justify-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-[24px] font-black hover:bg-gray-50 transition-all shadow-lg border border-gray-100"
          >
            <BookOpen size={20} />
            My Quizzes
          </button>
          <button 
            onClick={() => navigate(`/student/quiz/${result.quiz_id}`)}
            className="flex items-center justify-center gap-3 bg-blue-600 text-white px-10 py-5 rounded-[24px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
          >
            <RefreshCcw size={20} />
            Retake Quiz
          </button>
        </div>

        {/* Performance Insights */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-black text-gray-900 mb-8">Ability Analysis</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 font-black">
                A
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-800">Concept Mastery</span>
                  <span className="text-emerald-600 font-bold">Excellent</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 font-black">
                B
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-gray-800">Speed & Accuracy</span>
                  <span className="text-blue-600 font-bold">Very Good</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '78%' }}></div>
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
