import { httpClient } from "@/shared/api/base-client";

export const login = async ({
  id,
  platformType,
}: {
  id: string;
  platformType: "kakao";
}) => {
  return httpClient.post("/v1/users/login", {
    id,
    platformType,
  });
};

export const signup = async ({
  id,
  platformType,
  personalInfo,
  terms,
  marketing,
}: {
  id: string;
  platformType: "kakao";
  personalInfo: "y" | "n";
  terms: "y" | "n";
  marketing: "y" | "n";
}) => {
  return httpClient.post("/v1/users/signUp", {
    id,
    platformType,
    personalInfo,
    terms,
    marketing,
  });
};
