import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const KakaoCallbackPage = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code");
    
    const [loginStatus, setLoginStatus] = useState<
        "pending" | "success" | "error"
    >("pending");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!code) {
            setLoginStatus("error");
            setErrorMessage("인증 코드가 없습니다.");
            return;
        }

        const processKakaoLogin = async () => {
            try {
                // 백엔드로 인증 코드 전송
                const response = await fetch(`http://localhost:5000/auth/kakao/callback?code=${code}`, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('카카오 로그인 처리 중 오류가 발생했습니다.');
                }

                const data = await response.json();

                if (data.success) {
                    // 액세스 토큰 저장
                    localStorage.setItem('accessToken', data.accessToken);
                    setLoginStatus("success");
                    
                    // 2초 후 마이페이지로 이동
                    setTimeout(() => {
                        navigate("/my-page");
                    }, 2000);
                } else {
                    throw new Error(data.message || '카카오 로그인에 실패했습니다.');
                }
            } catch (error) {
                console.error('카카오 로그인 에러:', error);
                setLoginStatus("error");
                setErrorMessage(error instanceof Error ? error.message : '서버 오류가 발생했습니다.');
            }
        };

        processKakaoLogin();
    }, [code, navigate]);

    return (
        <div
            style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
            }}
        >
            <div
                style={{
                    backgroundColor: "white",
                    padding: "2rem",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    maxWidth: "400px",
                    width: "100%",
                }}
            >
                <h1 style={{ marginBottom: "1.5rem" }}>카카오 로그인</h1>

                {loginStatus === "pending" && (
                    <div>
                        <div
                            style={{
                                width: "40px",
                                height: "40px",
                                border: "4px solid #f3f3f3",
                                borderTop: "4px solid #FEE500",
                                borderRadius: "50%",
                                animation: "spin 1s linear infinite",
                                margin: "0 auto 1rem",
                            }}
                        />
                        <p>카카오 로그인을 처리중입니다...</p>
                    </div>
                )}

                {loginStatus === "success" && (
                    <div>
                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#4CAF50",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 1rem",
                            }}
                        >
                            <span style={{ color: "white", fontSize: "2rem" }}>✓</span>
                        </div>
                        <p style={{ color: "#4CAF50", fontWeight: "bold" }}>
                            카카오 로그인이 완료되었습니다!
                        </p>
                        <p style={{ color: "#666", marginTop: "0.5rem" }}>
                            잠시 후 마이페이지로 이동합니다...
                        </p>
                    </div>
                )}

                {loginStatus === "error" && (
                    <div>
                        <div
                            style={{
                                width: "60px",
                                height: "60px",
                                backgroundColor: "#f44336",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                margin: "0 auto 1rem",
                            }}
                        >
                            <span style={{ color: "white", fontSize: "2rem" }}>✗</span>
                        </div>
                        <p style={{ color: "#f44336", fontWeight: "bold" }}>
                            카카오 로그인에 실패했습니다.
                        </p>
                        <p style={{ color: "#666", marginTop: "0.5rem" }}>
                            {errorMessage}
                        </p>
                        <button
                            onClick={() => navigate("/signin")}
                            style={{
                                marginTop: "1rem",
                                padding: "0.75rem 1.5rem",
                                backgroundColor: "#007bff",
                                color: "white",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            로그인 페이지로 돌아가기
                        </button>
                    </div>
                )}
            </div>

            <style>
                {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
            </style>
        </div>
    );
};

export default KakaoCallbackPage; 