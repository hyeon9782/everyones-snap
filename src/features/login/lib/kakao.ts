// lib/kakao.ts
declare global {
  interface Window {
    Kakao: any;
  }
}

export const initKakao = () => {
  if (typeof window !== "undefined" && window.Kakao) {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  }
};

export const kakaoLogin = () => {
  if (typeof window !== "undefined" && window.Kakao) {
    window.Kakao.Auth.authorize({
      redirectUri:
        process.env.KAKAO_REDIRECT_URI ||
        "http://localhost:3000/auth/kakao/callback",
      state: generateState(), // CSRF 방지용 랜덤 문자열
    });
  }
};

const generateState = () => {
  const state = Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem("kakao_state", state);
  return state;
};
