export type User = {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  kakaoProfile: {
    nickname: string;
    email: string;
    profileImage: string;
  };
  userIdx: number;
  id: string;
  platformType: "kakao";
  personalInfo: "y" | "n";
  deleteYn: "y" | "n";
  marketing: "y" | "n";
  terms: "y" | "n";
};

export interface LoginRequest {
  code: string;
  platformType: "kakao";
}

export interface LoginResponse {
  isNewUser: boolean;
  id: string;
  platformType: "kakao";
  kakaoProfile: {
    nickname: string;
    email: string;
    profileImage: string;
  };
}

export interface SignupRequest {
  id: string;
  platformType: "kakao";
  code: string;
  email: string;
  personalInfo: "y" | "n";
  terms: "y" | "n";
  marketing: "y" | "n";
}

export interface SignupResponse {
  accessToken: string;
  refreshToken: string;
  userIdx: number;
  id: string;
  platformType: "kakao";
  code: string;
  personalInfo: "y" | "n";
  deleteYn: "y" | "n";
  marketing: "y" | "n";
  terms: "y" | "n";
}
