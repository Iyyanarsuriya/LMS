import React, { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Plus, Trash2, Calendar, Clock, BookOpen, Save, X, PlusCircle } from "lucide-react";
import axiosInstance from "../../apiroutes/axiosInstance";

interface Option {
  option_text: string;
  is_correct: boolean;
}

interface Question {
  question_text: string;
  question_type: string;
  points: number;
  options: Option[];
}

const QuizManager: React.FC = () => {
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Quiz State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [courseId, setCourseId] = useState("");
  const [timeLimit, setTimeLimit] = useState<number | "">(30);
  const [scheduledAt, setScheduledAt] = useState("");
  const [expiresAt, setExpiresAt] = useState("");
  const [status, setStatus] = useState("draft");
  const [questions, setQuestions] = useState<Question[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchQuizzes();
    fetchCourses();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const response = await axiosInstance.get("/quizzes", {
        headers: { "x-user-role": user.role, "x-user-id": user.id }
      });
      setQuizzes(response.data);
    } catch (err) {
      console.error("Failed to fetch quizzes", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCourses = async () => {
    // Assuming there's a courses endpoint or we can get them from somewhere
    // For now, let's mock some if it fails
    try {
      // const response = await axiosInstance.get("/courses");
      // setCourses(response.data);
      setCourses([
        { id: 1, title: "Advanced React Patterns" },
        { id: 2, title: "UI/UX Design Fundamentals" },
        { id: 3, title: "Python for Data Science" }
      ]);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  const addQuestion = () => {
    setQuestions([...questions, {
      question_text: "",
      question_type: "multiple_choice",
      points: 1,
      options: [
        { option_text: "", is_correct: false },
        { option_text: "", is_correct: false }
      ]
    }]);
  };

  const removeQuestion = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    const newQuestions = [...questions];
    (newQuestions[index] as any)[field] = value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push({ option_text: "", is_correct: false });
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, field: string, value: any) => {
    const newQuestions = [...questions];
    const question = newQuestions[qIndex];
    if (field === "is_correct") {
      // Ensure only one option is correct for multiple choice
      question.options = question.options.map((opt, i) => ({
        ...opt,
        is_correct: i === oIndex ? value : false
      }));
    } else {
      (question.options[oIndex] as any)[field] = value;
    }
    setQuestions(newQuestions);
  };

  const saveQuiz = async () => {
    if (!title || !courseId) {
      alert("Title and Course are required.");
      return;
    }

    try {
      const payload = {
        title,
        description,
        course_id: parseInt(courseId),
        time_limit: timeLimit === "" ? 0 : timeLimit,
        scheduled_at: scheduledAt ? scheduledAt.replace("T", " ") + ":00" : null,
        expires_at: expiresAt ? expiresAt.replace("T", " ") + ":00" : null,
        status,
        questions
      };

      await axiosInstance.post("/quizzes", payload, {
        headers: { "x-user-role": user.role, "x-user-id": user.id }
      });

      setIsAdding(false);
      resetForm();
      fetchQuizzes();
    } catch (err) {
      console.error("Failed to save quiz", err);
      alert("Failed to save quiz. Please try again.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCourseId("");
    setTimeLimit(30);
    setScheduledAt("");
    setExpiresAt("");
    setStatus("draft");
    setQuestions([]);
  };

  return (
    <DashboardLayout role="admin">
      <div className="space-y-[32px] sm:space-y-[48px]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-[24px]">
          <div>
            <h1 className="text-[32px] sm:text-[40px] font-black text-gray-900 tracking-[-0.03em] leading-tight">Quiz Management</h1>
            <p className="text-gray-500 mt-[8px] text-[16px] sm:text-[18px] font-medium">Create and schedule assessments for students</p>
          </div>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center justify-center gap-[12px] bg-blue-600 text-white px-[24px] py-[14px] sm:px-[32px] sm:py-[18px] rounded-[18px] sm:rounded-[22px] font-black text-[15px] sm:text-[17px] hover:bg-blue-700 transition-all shadow-[0_8px_20px_-6px_rgba(37,99,235,0.3)] active:scale-95"
            >
              <Plus size={20} className="sm:w-[24px] sm:h-[24px]" />
              Create New Quiz
            </button>
          )}
        </div>

        {isAdding ? (
          <div className="bg-white rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-[0_20px_50px_-12px_rgba(37,99,235,0.06)] overflow-hidden animate-in fade-in slide-in-from-bottom-[20px] duration-[400ms]">
            <div className="p-[20px] sm:p-[24px] border-b-[1px] border-gray-50 flex justify-between items-center bg-gray-50/30">
              <h2 className="text-[18px] sm:text-[22px] font-black text-gray-900 tracking-tight">New Quiz Details</h2>
              <button onClick={() => setIsAdding(false)} className="p-[10px] text-gray-400 hover:bg-gray-100 rounded-full transition-colors active:scale-90">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-[24px] sm:p-[40px] lg:p-[56px] space-y-[32px] sm:space-y-[48px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] sm:gap-[32px]">
                <div className="space-y-[10px] sm:space-y-[12px]">
                  <label className="text-[12px] sm:text-[13px] font-black text-gray-400 uppercase tracking-[0.1em] ml-[4px]">Quiz Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., React Hooks Mastery"
                    className="w-full px-[16px] py-[12px] sm:px-[20px] sm:py-[16px] rounded-[14px] sm:rounded-[18px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all text-[15px] sm:text-[16px] font-medium placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-[10px] sm:space-y-[12px]">
                  <label className="text-[12px] sm:text-[13px] font-black text-gray-400 uppercase tracking-[0.1em] ml-[4px]">Select Course</label>
                  <select 
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full px-[16px] py-[12px] sm:px-[20px] sm:py-[16px] rounded-[14px] sm:rounded-[18px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all text-[15px] sm:text-[16px] font-bold text-gray-700 bg-white"
                  >
                    <option value="">Select a course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-[10px] sm:space-y-[12px]">
                  <label className="text-[12px] sm:text-[13px] font-black text-gray-400 uppercase tracking-[0.1em] ml-[4px]">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly explain what this quiz covers..."
                    className="w-full px-[16px] py-[12px] sm:px-[20px] sm:py-[16px] rounded-[14px] sm:rounded-[18px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all text-[15px] sm:text-[16px] font-medium h-[120px] resize-none placeholder:text-gray-300"
                  />
                </div>
                <div className="space-y-[10px] sm:space-y-[12px]">
                  <label className="text-[12px] sm:text-[13px] font-black text-gray-400 uppercase tracking-[0.1em] ml-[4px]">Time Limit (Minutes)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={timeLimit}
                      onChange={(e) => {
                        const val = e.target.value;
                        setTimeLimit(val === "" ? "" : parseInt(val));
                      }}
                      onFocus={(e) => e.target.select()}
                      className="w-full pl-[44px] pr-[16px] py-[12px] sm:pl-[52px] sm:pr-[20px] sm:py-[16px] rounded-[14px] sm:rounded-[18px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all text-[15px] sm:text-[16px] font-bold"
                    />
                    <Clock size={18} className="absolute left-[16px] top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-[10px] sm:space-y-[12px]">
                  <label className="text-[12px] sm:text-[13px] font-black text-gray-400 uppercase tracking-[0.1em] ml-[4px]">Initial Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-[16px] py-[12px] sm:px-[20px] sm:py-[16px] rounded-[14px] sm:rounded-[18px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all text-[15px] sm:text-[16px] font-bold text-gray-700 bg-white"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active Immediately</option>
                  </select>
                </div>
                <div className="space-y-[10px] sm:space-y-[12px]">
                  <label className="text-[12px] sm:text-[13px] font-black text-gray-400 uppercase tracking-[0.1em] ml-[4px]">Schedule Start</label>
                  <div className="relative">
                    <input 
                      type="datetime-local" 
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="w-full pl-[44px] pr-[16px] py-[12px] sm:pl-[52px] sm:pr-[20px] sm:py-[16px] rounded-[14px] sm:rounded-[18px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all text-[15px] sm:text-[16px] font-bold text-gray-600"
                      step="1"
                    />
                    <Calendar size={18} className="absolute left-[16px] top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-[10px] sm:space-y-[12px]">
                  <label className="text-[12px] sm:text-[13px] font-black text-gray-400 uppercase tracking-[0.1em] ml-[4px]">Expiration Date</label>
                  <div className="relative">
                    <input 
                      type="datetime-local" 
                      value={expiresAt}
                      onChange={(e) => setExpiresAt(e.target.value)}
                      className="w-full pl-[44px] pr-[16px] py-[12px] sm:pl-[52px] sm:pr-[20px] sm:py-[16px] rounded-[14px] sm:rounded-[18px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all text-[15px] sm:text-[16px] font-bold text-gray-600"
                      step="1"
                    />
                    <X size={18} className="absolute left-[16px] top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="pt-[32px] sm:pt-[48px] border-t-[1px] border-gray-50">
                <div className="flex items-center justify-between mb-[24px] sm:mb-[32px]">
                  <h3 className="text-[18px] sm:text-[22px] font-black text-gray-900 tracking-tight">Questions ({questions.length})</h3>
                  <button 
                    onClick={addQuestion}
                    className="flex items-center gap-[10px] text-blue-600 font-black text-[14px] sm:text-[15px] hover:bg-blue-50 px-[16px] py-[10px] sm:px-[20px] sm:py-[12px] rounded-[14px] transition-all active:scale-95 shadow-sm border-[1px] border-blue-100/50"
                  >
                    <PlusCircle size={20} />
                    Add Question
                  </button>
                </div>

                <div className="space-y-[20px] sm:space-y-[32px]">
                  {questions.map((q, qIndex) => (
                    <div key={qIndex} className="p-[20px] sm:p-[32px] bg-gray-50/50 rounded-[24px] sm:rounded-[32px] border-[1px] border-gray-100/60 space-y-[20px] relative group transition-all hover:bg-white hover:shadow-lg hover:shadow-gray-200/40">
                      <button 
                        onClick={() => removeQuestion(qIndex)}
                        className="absolute top-[20px] right-[20px] p-[10px] text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-[12px] opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all active:scale-90"
                      >
                        <Trash2 size={20} />
                      </button>

                      <div className="flex flex-col sm:flex-row gap-[16px] sm:gap-[24px]">
                        <div className="w-[36px] h-[36px] sm:w-[44px] sm:h-[44px] bg-blue-600 text-white rounded-[12px] sm:rounded-[14px] flex items-center justify-center font-black text-[14px] sm:text-[16px] shrink-0 shadow-[0_4px_12px_-2px_rgba(37,99,235,0.3)]">
                          {qIndex + 1}
                        </div>
                        <div className="flex-1 space-y-[20px] sm:space-y-[24px]">
                          <div className="space-y-[8px]">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.05em] ml-[2px]">Question Text</label>
                            <input 
                              type="text" 
                              placeholder="Type your question here..."
                              value={q.question_text}
                              onChange={(e) => handleQuestionChange(qIndex, "question_text", e.target.value)}
                              className="w-full px-[16px] py-[12px] bg-white rounded-[14px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-gray-800 text-[15px] sm:text-[17px] placeholder:font-medium placeholder:text-gray-300"
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] sm:gap-[24px]">
                            <div className="space-y-[8px]">
                              <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.05em] ml-[2px]">Points</label>
                              <input 
                                type="number" 
                                value={q.points}
                                onChange={(e) => handleQuestionChange(qIndex, "points", parseInt(e.target.value))}
                                className="w-full px-[16px] py-[12px] bg-white rounded-[14px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-gray-700"
                              />
                            </div>
                          </div>

                          <div className="space-y-[16px]">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.05em] ml-[2px]">Answer Options</label>
                            <div className="space-y-[12px] sm:space-y-[16px]">
                              {q.options.map((opt, oIndex) => (
                                <div key={oIndex} className="flex items-center gap-[12px] sm:gap-[16px]">
                                  <div className="relative flex items-center justify-center group/radio">
                                    <input 
                                      type="radio" 
                                      name={`correct-${qIndex}`}
                                      checked={opt.is_correct}
                                      onChange={() => handleOptionChange(qIndex, oIndex, "is_correct", true)}
                                      className="w-[22px] h-[22px] text-blue-600 focus:ring-blue-500 cursor-pointer border-gray-200"
                                    />
                                  </div>
                                  <input 
                                    type="text" 
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={opt.option_text}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, "option_text", e.target.value)}
                                    className="flex-1 px-[16px] py-[10px] sm:px-[20px] sm:py-[12px] bg-white rounded-[12px] sm:rounded-[16px] border-[1.5px] border-gray-100 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 transition-all font-bold text-gray-700 text-[14px] sm:text-[15px]"
                                  />
                                </div>
                              ))}
                            </div>
                            <button 
                              onClick={() => addOption(qIndex)}
                              className="text-[13px] sm:text-[14px] text-blue-600 font-black hover:bg-blue-50 px-[12px] py-[8px] rounded-[10px] transition-all ml-[38px] sm:ml-[60px]"
                            >
                              + Add Option
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-[12px] sm:gap-[16px] pt-[32px] sm:pt-[48px] border-t-[1px] border-gray-50">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-[24px] py-[14px] sm:px-[32px] sm:py-[16px] rounded-[16px] sm:rounded-[20px] font-black text-gray-500 hover:bg-gray-100 transition-all active:scale-95 text-[15px]"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveQuiz}
                  className="flex items-center justify-center gap-[10px] bg-blue-600 text-white px-[32px] py-[14px] sm:px-[48px] sm:py-[16px] rounded-[16px] sm:rounded-[20px] font-black hover:bg-blue-700 transition-all shadow-[0_12px_24px_-4px_rgba(37,99,235,0.3)] active:scale-95 text-[15px]"
                >
                  <Save size={20} />
                  Save Quiz
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-[20px] sm:gap-[24px]">
            {loading ? (
              <div className="text-center py-[48px] text-gray-400 font-bold">Loading quizzes...</div>
            ) : quizzes.length === 0 ? (
              <div className="bg-white p-[64px] sm:p-[100px] rounded-[40px] border-[2px] border-dashed border-gray-200 text-center shadow-sm">
                <div className="w-[80px] h-[80px] bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-[24px]">
                  <BookOpen size={48} className="text-gray-300" />
                </div>
                <h3 className="text-[22px] sm:text-[24px] font-black text-gray-900 leading-tight">No quizzes yet</h3>
                <p className="text-gray-500 mt-[8px] max-w-[320px] mx-auto text-[16px] font-medium">Create your first quiz to start assessing students.</p>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="mt-[32px] inline-flex items-center gap-[12px] bg-blue-600 text-white px-[32px] py-[16px] rounded-[20px] font-black hover:bg-blue-700 transition-all shadow-lg active:scale-95"
                >
                  <Plus size={20} />
                  Create Quiz
                </button>
              </div>
            ) : (
              quizzes.map((quiz) => (
                <div key={quiz.id} className="group bg-white p-[20px] sm:p-[32px] rounded-[32px] sm:rounded-[40px] border-[1px] border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-[400ms] flex flex-col md:flex-row gap-[20px] sm:gap-[32px] items-center">
                  <div className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] bg-blue-50/50 text-blue-600 rounded-[22px] sm:rounded-[28px] flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 duration-500">
                    <BookOpen size={32} className="sm:w-[40px] sm:h-[40px]" />
                  </div>
                  <div className="flex-1 min-w-0 w-full text-center md:text-left">
                    <div className="flex flex-col sm:flex-row items-center gap-[8px] sm:gap-[12px] mb-[8px] sm:mb-[12px]">
                      <h3 className="text-[20px] sm:text-[24px] font-black text-gray-900 truncate leading-tight">{quiz.title}</h3>
                      <span className={`px-[10px] py-[4px] rounded-full text-[10px] font-black uppercase tracking-[0.05em] shadow-sm ${
                        quiz.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {quiz.status}
                      </span>
                    </div>
                    <p className="text-gray-500 line-clamp-1 text-[15px] sm:text-[16px] font-medium mb-[16px] sm:mb-[20px]">{quiz.description}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-[16px] sm:gap-[24px] text-[13px] sm:text-[14px] text-gray-500 font-bold">
                      <div className="flex items-center gap-[8px]">
                        <Clock size={18} className="text-blue-500" />
                        {quiz.time_limit} mins
                      </div>
                      <div className="flex items-center gap-[8px]">
                        <Calendar size={18} className="text-rose-500" />
                        {quiz.scheduled_at ? new Date(quiz.scheduled_at).toLocaleDateString() : 'Immediate'}
                      </div>
                      <div className="px-[12px] py-[4px] bg-gray-50 rounded-full text-blue-600 border-[1px] border-gray-100">
                        {quiz.course_title}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-[12px]">
                    <button className="p-[14px] text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-[18px] transition-all active:scale-90 border-[1.5px] border-transparent hover:border-blue-100">
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const MoreVertical = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
  </svg>
);

export default QuizManager;
