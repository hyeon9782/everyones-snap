"use client";

import { Button } from "@/shared/ui/button";
import React from "react";
import { Order } from "../model/types";
import dayjs from "dayjs";
import { useUserStore } from "@/features/login/model/store";
import { cancelPayment } from "@/features/payment/api/api";

const PaymentHistoryCard = ({ order }: { order: Order }) => {
  const { user } = useUserStore();

  const handleCancel = async () => {
    const response = await cancelPayment({
      tid: order.tid,
      orderId: order.orderId,
      amount: order.amount,
      reason: "취소",
    });

    console.log("response", response);

    if (response.success) {
      alert("취소되었습니다.");
    } else {
      alert("취소에 실패했습니다.");
    }
  };

  const handleContact = () => {
    alert("문의하기");
  };
  return (
    <div className="bg-white rounded-lg p-5 flex flex-col gap-[32px]">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <span className="text-[#344054] font-semibold text-[18px]">
            {dayjs(order.createDt).format("YYYY.MM.DD")} 결제
          </span>
          {/* <span className="text-[#667085] font-medium text-[18px]">
            {order.orderId}
          </span> */}
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제상품
          </span>
          <span className="text-[16px] font-semibold text-[#344054]">
            모두의스냅 이용권 {order.productName}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제일자
          </span>
          <span className="text-[16px] font-medium text-[#344054]">
            {dayjs(order.createDt).format("YYYY.MM.DD HH:mm:ss")}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">이메일</span>
          <span className="text-[16px] font-medium text-[#344054]">
            {user?.email}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제수단
          </span>
          <span className="text-[16px] font-medium text-[#344054]">
            신용카드
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            총 결제금액
          </span>
          <span className="text-[16px] font-semibold text-[#344054]">
            {order.amount.toLocaleString()}원
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            신한(1002-010-555555)
          </span>
          <span className="text-[16px] font-medium text-[#667085]">일시불</span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          onClick={handleCancel}
          className="h-[48px] flex-1 bg-[#E6F3FF] text-[#344054] text-[16px] font-medium"
        >
          결제 취소
        </Button>
        <Button
          onClick={handleContact}
          className="h-[48px] flex-1 bg-[#F1F5F9] text-[#344054] text-[16px] font-medium"
        >
          문의하기
        </Button>
      </div>
    </div>
  );
};

export default PaymentHistoryCard;
