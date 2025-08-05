// lib/api/client.ts
import ky, { HTTPError } from "ky";
import { useAuthStore } from "@/shared/model/auth-store";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

// 토큰 갱신을 위한 별도 인스턴스 (무한 루프 방지)
const refreshClient = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 10000,
});

// 토큰 갱신 함수
const refreshAccessToken = async (): Promise<string | null> => {
  const { getRefreshToken, setTokens, clearTokens } = useAuthStore.getState();
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    clearTokens();
    return null;
  }

  try {
    const response = await refreshClient
      .post("auth/refresh", {
        json: { refreshToken },
      })
      .json<{ accessToken: string; refreshToken: string }>();

    setTokens(response.accessToken, response.refreshToken);
    return response.accessToken;
  } catch (error) {
    console.error("토큰 갱신 실패:", error);
    clearTokens();
    // 로그인 페이지로 리다이렉트 (클라이언트에서만)
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }
};

// 메인 API 클라이언트
export const apiClient = ky.create({
  prefixUrl: API_BASE_URL,
  timeout: 30000,
  retry: {
    limit: 2,
    methods: ["get", "put", "patch", "delete"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const { getAccessToken } = useAuthStore.getState();
        const accessToken = getAccessToken();

        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // 401 에러 시 토큰 갱신 시도
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken();

          if (newAccessToken) {
            // 새 토큰으로 원래 요청 재시도
            const newRequest = request.clone();
            newRequest.headers.set("Authorization", `Bearer ${newAccessToken}`);

            return ky(newRequest);
          }
        }

        return response;
      },
    ],
    beforeError: [
      async (error) => {
        try {
          // HTTPError 타입 체크
          if (error instanceof HTTPError && error.response) {
            const { response } = error;

            // 응답 본문도 로깅 (필요한 경우)
            let errorBody = null;
            try {
              errorBody = await response.clone().json();
            } catch {
              // JSON 파싱 실패 시 텍스트로 시도
              try {
                errorBody = await response.clone().text();
              } catch {
                // 응답 본문 읽기 실패
              }
            }

            console.error(`API Error ${response.status}:`, {
              url: response.url,
              status: response.status,
              statusText: response.statusText,
              body: errorBody,
            });
          } else {
            // 네트워크 에러 등 다른 에러
            console.error("API Error:", {
              message: error.message,
              name: error.name,
              stack: error.stack,
            });
          }
        } catch (logError) {
          // 로깅 자체에서 에러가 발생한 경우
          console.error("Error logging failed:", logError);
        }

        return error;
      },
    ],
  },
});

// URL에서 시작 슬래시 제거하는 헬퍼 함수
const normalizeUrl = (url: string): string => {
  return url.startsWith("/") ? url.slice(1) : url;
};

// 타입 안전한 API 호출을 위한 헬퍼 함수들
export const api = {
  get: <T>(url: string, options?: any) =>
    apiClient.get(normalizeUrl(url), options).json<T>(),

  post: <T>(url: string, data?: any, options?: any) =>
    apiClient.post(normalizeUrl(url), { json: data, ...options }).json<T>(),

  put: <T>(url: string, data?: any, options?: any) =>
    apiClient.put(normalizeUrl(url), { json: data, ...options }).json<T>(),

  patch: <T>(url: string, data?: any, options?: any) =>
    apiClient.patch(normalizeUrl(url), { json: data, ...options }).json<T>(),

  delete: <T>(url: string, options?: any) =>
    apiClient.delete(normalizeUrl(url), options).json<T>(),
};

// 파일 업로드용 API
export const uploadApi = {
  post: <T>(url: string, formData: FormData, options?: any) =>
    apiClient.post(normalizeUrl(url), { body: formData, ...options }).json<T>(),
};
