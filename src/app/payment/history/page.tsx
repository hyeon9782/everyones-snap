import PaymentHistoryCard from "@/features/payment-viewer/ui/payment-history-card";
import React from "react";

const PaymentHistoryPage = () => {
  return (
    <div className="bg-[#F1F5F9] h-screen flex flex-col gap-5 px-4 py-10">
      <h1 className="text-[20px] font-semibold">결제 내역</h1>
      <div className="flex flex-col gap-4">
        <PaymentHistoryCard />
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
