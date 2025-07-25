"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // 기본 stale time (5분)
            staleTime: 5 * 60 * 1000,
            // 기본 cache time (10분)
            gcTime: 10 * 60 * 1000,
            // 재시도 횟수
            retry: 1,
            // 에러 발생 시 재시도 간격
            retryDelay: (attemptIndex) =>
              Math.min(1000 * 2 ** attemptIndex, 30000),
            // 윈도우 포커스 시 refetch
            refetchOnWindowFocus: false,
            // 네트워크 재연결 시 refetch
            refetchOnReconnect: true,
          },
          mutations: {
            // 뮤테이션 재시도 횟수
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
