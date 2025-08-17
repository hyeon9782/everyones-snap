"use client";

import { useUserStore } from "@/features/login/model/store";
import { getOrder } from "@/features/payment-viewer/api/api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// useSearchParams를 사용하는 컴포넌트를 별도로 분리
const PaymentSuccessContent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") ?? "";
  const { user } = useUserStore();

  const { data: order } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrder(orderId, user?.userIdx ?? 0),
    enabled: !!orderId,
  });

  return (
    <div className="bg-[#F1F5F9] h-screen flex flex-col gap-10 px-4 py-10">
      <div className="bg-white rounded-lg px-5 py-7 flex flex-col gap-5">
        <div className="flex flex-col gap-3 items-center justify-center h-[161px]">
          <Image
            src="/images/check_circle.svg"
            alt="success"
            width={33.33}
            height={33.33}
          />
          <span className="text-[#359EFF] font-semibold text-[24px] text-center">
            결제가 완료되었습니다.
          </span>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제상품
          </span>
          <span className="text-[16px] font-semibold text-[#344054]">
            모두의스냅 이용권 {order?.productName}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제일자
          </span>
          <span className="text-[16px] font-medium text-[#344054]">
            {dayjs(order?.createDt).format("YYYY.MM.DD HH:mm:ss")}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제금액
          </span>
          <span className="text-[16px] font-semibold text-[#344054]">
            {order?.amount?.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            주문번호
          </span>
          <span className="text-[16px] font-medium text-[#344054]">
            {order?.orderId}
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <Link
          href="/"
          className="flex-1 bg-white rounded-lg py-4 text-center text-[16px] font-semibold text-[#344054]"
        >
          홈으로
        </Link>
        <Link
          href="/payment/history"
          className="flex-1 bg-[#359EFF] rounded-lg py-4 text-center text-[16px] font-semibold text-white"
        >
          결제 내역
        </Link>
      </div>
    </div>
  );
};

// 로딩 상태를 위한 fallback 컴포넌트
const PaymentSuccessLoading = () => (
  <div className="bg-[#F1F5F9] h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">결제 완료 정보를 불러오는 중...</p>
    </div>
  </div>
);

const PaymentSuccessPage = () => {
  return (
    <Suspense fallback={<PaymentSuccessLoading />}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccessPage;
