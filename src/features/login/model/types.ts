export type User = {
  accessToken: string;
  refreshToken: string;
  isNewUser: boolean;
  userIdx: number;
  id: string;
  platformType: "kakao";
  personalInfo: "y" | "n";
  deleteYn: "y" | "n";
  marketing: "y" | "n";
  terms: "y" | "n";
};
