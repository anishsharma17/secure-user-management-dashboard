import { useAuth } from "../context/auth-context";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedPage = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { auth } = useAuth();
  if (!auth) return <Navigate to={"/"} state={location.pathname}></Navigate>;
  return <>{children}</>;
};
