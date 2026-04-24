import React, { useState } from "react";
import { X, UserPlus, Mail, Lock, User } from "lucide-react";
import axiosInstance from "../../apiroutes/axiosInstance";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const role = user.role;

      await axiosInstance.post("/students", 
        { full_name: fullName, username, email, password },
        { headers: { "x-user-role": role } }
      );

      onSuccess();
      onClose();
      setFullName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                <UserPlus size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Add New Student</h2>
                <p className="text-xs text-gray-400">Register a new student account</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 transition-colors">
              <X size={20} />
            </button>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-500 text-xs rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Initial Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
            >
              {loading ? "Registering..." : "Add Student"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddStudentModal;
