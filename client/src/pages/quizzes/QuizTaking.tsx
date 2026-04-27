import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, CheckCircle2, ChevronRight, ChevronLeft, AlertCircle } from "lucide-react";
import axiosInstance from "../../apiroutes/axiosInstance";

const QuizTaking: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitting) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quiz && !isSubmitting) {
      handleSubmit();
    }
  }, [timeLeft, quiz, isSubmitting]);

  const fetchQuiz = async () => {
    try {
      const response = await axiosInstance.get(`/quizzes/${id}`, {
        headers: { 
          "x-user-role": user.role,
          "x-user-id": user.id 
        }
      });
      setQuiz(response.data);
      setTimeLeft(response.data.time_limit * 60);
    } catch (err) {
      console.error("Failed to fetch quiz", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: number, optionId: number) => {
    setResponses({ ...responses, [questionId]: optionId });
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post(`/quizzes/${id}/submit`, {
        student_id: user.id,
        responses
      });
      navigate(`/student/quiz/result/${response.data.attemptId}`);
    } catch (err) {
      console.error("Failed to submit quiz", err);
      alert("Failed to submit quiz. Please try again.");
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  if (!quiz) return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <AlertCircle size={48} className="text-rose-500 mb-4" />
      <h1 className="text-2xl font-bold text-gray-800">Quiz not found</h1>
      <button onClick={() => navigate("/student/quizzes")} className="mt-4 text-blue-600 font-bold hover:underline">
        Back to Quizzes
      </button>
    </div>
  );

  const q = quiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b-[1px] border-gray-100 px-[16px] py-[20px] sm:px-[32px] sm:py-[24px] sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between gap-[16px]">
          <div className="flex items-center gap-[12px] sm:gap-[16px]">
            <div className="w-[44px] h-[44px] sm:w-[56px] sm:h-[56px] bg-blue-600 rounded-[14px] sm:rounded-[20px] flex items-center justify-center text-white shadow-[0_8px_20px_-6px_rgba(37,99,235,0.3)] shrink-0">
              <CheckCircle2 size={24} className="sm:w-[28px] sm:h-[28px]" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[18px] sm:text-[24px] font-black text-gray-900 leading-tight truncate">{quiz.title}</h1>
              <p className="text-gray-400 text-[10px] sm:text-[12px] mt-[2px] font-black uppercase tracking-[0.05em]">{quiz.course_title}</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-[8px] sm:gap-[12px] px-[16px] py-[10px] sm:px-[24px] sm:py-[14px] rounded-[16px] sm:rounded-[20px] font-black text-[18px] sm:text-[24px] tabular-nums shadow-sm border-[1px] ${
            timeLeft < 60 ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 'bg-blue-50 text-blue-600 border-blue-100'
          }`}>
            <Clock size={20} className="sm:w-[24px] sm:h-[24px]" />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-[6px] bg-gray-100">
        <div 
          className="h-full bg-blue-600 transition-all duration-[500ms] ease-out shadow-[0_0_12px_rgba(37,99,235,0.4)]" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-[16px] sm:p-[40px] lg:p-[80px]">
        <div className="max-w-[800px] mx-auto space-y-[24px] sm:space-y-[40px] animate-in fade-in slide-in-from-bottom-[32px] duration-[500ms]">
          <div className="bg-white p-[24px] sm:p-[48px] lg:p-[64px] rounded-[32px] sm:rounded-[48px] shadow-[0_20px_50px_-12px_rgba(37,99,235,0.08)] border-[1px] border-gray-50/50">
            <div className="flex items-center justify-between mb-[32px] sm:mb-[48px]">
              <span className="px-[12px] py-[6px] sm:px-[16px] sm:py-[8px] bg-gray-100 text-gray-500 rounded-full text-[10px] sm:text-[12px] font-black uppercase tracking-[0.05em]">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-blue-600 font-black text-[14px] sm:text-[16px]">{q.points} Points</span>
            </div>

            <h2 className="text-[22px] sm:text-[32px] lg:text-[40px] font-black text-gray-900 leading-[1.2] mb-[32px] sm:mb-[64px]">
              {q.question_text}
            </h2>

            <div className="space-y-[12px] sm:space-y-[16px]">
              {q.options.map((opt: any) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(q.id, opt.id)}
                  className={`w-full text-left p-[20px] sm:p-[28px] rounded-[24px] sm:rounded-[32px] border-[2px] transition-all duration-[300ms] flex items-center justify-between group active:scale-[0.98] ${
                    responses[q.id] === opt.id
                      ? 'bg-blue-600 border-blue-600 text-white shadow-[0_12px_24px_-4px_rgba(37,99,235,0.25)]'
                      : 'bg-white border-gray-100 text-gray-700 hover:border-blue-200 hover:bg-blue-50/30'
                  }`}
                >
                  <span className="text-[16px] sm:text-[20px] font-bold pr-[16px]">{opt.option_text}</span>
                  <div className={`w-[24px] h-[24px] sm:w-[32px] sm:h-[32px] rounded-full border-[2px] flex items-center justify-center transition-all shrink-0 ${
                    responses[q.id] === opt.id
                      ? 'bg-white border-white text-blue-600'
                      : 'border-gray-200 text-transparent group-hover:border-blue-300'
                  }`}>
                    <CheckCircle2 size={16} className="sm:w-[20px] sm:h-[20px]" fill="currentColor" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between gap-[16px] pt-[16px]">
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-[8px] px-[20px] py-[14px] sm:px-[32px] sm:py-[20px] rounded-[20px] sm:rounded-[24px] font-black text-[14px] sm:text-[18px] transition-all active:scale-95 ${
                currentQuestion === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-white hover:text-gray-900 hover:shadow-sm'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-emerald-600 text-white px-[24px] py-[14px] sm:px-[48px] sm:py-[20px] rounded-[20px] sm:rounded-[24px] font-black text-[14px] sm:text-[18px] hover:bg-emerald-700 transition-all shadow-[0_12px_24px_-4px_rgba(16,185,129,0.25)] flex items-center gap-[12px] disabled:opacity-50 active:scale-95"
              >
                {isSubmitting ? 'Submitting...' : 'Finish Quiz'}
                <CheckCircle2 size={20} />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="bg-blue-600 text-white px-[24px] py-[14px] sm:px-[48px] sm:py-[20px] rounded-[20px] sm:rounded-[24px] font-black text-[14px] sm:text-[18px] hover:bg-blue-700 transition-all shadow-[0_12px_24px_-4px_rgba(37,99,235,0.25)] flex items-center gap-[12px] active:scale-95"
              >
                Next Question
                <ChevronRight size={20} />
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizTaking;
