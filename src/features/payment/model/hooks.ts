import { useApiMutation } from "@/shared/lib/hooks/use-mutation";

import { createOrder, preparePayment } from "../api/api";
import { useState } from "react";
import {
  CreateOrderRequest,
  NicepayResponse,
  PaymentPrepareResponse,
} from "./types";
import { useUserStore } from "@/features/login/model/store";

declare global {
  interface Window {
    AUTHNICE: {
      requestPay: (params: any) => void;
    };
  }
}

export const usePayment = () => {
  const [currentStep, setCurrentStep] = useState<
    "idle" | "creating-order" | "preparing-payment" | "calling-nicepay"
  >("idle");

  const { user } = useUserStore();

  const {
    mutateAsync: createOrderMutation,
    isPending: isCreatingOrder,
    error: createOrderError,
    reset: createOrderReset,
  } = useApiMutation(createOrder);

  const {
    mutateAsync: preparePaymentMutation,
    isPending: isPreparingPayment,
    error: preparePaymentError,
    reset: preparePaymentReset,
  } = useApiMutation(preparePayment);

  const isLoading =
    isCreatingOrder || isPreparingPayment || currentStep === "calling-nicepay";

  const error = createOrderError || preparePaymentError;

  const processPayment = async (orderData: CreateOrderRequest) => {
    try {
      // 1. 주문 생성
      setCurrentStep("creating-order");
      const orderResponse = await createOrderMutation(orderData);

      console.log("orderResponse", orderResponse);

      // 2. 결제 준비
      setCurrentStep("preparing-payment");
      const paymentPrepareData = {
        orderId: orderResponse.orderId,
        userIdx: user?.userIdx,
      };

      console.log("paymentPrepareData", paymentPrepareData);

      const prepareResponse = await preparePaymentMutation(paymentPrepareData);

      console.log("prepareResponse", prepareResponse);

      const prepareData = {
        ...prepareResponse,
        orderId: orderResponse.orderId,
      };

      // 3. 나이스페이 결제창 호출
      setCurrentStep("calling-nicepay");
      await callNicepayUI(prepareData);
    } catch (err) {
      console.error("결제 처리 오류:", err);
      throw err;
    } finally {
      setCurrentStep("idle");
    }
  };

  const callNicepayUI = (
    prepareData: PaymentPrepareResponse
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined" || !window.AUTHNICE) {
        reject(new Error("나이스페이 SDK가 로드되지 않았습니다."));
        return;
      }

      console.log("prepareData", prepareData);

      const returnUrl = `https://api.everyonesnap.com${process.env.NEXT_PUBLIC_NICEPAY_RETURN_URL}`;

      const paymentParams = {
        clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID,
        method: "card",
        orderId: `${prepareData.orderId}`,
        amount: prepareData.order.amount,
        goodsName: prepareData.order.productName,
        returnUrl: returnUrl,
        fnError: (result: any) => {
          reject(new Error(result.errorMsg || "결제 오류가 발생했습니다."));
        },
      };

      console.log("paymentParams", paymentParams);

      // 결제창 호출
      window.AUTHNICE.requestPay(paymentParams);
      resolve();
    });
  };

  const reset = () => {
    createOrderReset();
    preparePaymentReset();
    setCurrentStep("idle");
  };

  return {
    processPayment,
    isLoading,
    error,
    currentStep,
    reset,
  };
};
