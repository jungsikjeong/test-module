import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SignupCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState<
    "pending" | "success" | "error"
  >("pending");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setVerificationStatus("error");
      return;
    }

    fetch(`http://localhost:5000/auth/callback/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data);
        setVerificationStatus("success");
        // 3초 후 로그인 페이지로 이동
        // setTimeout(() => {
        //   navigate("/login");
        // }, 3000);
      })
      .catch((err) => {
        console.error("에러입니다:", err);
        setVerificationStatus("error");
      });
  }, [token, navigate]);

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <h1>이메일 인증</h1>
      {verificationStatus === "pending" && <p>이메일 인증을 진행중입니다...</p>}
      {verificationStatus === "success" && (
        <div>
          <p style={{ color: "green" }}>이메일 인증이 완료되었습니다!</p>
          <p>잠시 후 로그인 페이지로 이동합니다...</p>
        </div>
      )}
      {verificationStatus === "error" && (
        <div>
          <p style={{ color: "red" }}>이메일 인증에 실패했습니다.</p>
          <p>유효하지 않은 토큰이거나 만료된 토큰입니다.</p>
          <button onClick={() => navigate("/signup")}>
            회원가입 페이지로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupCallbackPage;
