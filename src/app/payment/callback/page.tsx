// app/payment/processing/page.tsx
"use client";

import { approvePayment } from "@/features/payment/api/api";
import { useApiMutation } from "@/shared/lib";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

function PaymentProcessingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  const { mutateAsync: approvePaymentMutation } =
    useApiMutation(approvePayment);

  useEffect(() => {
    const processPayment = async () => {
      const authResultCode = searchParams.get("authResultCode");
      const authResultMsg = searchParams.get("authResultMsg");
      const tid = searchParams.get("tid");
      const paymentIdx = searchParams.get("paymentIdx");
      const amount = searchParams.get("amount");

      console.log("authResultCode", authResultCode);
      console.log("authResultMsg", authResultMsg);
      console.log("tid", tid);
      console.log("orderId", paymentIdx);
      console.log("amount", amount);

      // 인증 실패
      if (authResultCode !== "0000") {
        router.push(
          `/payment/fail?msg=${encodeURIComponent(
            authResultMsg || "결제 실패"
          )}`
        );
        return;
      }

      // 결제 승인 API 호출 (클라이언트에서 토큰 포함)
      try {
        const result = await approvePaymentMutation({
          tid: tid!,
          paymentIdx: Number(paymentIdx), // 또는 적절한 방식으로 변환
          amount: Number(amount),
        });

        if (result.success) {
          router.push(`/payment/success?orderId=${paymentIdx}`);
        } else {
          router.push(
            `/payment/fail?msg=${encodeURIComponent(result.message)}`
          );
        }
      } catch (error) {
        console.error("결제 승인 오류:", error);
        router.push("/payment/fail?msg=결제 승인 중 오류가 발생했습니다");
      } finally {
        setIsProcessing(false);
      }
    };

    processPayment();
  }, [searchParams, router]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">결제를 처리하고 있습니다...</p>
          <p className="text-gray-500">잠시만 기다려주세요.</p>
        </div>
      </div>
    );
  }

  return null;
}

export default function PaymentProcessingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div>로딩 중...</div>
        </div>
      }
    >
      <PaymentProcessingContent />
    </Suspense>
  );
}
