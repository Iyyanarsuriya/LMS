import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Lazy load components
const HomePage = lazy(() => import("./pages/HomePage"));
const SuperAdminDashboard = lazy(() => import("./pages/dashboards/SuperAdminDashboard"));
const AdminDashboard = lazy(() => import("./pages/dashboards/AdminDashboard"));
const StudentDashboard = lazy(() => import("./pages/dashboards/StudentDashboard"));
const QuizManager = lazy(() => import("./pages/dashboards/QuizManager"));
const QuizList = lazy(() => import("./pages/quizzes/QuizList"));
const QuizTaking = lazy(() => import("./pages/quizzes/QuizTaking"));
const QuizResult = lazy(() => import("./pages/quizzes/QuizResult"));

// Premium Loading Fallback

// Premium Loading Fallback
const PageLoader = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-white">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-100 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
    </div>
    <div className="mt-4 text-gray-500 font-medium animate-pulse">Loading LMS...</div>
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Dashboard Routes with Protection */}
          <Route 
            path="/super-admin/*" 
            element={
              <ProtectedRoute requiredRole="superadmin">
                <SuperAdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/quizzes" 
            element={
              <ProtectedRoute requiredRole="admin">
                <QuizManager />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student" 
            element={
              <ProtectedRoute requiredRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/quizzes" 
            element={
              <ProtectedRoute requiredRole="student">
                <QuizList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/quiz/:id" 
            element={
              <ProtectedRoute requiredRole="student">
                <QuizTaking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/student/quiz/result/:attemptId" 
            element={
              <ProtectedRoute requiredRole="student">
                <QuizResult />
              </ProtectedRoute>
            } 
          />
          
          {/* Role-specific catch alls */}
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
          <Route path="/student/*" element={<Navigate to="/student" replace />} />
          
          {/* Public Route */}
          <Route path="/" element={<HomePage />} />
          
          {/* Catch all - redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
