import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from './pages/Login';
import {SignUp} from './pages/Signup';
import {Dashboard} from './pages/Dashboard/Dashboard';
import { ProtectedPage } from './pages/ProtectedPage';
import { NotFound } from "./pages/NotFound";
export const AppRoutes = () => {
  return (
        <Routes>
            <Route index element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/dashboard"
            element={
                <ProtectedPage>
                <Dashboard />
                </ProtectedPage>
            }/>
        <Route path="*" element={<NotFound />}/>
        {/* </Route> */}
        </Routes>
  );
};