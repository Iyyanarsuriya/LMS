import React, { useState } from "react";
import { X, User, Lock, ShieldCheck } from "lucide-react";
import { login } from "../../apiroutes/authApi";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onForgotClick: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onForgotClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login({ email: username, password });
      const { data } = response;
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        const role = data.user.role;
        if (role === "superadmin") {
          window.location.href = "/super-admin";
        } else if (role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/student";
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 sm:p-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
                <ShieldCheck className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Sign In</h2>
                <p className="text-xs text-gray-400">Access your LMS account</p>
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

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400" size={18} strokeWidth={2.5} />
              <input
                type="text"
                placeholder="Username or Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400" size={18} strokeWidth={2.5} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
              />
            </div>

            <div className="flex justify-end px-1">
              <button 
                type="button"
                onClick={onForgotClick} 
                className="text-blue-600 text-xs font-bold hover:underline outline-none"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-50 mt-2"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50 text-center">
            <p className="text-[13px] text-gray-400">
              Only administrators can register new accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
