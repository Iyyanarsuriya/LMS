import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { forgotPassword } from "../apiroutes/authApi";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Reset request failed:", error);
      const errorMessage = error.response?.data?.message || "Failed to send reset link. Please try again.";
      alert(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#8AC4FA] p-4 sm:p-8 w-full box-border">
      {/* Container Card */}
      <div className="bg-white shadow-2xl flex flex-col items-center relative w-full max-w-[400px]" 
           style={{ 
             borderRadius: '2.5rem', 
             padding: 'clamp(1.5rem, 5vw, 2.5rem) clamp(1.5rem, 5vw, 2.5rem)',
             boxSizing: 'border-box'
           }}>
        
        {/* Back Button */}
        <Link to="/login" className="absolute top-5 left-5 sm:top-8 sm:left-8 text-blue-300 hover:text-blue-500 transition-colors">
          <ArrowLeft size={18} strokeWidth={2.5} />
        </Link>

        {/* Logo Section */}
        <div className="mb-4 mt-2 sm:mt-4 text-center">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[55px] h-[55px] sm:w-[70px] sm:h-[70px] inline-block">
            <path d="M5 10 L95 10 L50 95 Z" fill="url(#blueGradForgotZ)" />
            <path d="M30 35 H70 L30 65 H70" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="blueGradForgotZ" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3092FA" />
                <stop offset="100%" stopColor="#005BFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {!isSubmitted ? (
          <>
            {/* Headings */}
            <h1 className="text-gray-700 font-semibold mb-1 text-[20px] sm:text-[22px]">Forgot Password?</h1>
            <p className="text-gray-400 mb-6 sm:mb-8 text-[12px] sm:text-[13px] text-center">
              Enter your email address and we'll send you a link to reset your password.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              
              {/* Email Input */}
              <div className="relative w-full group">
                <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-[#8AC4FA]">
                  <Mail size={18} strokeWidth={2.5} />
                </div>
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ paddingLeft: '3.5rem' }}
                  className="w-full bg-white border border-gray-100 rounded-full py-2.5 sm:py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center mt-3">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-[#0084FF] text-white font-semibold rounded-full py-2.5 sm:py-3 px-12 sm:px-16 hover:bg-blue-600 transition-all active:scale-95 text-sm shadow-lg shadow-blue-400/30 disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-4">
            <CheckCircle size={50} className="text-green-500 mb-4" />
            <h2 className="text-gray-700 font-semibold text-[18px] mb-2">Check your email</h2>
            <p className="text-gray-400 text-[13px] mb-8">
              We have sent a password reset link to <br/><span className="text-gray-600 font-medium">{email}</span>
            </p>
            <Link to="/login" className="text-[#0084FF] font-semibold hover:underline">
              Back to Sign In
            </Link>
          </div>
        )}

        {/* Footer Link (only if not submitted) */}
        {!isSubmitted && (
          <p className="text-gray-400 text-[11px] sm:text-[13px] text-center mt-8">
            Remember your password?{" "}
            <Link to="/login" className="text-[#0084FF] font-semibold hover:underline">Sign in here</Link>
          </p>
        )}

      </div>
    </div>
  );
}
