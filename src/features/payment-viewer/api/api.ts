import { httpClient } from "@/shared/api/base-client";

export const getOrders = async (userIdx: number) => {
  return httpClient
    .get(`/v1/orders?userIdx=${userIdx}`)
    .then((res) => (res.data as any).data);
};
