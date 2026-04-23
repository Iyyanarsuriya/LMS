import { type SubmitEvent, useState } from "react";
import { Link } from "react-router-dom";
import { User, Lock } from "lucide-react";
import { login } from "../apiroutes/authApi";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters long.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    console.log("Logging in with:", { username, password });

    try {
      const response = await login({ email: username, password });
      const { data } = response;
      
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Role-based redirection
        const role = data.user.role;
        if (role === "superadmin") {
          window.location.href = "/super-admin";
        } else if (role === "admin") {
          window.location.href = "/admin";
        } else {
          window.location.href = "/student";
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error: any) {
      console.error("Connection failed:", error);
      const errorMessage = error.response?.data?.message || "Failed to connect to backend server.";
      alert(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#8AC4FA] p-4 sm:p-8 w-full box-border">
      {/* Container Card */}
      <div className="bg-white shadow-2xl flex flex-col items-center w-full max-w-[400px]"
        style={{
          borderRadius: '2.5rem',
          padding: 'clamp(1.5rem, 5vw, 2.5rem) clamp(1.5rem, 5vw, 2.5rem)',
          boxSizing: 'border-box'
        }}>

        {/* Logo Section */}
        <div className="mb-4 sm:mb-5">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[65px] h-[65px] sm:w-[80px] sm:h-[80px]">
            <path d="M5 10 L95 10 L50 95 Z" fill="url(#blueGradLoginZ)" />
            {/* Bold Centered Z */}
            <path d="M30 35 H70 L30 65 H70" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="blueGradLoginZ" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3092FA" />
                <stop offset="100%" stopColor="#005BFF" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Headings */}
        <h1 className="text-gray-700 font-semibold mb-1 text-[20px] sm:text-[22px]">Welcome back!</h1>
        <p className="text-gray-400 mb-4 sm:mb-6 text-[12px] sm:text-[13px] text-center">Login to your account</p>

        {/* Error Display */}
        {error && (
          <div className="w-full bg-red-50 border border-red-100 text-red-500 px-4 py-2 rounded-xl text-[11px] sm:text-[12px] mb-4 text-center animate-in fade-in slide-in-from-top-1">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

          {/* Username Input */}
          <div className="relative w-full group">
            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-[#8AC4FA]">
              <User size={18} strokeWidth={2.5} />
            </div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ paddingLeft: '3.5rem' }}
              className="w-full bg-white border border-gray-100 rounded-full py-2.5 sm:py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
            />
          </div>

          {/* Password Input */}
          <div className="relative w-full group">
            <div className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-[#8AC4FA]">
              <Lock size={18} strokeWidth={2.5} />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: '3.5rem' }}
              className="w-full bg-white border border-gray-100 rounded-full py-2.5 sm:py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700 placeholder-gray-400 transition-all text-sm"
            />
          </div>

          <div className="flex justify-between items-center -mt-1 mb-2 px-1 w-full">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-[#0084FF] focus:ring-[#0084FF] cursor-pointer"
              />
              <span className="text-gray-400 text-[12px] group-hover:text-gray-600 transition-colors">Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-[#0084FF] font-semibold hover:underline text-[12px]">
              Forgot password?
            </Link>
          </div>

          {/* Sign In Button */}
          <div className="flex justify-center mt-3">
            <button
              type="submit"
              className="bg-[#0084FF] text-white font-semibold rounded-full py-2.5 sm:py-3 px-12 sm:px-16 hover:bg-blue-600 transition-all active:scale-95 text-sm shadow-lg shadow-blue-400/30"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="w-full flex items-center justify-center mt-6 sm:mt-8 mb-4 sm:mb-6">
          <div className="h-px bg-gray-200 flex-grow"></div>
          <span className="text-gray-400 font-medium px-4 text-[10px] sm:text-[11px] tracking-tight uppercase whitespace-nowrap">Or sign in with</span>
          <div className="h-px bg-gray-200 flex-grow"></div>
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center mb-6 sm:mb-8 w-full">
          {[
            { icon: <svg width="22" height="22" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.222 0-9.654-3.342-11.124-8.081l-6.571 5.302C9.656 39.663 16.318 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg> },
          ].map((item, idx) => (
            <button key={idx} 
                    className="flex items-center justify-center bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-[12px] sm:rounded-[14px]"
                    style={{ width: 'clamp(55px, 18vw, 65px)', height: 'clamp(45px, 14vw, 50px)' }}>
              {item.icon}
            </button>
          ))}
        </div>

        {/* Footer Link */}
        <p className="text-gray-400 text-[11px] sm:text-[13px] text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-[#0084FF] font-semibold hover:underline">Sign up here</Link>
        </p>

      </div>
    </div>
  );
}
