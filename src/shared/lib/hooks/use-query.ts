import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

// 기본 에러 타입
export interface ApiError {
  message: string;
  status?: number;
}

// 기본 쿼리 훅
export function useApiQuery<TData, TError = ApiError>(
  queryKey: readonly unknown[],
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">
): UseQueryResult<TData, TError> {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
}

// 무한 스크롤을 위한 쿼리 훅
export function useInfiniteQuery<TData, TError = ApiError>(
  queryKey: readonly unknown[],
  queryFn: ({ pageParam }: { pageParam?: number }) => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData>, "queryKey" | "queryFn">
) {
  return useQuery({
    queryKey,
    queryFn: () => queryFn({ pageParam: 1 }), // 기본값으로 1페이지
    ...options,
  });
}
