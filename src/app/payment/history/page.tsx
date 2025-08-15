"use client";

import { useUserStore } from "@/features/login/model/store";
import { getOrders } from "@/features/payment-viewer/api/api";
import PaymentHistoryCard from "@/features/payment-viewer/ui/payment-history-card";
import { useApiQuery } from "@/shared/lib";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentHistoryPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "all";
  const { user } = useUserStore();

  const { data: orders } = useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(user?.userIdx ?? 0),
    enabled: !!user?.userIdx,
  });

  const successOrders = orders?.filter((order) => order.status === "paid");
  const cancelOrders = orders?.filter((order) => order.status === "cancel");

  return (
    <div className="bg-[#F1F5F9] min-h-screen flex flex-col gap-5 px-4 py-10">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-semibold text-[#344054]">결제 내역</h1>
        <div className="flex items-center gap-2 bg-white rounded-full p-0.5">
          <Link
            href="/payment/history?type=all"
            className={`px-2 py-1.5 rounded-full text-[16px] font-medium ${
              type === "all"
                ? "bg-[#667085] text-white"
                : "bg-white text-[#344054]"
            }`}
          >
            전체
          </Link>
          <Link
            href="/payment/history?type=success"
            className={`px-2 py-1.5 rounded-full text-[16px] font-medium ${
              type === "success"
                ? "bg-[#667085] text-white"
                : "bg-white text-[#344054]"
            }`}
          >
            결제
          </Link>
          <Link
            href="/payment/history?type=failure"
            className={`px-2 py-1.5 rounded-full text-[16px] font-medium ${
              type === "failure"
                ? "bg-[#667085] text-white"
                : "bg-white text-[#344054]"
            }`}
          >
            취소
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {orders?.map((order) => (
          <PaymentHistoryCard key={order.orderIdx} order={order} />
        ))}
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
