import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages";
import {
  ForgetPasswordPage,
  LandingPage,
  ResetPasswordPage,
  SigninPage,
} from "../pages/auth";

const MainApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SigninPage />} />
      <Route path="/forgetpassword" element={<ForgetPasswordPage />} />
      <Route path="/resetpassword" element={<ResetPasswordPage />} />
      <Route path="/home" element={<HomePage />} />
    </Routes>
  );
};

export default MainApp;
