// app/auth/kakao/callback/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { httpClient } from "@/shared/api/base-client";
import { useUserStore } from "@/features/login/model/store";

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
            const response = await httpClient.post(`/v1/users/signUp`, {
              id: data.id,
              platformType: "kakao",
              personalInfo: "y",
              terms: "y",
              marketing: "y",
            });

            console.log("signUp response:", response);

            router.push(`/host/${data.id}`);
          } else {
            // 완전한 로그인
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("userIdx", data.userIdx);

            document.cookie = `accessToken=${data.accessToken}; path=/; max-age=3600; SameSite=Lax`;
            document.cookie = `refreshToken=${data.refreshToken}; path=/; max-age=604800; SameSite=Lax`;
            document.cookie = `userIdx=${data.userIdx}; path=/; max-age=604800; SameSite=Lax`;

            // httpClient에 토큰 설정
            httpClient.setAuthToken(data.accessToken);

            // 상태 정리
            sessionStorage.removeItem("kakao_state");

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
