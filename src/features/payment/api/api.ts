import { httpClient } from "@/shared/api/base-client";

export const preparePayment = async ({
  orderId,
  userIdx,
}: {
  orderId: string;
  userIdx: number;
}) => {
  return httpClient
    .post("/v1/payments/prepare", {
      orderId,
      userIdx,
    })
    .then((res) => (res.data as any).data);
};

export const approvePayment = async ({
  tid,
  paymentIdx,
  amount,
}: {
  tid: string;
  paymentIdx: number;
  amount: number;
}) => {
  return httpClient
    .post("/v1/payments/approve", {
      tid,
      paymentIdx,
      amount,
    })
    .then((res) => (res.data as any).data);
};

export const cancelPayment = async ({
  tid,
  orderId,
  amount,
  reason,
}: {
  tid: string;
  orderId: string;
  amount: number;
  reason: string;
}) => {
  return httpClient
    .post("/v1/payments/cancel", {
      tid,
      reason,
      orderId,
      cancelAmt: amount,
    })
    .then((res) => (res.data as any).data);
};

export const statusPayment = async ({
  paymentIdx,
  status,
}: {
  paymentIdx: number;
  status: string;
}) => {
  return httpClient
    .patch(`/v1/payments/status`, {
      paymentIdx,
      status,
    })
    .then((res) => (res.data as any).data);
};
