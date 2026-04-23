import React, { useState } from "react";
import { X, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { forgotPassword } from "../../apiroutes/authApi";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onBackToLogin }) => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="p-8 sm:p-10 relative">
          <button 
            onClick={onBackToLogin} 
            className="absolute top-8 left-8 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          
          <button 
            onClick={onClose} 
            className="absolute top-8 right-8 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <X size={20} />
          </button>

          {!isSubmitted ? (
            <div className="mt-4">
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-[24px] flex items-center justify-center shadow-lg shadow-blue-50 mb-6">
                  <Mail size={32} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Forgot Password?</h2>
                <p className="text-sm text-gray-400 mt-2 px-4">
                  Enter your email and we'll send you a link to reset your password.
                </p>
              </div>

              {error && (
                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-500 text-xs rounded-xl text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-400" size={18} strokeWidth={2.5} />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-14 pr-5 py-4 bg-gray-50 border border-transparent rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-200 active:scale-[0.98] transition-all disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center py-10">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
                <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Check your email</h2>
              <p className="text-sm text-gray-400 mb-8 px-4">
                We have sent a password reset link to <br/>
                <span className="text-gray-700 font-bold">{email}</span>
              </p>
              <button 
                onClick={onBackToLogin}
                className="px-8 py-3 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-all active:scale-95"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {!isSubmitted && (
            <div className="mt-8 pt-8 border-t border-gray-50 text-center">
              <button 
                onClick={onBackToLogin}
                className="text-[13px] text-blue-600 font-bold hover:underline"
              >
                Remember your password? Sign in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
