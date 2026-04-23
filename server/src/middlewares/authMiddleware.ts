import type { Request, Response, NextFunction } from "express";

export const authorizeRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // In a real app, you would get the user from the JWT token (req.user)
    // For now, since we are using mocks, we can pass the role in headers or body for testing
    // or just mock the user object if we had a proper JWT middleware.
    
    const userRole = req.headers["x-user-role"] as string;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ 
        message: "Access denied. You do not have the required permissions." 
      });
    }

    next();
  };
};
