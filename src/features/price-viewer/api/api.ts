import { httpClient } from "@/shared/api/base-client";
import { Plan } from "../model/types";

export const getPlans = async () => {
  return httpClient
    .get("/v1/orders/plans")
    .then((res) => (res.data as any).data) as unknown as Plan[];
};
