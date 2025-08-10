import { httpClient } from "@/shared/api/base-client";
import { Plan } from "../model/types";
import { useQuery } from "@tanstack/react-query";

export const getPlans = async () => {
  return httpClient
    .get("/v1/orders/plans")
    .then((res) => (res.data as any).data) as unknown as Plan[];
};

// TanStack Query 훅
export const usePlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};
