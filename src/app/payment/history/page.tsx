"use client";

import { useUserStore } from "@/features/login/model/store";
import { getOrders } from "@/features/payment-viewer/api/api";
import PaymentHistoryCard from "@/features/payment-viewer/ui/payment-history-card";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// useSearchParams를 사용하는 컴포넌트를 별도로 분리
const PaymentHistoryContent = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "all";
  const { user } = useUserStore();

  const { data: orders } = useQuery({
    queryKey: ["orders", user?.userIdx],
    queryFn: () => getOrders(user?.userIdx ?? 0),
    enabled: !!user?.userIdx,
  });

  console.log("orders", orders);

  const successOrders = orders?.filter((order) => order.status === "paid");
  const cancelOrders = orders?.filter((order) => order.status === "cancelled");

  return (
    <div className="bg-[#F1F5F9] min-h-screen flex flex-col gap-5 px-4 py-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-[28px] font-semibold text-[#344054]">
            결제 내역
          </h1>
          <Link
            href="/payment"
            className="text-[16px] font-semibold text-[#359EFF]"
          >
            결제하기
          </Link>
        </div>
        <div className="flex gap-2 bg-white rounded-lg p-1">
          <Link
            href="/payment/history?type=all"
            className={`flex-1 text-center py-3 rounded-lg text-[16px] font-semibold transition-colors ${
              type === "all"
                ? "bg-[#359EFF] text-white"
                : "text-[#667085] hover:bg-gray-50"
            }`}
          >
            전체
          </Link>
          <Link
            href="/payment/history?type=success"
            className={`flex-1 text-center py-3 rounded-lg text-[16px] font-semibold transition-colors ${
              type === "success"
                ? "bg-[#359EFF] text-white"
                : "text-[#667085] hover:bg-gray-50"
            }`}
          >
            결제 완료
          </Link>
          <Link
            href="/payment/history?type=cancel"
            className={`flex-1 text-center py-3 rounded-lg text-[16px] font-semibold transition-colors ${
              type === "cancel"
                ? "bg-[#359EFF] text-white"
                : "text-[#667085] hover:bg-gray-50"
            }`}
          >
            결제 취소
          </Link>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {type === "all" &&
          orders?.map((order) => (
            <PaymentHistoryCard key={order.orderIdx} order={order} />
          ))}
        {type === "success" &&
          successOrders?.map((order) => (
            <PaymentHistoryCard key={order.orderIdx} order={order} />
          ))}
        {type === "cancel" &&
          cancelOrders?.map((order) => (
            <PaymentHistoryCard key={order.orderIdx} order={order} />
          ))}
      </div>
    </div>
  );
};

// 로딩 상태를 위한 fallback 컴포넌트
const PaymentHistoryLoading = () => (
  <div className="bg-[#F1F5F9] min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">결제 내역을 불러오는 중...</p>
    </div>
  </div>
);

const PaymentHistoryPage = () => {
  return (
    <Suspense fallback={<PaymentHistoryLoading />}>
      <PaymentHistoryContent />
    </Suspense>
  );
};

export default PaymentHistoryPage;
