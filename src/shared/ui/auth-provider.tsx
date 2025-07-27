"use client";

import { useEffect } from "react";
import { httpClient } from "@/shared/api/base-client";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    // 앱 시작 시 저장된 토큰으로 httpClient 초기화
    httpClient.initializeAuthToken();
  }, []);

  return <>{children}</>;
}
