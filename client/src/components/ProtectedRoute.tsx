import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "superadmin" | "admin" | "student";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const userStr = localStorage.getItem("user") || sessionStorage.getItem("user");
  
  if (!token || !userStr) {
    // Redirect to home (login) if not authenticated
    return <Navigate to="/" replace />;
  }

  try {
    const user = JSON.parse(userStr);
    
    if (requiredRole && user.role !== requiredRole) {
      // Role mismatch - redirect to their appropriate dashboard or home
      const role = user.role;
      if (role === "superadmin") return <Navigate to="/super-admin" replace />;
      if (role === "admin") return <Navigate to="/admin" replace />;
      if (role === "student") return <Navigate to="/student" replace />;
      return <Navigate to="/" replace />;
    }
    
    return <>{children}</>;
  } catch (error) {
    // Error parsing user data - redirect to home
    return <Navigate to="/" replace />;
  }
};

export default ProtectedRoute;
