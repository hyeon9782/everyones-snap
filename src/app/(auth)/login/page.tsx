"use client";

import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const handleClientLogin = async () => {
    if (window.Kakao && window.Kakao.Auth) {
      // State 생성 및 저장
      const state = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("kakao_state", state);

      window.Kakao.Auth.authorize({
        redirectUri:
          process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ||
          "http://localhost:3000/auth/kakao/callback",
        state: state,
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button onClick={handleClientLogin}>Client Login</button>
    </div>
  );
};

export default LoginPage;
