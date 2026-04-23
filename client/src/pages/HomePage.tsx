import React, { useState } from "react";
import { 
  ShieldCheck, 
  BookOpen, 
  Users, 
  Trophy, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Star,
  Globe,
  Zap,
  Layout,
  BarChart3
} from "lucide-react";
import LoginModal from "../components/layout/LoginModal";
import ForgotPasswordModal from "../components/layout/ForgotPasswordModal";

const HomePage: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);

  const openForgot = () => {
    setIsLoginOpen(false);
    setIsForgotOpen(true);
  };

  const backToLogin = () => {
    setIsForgotOpen(false);
    setIsLoginOpen(true);
  };
  return (
    <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-600">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-xl border-b-[1px] border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[80px] flex items-center justify-between">
          <div className="flex items-center gap-[12px]">
            <div className="w-[40px] h-[40px] bg-blue-600 rounded-[12px] flex items-center justify-center shadow-lg shadow-blue-200">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="font-bold text-[20px] text-gray-800 tracking-tight">LMS Pro</span>
          </div>

          <div className="hidden md:flex items-center gap-[40px]">
            <a href="#features" className="text-[14px] font-semibold text-gray-500 hover:text-blue-600 transition-colors">Features</a>
            <a href="#courses" className="text-[14px] font-semibold text-gray-500 hover:text-blue-600 transition-colors">Courses</a>
            <a href="#about" className="text-[14px] font-semibold text-gray-500 hover:text-blue-600 transition-colors">About</a>
          </div>

          <div className="flex items-center gap-[16px]">
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="px-[24px] py-[12px] text-[14px] font-bold text-gray-700 hover:text-blue-600 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="px-[28px] py-[12px] bg-blue-600 text-white text-[14px] font-bold rounded-[14px] hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-[160px] pb-[100px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-[8px] px-[16px] py-[8px] bg-blue-50 text-blue-600 rounded-full text-[12px] font-bold uppercase tracking-wider mb-[24px] animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Zap size={14} />
                The Future of Learning is Here
              </div>
              <h1 className="text-[48px] sm:text-[64px] font-bold text-gray-900 leading-[1.1] mb-[24px] animate-in fade-in slide-in-from-bottom-6 duration-700">
                Master New Skills with <span className="text-blue-600">LMS Pro</span> Platform
              </h1>
              <p className="text-[18px] sm:text-[20px] text-gray-500 leading-relaxed mb-[40px] max-w-lg animate-in fade-in slide-in-from-bottom-8 duration-900">
                The most advanced learning management system designed for schools, universities, and corporate training.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-[20px] animate-in fade-in slide-in-from-bottom-10 duration-1000">
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="w-full sm:w-auto px-[40px] py-[18px] bg-blue-600 text-white font-bold rounded-[18px] hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-95 flex items-center justify-center gap-[12px] group"
                >
                  Start Learning Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="w-full sm:w-auto px-[40px] py-[18px] bg-white text-gray-800 font-bold rounded-[18px] border-[1px] border-gray-100 hover:border-blue-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-[12px]">
                  <div className="w-[32px] h-[32px] bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                    <Play size={16} fill="currentColor" />
                  </div>
                  Watch Demo
                </button>
              </div>

              <div className="mt-[60px] flex items-center gap-[24px] animate-in fade-in duration-1000">
                <div className="flex -space-x-[12px]">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-[48px] h-[48px] rounded-full border-[3px] border-white bg-gray-100">
                      <img 
                        src={`https://i.pravatar.cc/100?img=${i+10}`} 
                        alt="User" 
                        className="w-full h-full rounded-full"
                      />
                    </div>
                  ))}
                  <div className="w-[48px] h-[48px] rounded-full border-[3px] border-white bg-blue-600 flex items-center justify-center text-white text-[12px] font-bold">
                    10k+
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-[4px] text-amber-400">
                    {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <p className="text-[14px] text-gray-500 font-medium">Trusted by 10,000+ Students</p>
                </div>
              </div>
            </div>

            <div className="relative lg:h-[600px] animate-in fade-in zoom-in duration-1000">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]"></div>
              <div className="relative bg-white rounded-[40px] border-[1px] border-gray-100 shadow-2xl p-[32px] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-[32px]">
                  <div className="flex gap-[8px]">
                    <div className="w-[12px] h-[12px] bg-rose-400 rounded-full"></div>
                    <div className="w-[12px] h-[12px] bg-amber-400 rounded-full"></div>
                    <div className="w-[12px] h-[12px] bg-emerald-400 rounded-full"></div>
                  </div>
                  <div className="w-[120px] h-[8px] bg-gray-100 rounded-full"></div>
                </div>
                
                <div className="space-y-[24px]">
                  <div className="p-[20px] bg-gray-50 rounded-[24px] flex items-center gap-[20px]">
                    <div className="w-[48px] h-[48px] bg-blue-600 rounded-[16px] flex items-center justify-center text-white shadow-lg shadow-blue-100">
                      <Layout size={24} />
                    </div>
                    <div className="flex-1">
                      <div className="w-1/2 h-[10px] bg-gray-200 rounded-full mb-[8px]"></div>
                      <div className="w-1/3 h-[6px] bg-gray-100 rounded-full"></div>
                    </div>
                    <div className="w-[60px] h-[24px] bg-blue-100 rounded-full"></div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-[24px]">
                    <div className="p-[24px] border-[1px] border-gray-100 rounded-[32px] space-y-[16px]">
                      <div className="w-[40px] h-[40px] bg-emerald-50 text-emerald-600 rounded-[14px] flex items-center justify-center">
                        <Users size={20} />
                      </div>
                      <div className="w-full h-[8px] bg-gray-100 rounded-full"></div>
                      <div className="w-2/3 h-[8px] bg-gray-50 rounded-full"></div>
                    </div>
                    <div className="p-[24px] border-[1px] border-gray-100 rounded-[32px] space-y-[16px]">
                      <div className="w-[40px] h-[40px] bg-purple-50 text-purple-600 rounded-[14px] flex items-center justify-center">
                        <BookOpen size={20} />
                      </div>
                      <div className="w-full h-[8px] bg-gray-100 rounded-full"></div>
                      <div className="w-2/3 h-[8px] bg-gray-50 rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-[40px] -left-[40px] bg-white p-[24px] rounded-[32px] shadow-2xl border-[1px] border-gray-50 flex items-center gap-[16px] animate-bounce duration-[3000ms]">
                  <div className="w-[48px] h-[48px] bg-emerald-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="text-[16px] font-bold text-gray-800">100% Success</p>
                    <p className="text-[12px] text-gray-400">Course Completed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-[100px] bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-[80px]">
          <h2 className="text-[14px] font-bold text-blue-600 uppercase tracking-widest mb-[16px]">Core Features</h2>
          <h3 className="text-[36px] sm:text-[48px] font-bold text-gray-900">Built for Modern Education</h3>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px]">
          {[
            { 
              title: "Smart Dashboards", 
              desc: "Role-based dashboards for students, teachers, and administrators with real-time analytics.",
              icon: Layout,
              color: "bg-blue-500"
            },
            { 
              title: "Interactive Learning", 
              desc: "Engaging content delivery with support for videos, quizzes, and live classes.",
              icon: Play,
              color: "bg-emerald-500"
            },
            { 
              title: "Advanced Reporting", 
              desc: "Deep insights into student performance and course engagement with automated reports.",
              icon: BarChart3,
              color: "bg-purple-500"
            },
            { 
              title: "Global Accessibility", 
              desc: "Access your courses from anywhere, on any device, with our fully responsive design.",
              icon: Globe,
              color: "bg-amber-500"
            },
            { 
              title: "Secure & Scalable", 
              desc: "Enterprise-grade security and cloud-based architecture that scales with your growth.",
              icon: ShieldCheck,
              color: "bg-rose-500"
            },
            { 
              title: "Certificates", 
              desc: "Automatically generate industry-standard certificates upon course completion.",
              icon: Trophy,
              color: "bg-indigo-500"
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-[40px] rounded-[32px] border-[1px] border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all group">
              <div className={`${feature.color} w-[60px] h-[60px] rounded-[20px] flex items-center justify-center text-white mb-[32px] group-hover:scale-110 transition-transform shadow-lg shadow-gray-100`}>
                <feature.icon size={28} />
              </div>
              <h4 className="text-[20px] font-bold text-gray-800 mb-[16px]">{feature.title}</h4>
              <p className="text-[16px] text-gray-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-[80px] bg-white border-t-[1px] border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-[12px] mb-[32px]">
            <div className="w-[40px] h-[40px] bg-blue-600 rounded-[12px] flex items-center justify-center shadow-lg shadow-blue-200">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="font-bold text-[24px] text-gray-800 tracking-tight">LMS Pro</span>
          </div>
          <p className="text-gray-500 max-w-md mx-auto mb-[40px]">
            Empowering the next generation of learners through technology and innovation.
          </p>
          <div className="flex justify-center gap-[32px] text-[14px] font-bold text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Us</a>
          </div>
          <div className="mt-[40px] pt-[40px] border-t-[1px] border-gray-50 text-[14px] text-gray-400">
            © 2026 LMS Pro. All rights reserved.
          </div>
        </div>
      </footer>
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onForgotClick={openForgot}
      />
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        onBackToLogin={backToLogin}
      />
    </div>
  );
};

export default HomePage;
