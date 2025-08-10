import { useApiMutation } from "@/shared/lib/hooks/use-mutation";

import { approvePayment, createOrder, preparePayment } from "../api/api";
import { useState } from "react";
import {
  CreateOrderRequest,
  NicepayResponse,
  PaymentPrepareResponse,
} from "./types";
import { useUserStore } from "@/features/login/model/store";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

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

  const {
    mutateAsync: approvePaymentMutation,
    isPending: isApprovingPayment,
    error: approvePaymentError,
    reset: approvePaymentReset,
  } = useApiMutation(approvePayment);

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

      // 3. 나이스페이 결제창 호출
      setCurrentStep("calling-nicepay");
      await callNicepayUI(prepareResponse);
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

      // const accessToken = localStorage.getItem("accessToken");

      const accessToken = "";

      const paymentParams = {
        clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID,
        method: "card",
        orderId: `${prepareData.paymentIdx}`,
        amount: prepareData.order.amount,
        goodsName: prepareData.order.productName,
        returnUrl: process.env.NEXT_PUBLIC_NICEPAY_RETURN_URL,
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

  // const processPayment = async (orderData: CreateOrderRequest) => {
  //   try {
  //     // 1. 주문 생성
  //     const orderResponse = await createOrderMutation(orderData);

  //     // 2. 결제 준비
  //     const prepareResponse = await preparePaymentMutation({
  //       orderId: orderResponse.orderId,
  //       userIdx: user?.userIdx, // 현재 사용자 ID
  //     });

  //     // 3. 나이스페이 결제창 호출 및 결과 대기
  //     const nicepayResult = await callNicepayUI(prepareResponse);

  //     // 4. 클라이언트에서 직접 승인 API 호출 (토큰 포함)
  //     const approvalResult = await approvePaymentMutation({
  //       tid: nicepayResult.tid,
  //       paymentIdx: prepareResponse.paymentIdx,
  //       amount: Number(nicepayResult.amount),
  //     });

  //     if (approvalResult.success) {
  //       router.push(`/payment/success?orderId=${orderResponse.orderId}`);
  //     } else {
  //       router.push("/payment/fail");
  //     }
  //   } catch (error) {
  //     console.error("결제 처리 오류:", error);
  //   }
  // };

  // const callNicepayUI = (
  //   prepareData: PaymentPrepareResponse
  // ): Promise<NicepayResponse> => {
  //   return new Promise((resolve, reject) => {
  //     if (typeof window === "undefined" || !window.AUTHNICE) {
  //       reject(new Error("나이스페이 SDK가 로드되지 않았습니다."));
  //       return;
  //     }

  //     const paymentParams = {
  //       clientId: process.env.NEXT_PUBLIC_NICEPAY_CLIENT_ID,
  //       method: "card",
  //       orderId: prepareData.paymentIdx,
  //       amount: prepareData.order.amount,
  //       goodsName: prepareData.order.productName,
  //       // 콜백 함수로 직접 처리
  //       fnCallback: (result: NicepayResponse) => {
  //         if (result.authResultCode === "0000") {
  //           resolve(result);
  //         } else {
  //           reject(new Error(result.authResultMsg));
  //         }
  //       },
  //       fnError: (result: any) => {
  //         reject(new Error(result.errorMsg || "결제 오류가 발생했습니다."));
  //       },
  //     };

  //     window.AUTHNICE.requestPay(paymentParams);
  //   });
  // };

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
