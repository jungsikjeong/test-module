import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignupCallbackPage from "./pages/SignupCallbackPage";
import MyPage from "./pages/MyPage";
import SignInPage from "./pages/SignInPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/signup/callback" element={<SignupCallbackPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/" element={<SignInPage />} />
      </Routes>
    </Router>
  );
};

export default App;
