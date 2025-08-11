import { httpClient } from "@/shared/api/base-client";
import { Order } from "../model/types";

export const getOrders = async (userIdx: number) => {
  return httpClient
    .get(`/v1/orders?userIdx=${userIdx}`)
    .then((res) => (res.data as any).data as Order[]);
};

export const getOrder = async (orderId: string, userIdx: number) => {
  return httpClient
    .get(`/v1/orders/detail?orderId=${orderId}&userIdx=${userIdx}`)
    .then((res) => (res.data as any).data as Order);
};
