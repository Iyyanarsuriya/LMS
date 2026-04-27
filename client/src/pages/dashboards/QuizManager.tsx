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
  const [timeLimit, setTimeLimit] = useState(30);
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
        time_limit: timeLimit,
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
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Quiz Management</h1>
            <p className="text-gray-500 mt-1">Create and schedule assessments for students</p>
          </div>
          {!isAdding && (
            <button 
              onClick={() => setIsAdding(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
            >
              <Plus size={20} />
              Create New Quiz
            </button>
          )}
        </div>

        {isAdding ? (
          <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-800">New Quiz Details</h2>
              <button onClick={() => setIsAdding(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Quiz Title</label>
                  <input 
                    type="text" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., React Hooks Mastery"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Select Course</label>
                  <select 
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="">Select a course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-bold text-gray-700">Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly explain what this quiz covers..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all h-24"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Time Limit (Minutes)</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pl-10"
                    />
                    <Clock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Initial Status</label>
                  <select 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active Immediately</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Schedule Start</label>
                  <div className="relative">
                    <input 
                      type="datetime-local" 
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pl-10"
                      step="1"
                    />
                    <Calendar size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Expiration Date</label>
                  <div className="relative">
                    <input 
                      type="datetime-local" 
                      value={expiresAt}
                      onChange={(e) => setExpiresAt(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all pl-10"
                      step="1"
                    />
                    <X size={18} className="absolute left-3 top-3.5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-gray-800">Questions ({questions.length})</h3>
                  <button 
                    onClick={addQuestion}
                    className="flex items-center gap-2 text-blue-600 font-bold hover:bg-blue-50 px-4 py-2 rounded-xl transition-all"
                  >
                    <PlusCircle size={20} />
                    Add Question
                  </button>
                </div>

                <div className="space-y-6">
                  {questions.map((q, qIndex) => (
                    <div key={qIndex} className="p-6 bg-gray-50/50 rounded-[20px] border border-gray-100 space-y-4 relative group">
                      <button 
                        onClick={() => removeQuestion(qIndex)}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>

                      <div className="flex gap-4">
                        <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">
                          {qIndex + 1}
                        </div>
                        <div className="flex-1 space-y-4">
                          <input 
                            type="text" 
                            placeholder="Question Text"
                            value={q.question_text}
                            onChange={(e) => handleQuestionChange(qIndex, "question_text", e.target.value)}
                            className="w-full px-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-medium"
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Points</label>
                              <input 
                                type="number" 
                                value={q.points}
                                onChange={(e) => handleQuestionChange(qIndex, "points", parseInt(e.target.value))}
                                className="w-full px-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Options</label>
                            {q.options.map((opt, oIndex) => (
                              <div key={oIndex} className="flex items-center gap-3">
                                <input 
                                  type="radio" 
                                  name={`correct-${qIndex}`}
                                  checked={opt.is_correct}
                                  onChange={() => handleOptionChange(qIndex, oIndex, "is_correct", true)}
                                  className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                <input 
                                  type="text" 
                                  placeholder={`Option ${oIndex + 1}`}
                                  value={opt.option_text}
                                  onChange={(e) => handleOptionChange(qIndex, oIndex, "option_text", e.target.value)}
                                  className="flex-1 px-4 py-2 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                />
                              </div>
                            ))}
                            <button 
                              onClick={() => addOption(qIndex)}
                              className="text-sm text-blue-600 font-bold hover:underline ml-8"
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

              <div className="flex justify-end gap-4 pt-8">
                <button 
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={saveQuiz}
                  className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  <Save size={20} />
                  Save Quiz
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {loading ? (
              <div className="text-center py-12 text-gray-400">Loading quizzes...</div>
            ) : quizzes.length === 0 ? (
              <div className="bg-white p-12 rounded-[24px] border border-dashed border-gray-300 text-center">
                <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-bold text-gray-700">No quizzes yet</h3>
                <p className="text-gray-400 mt-2">Create your first quiz to start assessing students.</p>
                <button 
                  onClick={() => setIsAdding(true)}
                  className="mt-6 inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg"
                >
                  <Plus size={20} />
                  Create Quiz
                </button>
              </div>
            ) : (
              quizzes.map((quiz) => (
                <div key={quiz.id} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-center">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                    <BookOpen size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-bold text-gray-800 truncate">{quiz.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                        quiz.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}>
                        {quiz.status}
                      </span>
                    </div>
                    <p className="text-gray-500 line-clamp-1">{quiz.description}</p>
                    <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock size={16} />
                        {quiz.time_limit} mins
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar size={16} />
                        {quiz.scheduled_at ? new Date(quiz.scheduled_at).toLocaleDateString() : 'Immediate'}
                      </div>
                      <div className="font-medium text-blue-600">
                        {quiz.course_title}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
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
