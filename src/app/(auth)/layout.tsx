"use client";

import Script from "next/script";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const initKakao = () => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      console.log("Kakao SDK initialized");
    }
  };
  return (
    <div>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
        integrity="sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6"
        crossOrigin="anonymous"
        onLoad={() => initKakao()}
      />
      {children}
    </div>
  );
};

export default AuthLayout;
