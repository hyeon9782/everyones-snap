import { httpClient } from "@/shared/api/base-client";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "../model/types";

export const login = async ({ code, platformType }: LoginRequest) => {
  return httpClient.post("/v1/users/login", {
    code,
    platformType,
  });
};

export const signup = async (payload: SignupRequest) => {
  return httpClient
    .post("/v1/users/signUp", payload)
    .then((res) => (res.data as any).data as SignupResponse);
};
