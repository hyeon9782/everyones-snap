// app/auth/kakao/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { httpClient } from "@/shared/api/base-client";
import { useUserStore } from "@/features/login/model/store";
import { setCookie } from "@/shared/lib/cookie-utils";

const KakaoCallbackPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { setUser } = useUserStore();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get("code");
        const state = searchParams.get("state");
        const storedState = sessionStorage.getItem("kakao_state");

        // State 검증
        if (state !== storedState) {
          throw new Error("Invalid state parameter");
        }

        // 백엔드로 code 전송
        const response = await httpClient.post("/v1/users/login", {
          code,
          platformType: "kakao",
        });

        console.log("Backend response:", response);

        // 응답 구조에 따라 수정 필요
        if (response.data && response.data.message === "success") {
          const { data } = response.data;

          if (data.isNewUser) {
            // 새 사용자인 경우 sessionStorage에 id 저장하고 term 페이지로 이동
            sessionStorage.setItem("tempUserId", data.id);
            sessionStorage.setItem("tempCode", code ?? "");
            sessionStorage.setItem("tempEmail", response.data.data.email);
            router.push("/term");
          } else {
            // 완전한 로그인
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("userIdx", data.userIdx);

            // 쿠키 설정 (올바른 방식)
            setCookie("accessToken", data.accessToken, 1); // 1일
            setCookie("refreshToken", data.refreshToken, 7); // 7일
            setCookie("userIdx", data.userIdx, 7); // 7일

            // httpClient에 토큰 설정
            httpClient.setAuthToken(data.accessToken);

            // 상태 정리
            sessionStorage.removeItem("kakao_state");
            console.log("data", data);

            setUser(data);

            router.push(`/host/${data.userIdx}`);
          }
        } else {
          throw new Error(response.data?.message || "Login failed");
        }
      } catch (err) {
        console.error("Login error:", err);
        setError(err instanceof Error ? err.message : "Login failed");
      } finally {
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로그인 처리중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">로그인 실패: {error}</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            다시 로그인
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default KakaoCallbackPage;
