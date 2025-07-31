import { Button } from "@/shared/ui/button";
import React from "react";

const PaymentHistoryCard = () => {
  return (
    <div className="bg-white rounded-lg p-5 flex flex-col gap-[32px]">
      <div className="flex flex-col gap-4">
        <div className="flex gap-3">
          <span className="text-[#344054] font-semibold text-[18px]">
            25.07.31 결제
          </span>
          <span className="text-[#667085] font-medium text-[18px]">
            115023421
          </span>
        </div>
        <hr />
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제상품
          </span>
          <span className="text-[16px] font-semibold text-[#344054]">
            모두의스냅 이용권 베이직
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제일자
          </span>
          <span className="text-[16px] font-medium text-[#344054]">
            2025.07.31 13:50:00
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">이메일</span>
          <span className="text-[16px] font-medium text-[#344054]">
            test@test.com
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            결제수단
          </span>
          <span className="text-[16px] font-medium text-[#344054]">
            카카오페이
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            총 결제금액
          </span>
          <span className="text-[16px] font-semibold text-[#344054]">
            19,000원
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            신한(1002-010-555555)
          </span>
          <span className="text-[16px] font-medium text-[#667085]">일시불</span>
        </div>
        <hr />
        <div className="flex gap-3">
          <span className="text-[#344054] font-semibold text-[18px]">
            25.07.31 취소
          </span>
          <span className="text-[#667085] font-medium text-[18px]">
            115023421
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#667085] font-medium text-[16px]">
            취소일자
          </span>
          <span className="text-[16px] font-medium text-[#667085]">
            2025.07.31 13:50:00
          </span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button className="h-[48px] flex-1 bg-[#E6F3FF] text-[#344054] text-[16px] font-medium">
          결제 취소
        </Button>
        <Button className="h-[48px] flex-1 bg-[#F1F5F9] text-[#344054] text-[16px] font-medium">
          문의하기
        </Button>
      </div>
    </div>
  );
};

export default PaymentHistoryCard;
