// HTTP 메서드 타입
type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// 요청 옵션 인터페이스
interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  signal?: AbortSignal;
}

// 응답 타입
interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

// 에러 타입
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public data?: any
  ) {
    super(`HTTP ${status}: ${statusText}`);
    this.name = "ApiError";
  }
}

// 기본 설정
const DEFAULT_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";
const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

class HttpClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(
    baseURL: string = DEFAULT_BASE_URL,
    defaultHeaders: Record<string, string> = DEFAULT_HEADERS
  ) {
    this.baseURL = baseURL;
    this.defaultHeaders = defaultHeaders;
  }

  // URL 생성
  private createURL(endpoint: string): string {
    if (endpoint.startsWith("http")) {
      return endpoint;
    }
    return `${this.baseURL}${
      endpoint.startsWith("/") ? endpoint : `/${endpoint}`
    }`;
  }

  // 헤더 병합
  private mergeHeaders(
    customHeaders?: Record<string, string>
  ): Record<string, string> {
    return {
      ...this.defaultHeaders,
      ...customHeaders,
    };
  }

  // 요청 처리
  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const url = this.createURL(endpoint);
    const headers = this.mergeHeaders(options.headers);

    console.log("Request headers:", headers);
    console.log("Request URL:", url);

    // body가 객체인 경우 JSON으로 변환
    let body = options.body;
    if (body && typeof body === "object" && !(body instanceof FormData)) {
      body = JSON.stringify(body);
    }

    const config: RequestInit = {
      method: options.method || "GET",
      headers,
      body,
      signal: options.signal,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }

        throw new ApiError(response.status, response.statusText, errorData);
      }

      let data: T;
      const contentType = response.headers.get("content-type");

      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        data = (await response.text()) as T;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(0, "Network Error", error);
    }
  }

  // GET 요청
  async get<T>(
    endpoint: string,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "GET", headers, signal });
  }

  // POST 요청
  async post<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "POST", body, headers, signal });
  }

  // PUT 요청
  async put<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "PUT", body, headers, signal });
  }

  // PATCH 요청
  async patch<T>(
    endpoint: string,
    body?: any,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: "PATCH",
      body,
      headers,
      signal,
    });
  }

  // DELETE 요청
  async delete<T>(
    endpoint: string,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: "DELETE", headers, signal });
  }

  // 파일 업로드
  async upload<T>(
    endpoint: string,
    formData: FormData,
    headers?: Record<string, string>,
    signal?: AbortSignal
  ): Promise<ApiResponse<T>> {
    const uploadHeaders = {
      ...headers,
      // Content-Type을 제거하여 브라우저가 자동으로 multipart/form-data로 설정하도록 함
    };
    delete uploadHeaders["Content-Type"];

    return this.request<T>(endpoint, {
      method: "POST",
      body: formData,
      headers: uploadHeaders,
      signal,
    });
  }

  // 기본 헤더 설정
  setDefaultHeader(key: string, value: string): void {
    this.defaultHeaders[key] = value;
  }

  // 인증 토큰 설정
  setAuthToken(token: string): void {
    console.log("Setting auth token:", token);
    this.setDefaultHeader("Authorization", `Bearer ${token}`);
  }

  // 저장된 토큰으로 자동 설정 (클라이언트 사이드에서만)
  initializeAuthToken(): void {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        console.log("Initializing auth token from localStorage:", token);
        this.setAuthToken(token);
      } else {
        console.log("No accessToken found in localStorage");
      }
    }
  }

  // 서버 사이드에서 토큰 설정 (쿠키에서 가져오기)
  initializeServerAuthToken(cookies: any): void {
    const token = cookies.get("accessToken")?.value;
    if (token) {
      console.log("Initializing auth token from cookies:", token);
      this.setAuthToken(token);
    } else {
      console.log("No accessToken found in cookies");
    }
  }

  // 토큰 직접 설정 (서버/클라이언트 모두)
  setTokenFromString(token: string): void {
    if (token) {
      console.log("Setting auth token from string:", token);
      this.setAuthToken(token);
    }
  }

  // 기본 헤더 제거
  removeDefaultHeader(key: string): void {
    delete this.defaultHeaders[key];
  }
}

// 기본 인스턴스 생성
export const httpClient = new HttpClient();

// 타입 export
export type { ApiResponse, RequestOptions };
export { HttpClient };
