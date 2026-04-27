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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 p-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 leading-none">{quiz.title}</h1>
              <p className="text-gray-400 text-sm mt-1 font-bold uppercase tracking-wider">{quiz.course_title}</p>
            </div>
          </div>
          
          <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xl tabular-nums shadow-sm border ${
            timeLeft < 60 ? 'bg-rose-50 text-rose-600 border-rose-100 animate-pulse' : 'bg-blue-50 text-blue-600 border-blue-100'
          }`}>
            <Clock size={20} />
            {formatTime(timeLeft)}
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-gray-100">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-out" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12">
        <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl shadow-blue-100/50 border border-gray-50">
            <div className="flex items-center justify-between mb-8">
              <span className="px-4 py-1.5 bg-gray-100 text-gray-500 rounded-full text-xs font-black uppercase tracking-widest">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-blue-600 font-bold">{q.points} Points</span>
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-12">
              {q.question_text}
            </h2>

            <div className="space-y-4">
              {q.options.map((opt: any) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(q.id, opt.id)}
                  className={`w-full text-left p-6 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between group ${
                    responses[q.id] === opt.id
                      ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200'
                      : 'bg-white border-gray-100 text-gray-700 hover:border-blue-200 hover:bg-blue-50/30'
                  }`}
                >
                  <span className="text-lg font-bold">{opt.option_text}</span>
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    responses[q.id] === opt.id
                      ? 'bg-white border-white text-blue-600'
                      : 'border-gray-200 text-transparent group-hover:border-blue-300'
                  }`}>
                    <CheckCircle2 size={16} fill="currentColor" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all ${
                currentQuestion === 0 
                  ? 'text-gray-300 cursor-not-allowed' 
                  : 'text-gray-500 hover:bg-white hover:text-gray-900'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-emerald-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center gap-3 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Finish Quiz'}
                <CheckCircle2 size={20} />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center gap-3"
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
