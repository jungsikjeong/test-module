import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleInitialWithdrawal = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      setShowPasswordModal(true);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:5000/auth/check-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYTc4OTU5ZC1jMzFhLTQ3YWQtYWM0Mi1mNzJjNTM4MGRlMmQiLCJzY29wZXMiOltdLCJpYXQiOjE3NTE1MTA3NDUsImV4cCI6MTc1MTUxMTY0NX0.H4Nn_A-FLwAiMbsaC8NF63bB6kzk9oJ9WerpMMn26uI`,
          },
          credentials: "include",
          body: JSON.stringify({ password }),
        }
      );
      const data: { success: boolean } = await response.json();
      console.log("data:", data);
      if (data.success) {
        setShowPasswordModal(false);
        setShowFinalConfirmation(true);
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  const handleFinalWithdrawal = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/account", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxYTc4OTU5ZC1jMzFhLTQ3YWQtYWM0Mi1mNzJjNTM4MGRlMmQiLCJzY29wZXMiOltdLCJpYXQiOjE3NTE1MTA3NDUsImV4cCI6MTc1MTUxMTY0NX0.H4Nn_A-FLwAiMbsaC8NF63bB6kzk9oJ9WerpMMn26uI`,
        },
        credentials: "include",
      });

      const data = await response.json();
      console.log("data:", data);
      if (data.success) {
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      } else {
        setError("탈퇴 처리 중 오류가 발생했습니다.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>내 정보</h1>

      <div style={{ marginTop: "2rem" }}>
        <button
          onClick={handleInitialWithdrawal}
          style={{
            backgroundColor: "#ff4444",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          회원 탈퇴
        </button>
      </div>

      {/* 비밀번호 확인 모달 */}
      {showPasswordModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <h2>비밀번호 확인</h2>
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
              style={{
                width: "100%",
                padding: "0.5rem",
                marginBottom: "1rem",
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button type="submit">확인</button>
              <button type="button" onClick={() => setShowPasswordModal(false)}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 최종 확인 모달 */}
      {showFinalConfirmation && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "2rem",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            width: "90%",
            maxWidth: "400px",
          }}
        >
          <h2>회원 탈퇴 확인</h2>
          <p>회원 탈퇴 시 다음과 같은 서비스 이용이 제한됩니다:</p>
          <ul>
            <li>저장된 모든 개인정보가 삭제됩니다.</li>
            <li>작성한 게시물 및 댓글이 모두 삭제됩니다.</li>
            <li>즉시 로그아웃되며 서비스 이용이 불가능합니다.</li>
            <li>탈퇴 후 동일한 이메일로 재가입이 30일간 제한됩니다.</li>
          </ul>
          <p>정말로 탈퇴하시겠습니까?</p>
          <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
            <button onClick={handleFinalWithdrawal}>예</button>
            <button onClick={() => setShowFinalConfirmation(false)}>
              아니오
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPage;
