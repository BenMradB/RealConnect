import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { currentAuthenticatedUser } = useAuth();
  if (!currentAuthenticatedUser) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
