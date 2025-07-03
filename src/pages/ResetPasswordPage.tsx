import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <div style={{ padding: "2rem" }}>
      <h1>비밀번호 재설정</h1>
      {token ? (
        <p>
          받은 토큰: <strong>{token}</strong>
          <input
            type="password"
            placeholder="새 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="새 비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            onClick={() => {
              if (password !== confirmPassword) {
                alert("비밀번호가 일치하지 않습니다.");
                return;
              }
              fetch(`http://localhost:5000/auth/reset-password`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  token,
                  password,
                }),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            비밀번호 재설정
          </button>
        </p>
      ) : (
        <p>토큰이 없습니다.</p>
      )}
    </div>
  );
};

export default ResetPasswordPage;
