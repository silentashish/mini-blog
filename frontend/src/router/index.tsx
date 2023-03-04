import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../pages";

const MainApp = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
};

export default MainApp;
