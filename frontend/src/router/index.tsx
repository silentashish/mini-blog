import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { useAuth } from "../hooks";
import {
  ChangePasswordPage,
  CompleteProfilePage,
  HomePage,
  TweetDetailPage,
} from "../pages";
import {
  ForgetPasswordPage,
  LandingPage,
  ResetPasswordPage,
  SigninPage,
} from "../pages/auth";
import { UserType } from "../types";

import { useState } from "react";

const MainApp = () => {
  const { user } = useAuth();
  return (
    <Routes>
      {/* Auth Routes */}
      <Route
        path={"/"}
        element={!user ? <LandingPage /> : <Navigate to="/home" />}
      />
      <Route
        path={"/signin"}
        element={!user ? <SigninPage /> : <Navigate to="/home" />}
      />
      <Route
        path={"/forgetpassword"}
        element={!user ? <ForgetPasswordPage /> : <Navigate to="/home" />}
      />
      <Route
        path={"/resetpassword"}
        element={!user ? <ResetPasswordPage /> : <Navigate to="/home" />}
      />
      {/* Private Routes */}
      <Route
        path={"/home"}
        element={user ? <HomePage /> : <Navigate to="/" />}
      />
      <Route
        path={"/changepassword"}
        element={user ? <ChangePasswordPage /> : <Navigate to="/" />}
      />
      <Route
        path={"/completeProfile"}
        element={user ? <CompleteProfilePage /> : <Navigate to="/" />}
      />
      <Route
        path={"/detail"}
        element={user ? <TweetDetailPage /> : <Navigate to="/" />}
      />
    </Routes>
  );
};

export default () => {
  const [user, setUser] = useState<UserType | null>(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <MainApp />
    </AuthContext.Provider>
  );
};
