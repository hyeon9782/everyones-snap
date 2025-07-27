"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";

const KakaoLoginButton = () => {
  const handleKakaoLogin = async () => {
    if (window.Kakao && window.Kakao.Auth) {
      // State 생성 및 저장
      const state = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("kakao_state", state);

      window.Kakao.Auth.authorize({
        redirectUri:
          process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI ||
          "http://localhost:3000/auth/kakao/callback",
        state: state,
        throughTalk: false,
      });
    }
  };
  return (
    <Button
      onClick={handleKakaoLogin}
      className="bg-[#FEE500] text-black font-semibold text-[18px] h-[50px] w-full"
    >
      <Image
        src="/images/kakao_logo.svg"
        alt="kakao"
        width={18.86}
        height={17.69}
      />
      <span>카카오로 시작하기</span>
    </Button>
  );
};

export default KakaoLoginButton;
