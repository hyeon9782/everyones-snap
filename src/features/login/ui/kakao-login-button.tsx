"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

const KakaoLoginButton = () => {
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    // 클라이언트 사이드에서만 window 객체 접근
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
      console.log("window.location.origin", window.location.origin);
      console.log(
        "process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI",
        process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
      );
    }
  }, []);

  const handleKakaoLogin = async () => {
    if (typeof window !== "undefined" && window.Kakao && window.Kakao.Auth) {
      // State 생성 및 저장
      const state = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem("kakao_state", state);

      console.log("window.location.origin", origin);
      console.log(
        "process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI",
        process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI
      );

      window.Kakao.Auth.authorize({
        redirectUri: `${origin}${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}`,
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
