import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";
import { ApiError } from "./use-query";

// 기본 뮤테이션 훅
export function useApiMutation<TData, TError = ApiError, TVariables = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">
): UseMutationResult<TData, TError, TVariables> {
  return useMutation({
    mutationFn,
    ...options,
  });
}

// 낙관적 업데이트를 위한 뮤테이션 훅
export function useOptimisticMutation<
  TData,
  TError = ApiError,
  TVariables = unknown
>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, "mutationFn">
): UseMutationResult<TData, TError, TVariables> {
  return useMutation({
    mutationFn,
    ...options,
  });
}
