import React from "react";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  element: JSX.Element;
}

const AdminRouteMiddleware: React.FC<AdminRouteProps> = ({ element }) => {
  const token = localStorage.getItem("accessToken");
  const userType = localStorage.getItem("userType");
  if (token && userType && userType === "Administrator") {
    return element;
  }
  return <Navigate to="/login" replace />;
};

export default AdminRouteMiddleware;
