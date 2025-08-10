"use client";

import { useUserStore } from "@/features/login/model/store";
import { usePayment } from "@/features/payment/model/hooks";
import { usePlans } from "@/features/price-viewer";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React from "react";

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const planIdx = searchParams.get("planIdx");
  const { data: plans } = usePlans();

  const { user } = useUserStore();

  const plan = plans?.find((plan) => plan.planIdx === Number(planIdx));

  console.log("plan", plan);

  const {
    processPayment,
    isLoading: isPaymentLoading,
    error: paymentError,
    currentStep,
    reset,
  } = usePayment();

  const handlePayment = () => {
    processPayment({
      planIdx: plan?.planIdx ?? 0,
      productName: plan?.name ?? "",
      amount: plan?.price ?? 0,
      userIdx: user?.userIdx,
    });
  };

  return (
    <div className="bg-[#F1F5F9] h-screen flex flex-col gap-10 px-4 py-10">
      <div className="flex flex-col gap-4">
        {/* 주문 상품 정보 */}
        <div className="bg-white rounded-lg p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-[18px] text-[#344054]">
            주문 상품 정보
          </h2>
          <hr />
          <div className="flex gap-4">
            <div className="w-[60px] h-[60px] bg-[#359EFF] flex items-center justify-center rounded-lg">
              <Image
                src="/images/basic-plan.svg"
                alt="basic_plan"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[18px] text-[#344054] font-medium">
                모두의스냅 이용권
              </span>
              <span className="text-[18px] text-[#344054] font-semibold">
                {plan?.name}
              </span>
            </div>
          </div>
        </div>
        {/* 주문자 정보 */}
        <div className="bg-white rounded-lg p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-[18px] text-[#344054]">
            주문자 정보
          </h2>
          <hr />
          <div className="flex justify-between items-center">
            <span className="text-[#344054] font-medium text-[18px]">
              이메일
            </span>
            <Input
              className="w-[170px] border-none shadow-none h-[21px]"
              placeholder="이메일을 입력해주세요."
            />
          </div>
        </div>
        {/* 총 결제 금액 */}
        <div className="bg-white rounded-lg p-5 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-[#344054] font-semibold text-[18px]">
              총 결제 금액
            </span>
            <span className="text-[#344054] font-semibold text-[18px]">
              {plan?.price.toLocaleString()}원
            </span>
          </div>
        </div>
        {/* 결제 수단*/}
        <div className="bg-white rounded-lg p-5 flex flex-col gap-4">
          <h2 className="font-semibold text-[18px] text-[#344054]">
            결제 수단
          </h2>
          <hr />
          <div className="flex gap-2 items-center">
            <input type="radio" id="kakao" className="w-[20px] h-[20px]" />
            <label
              htmlFor="kakao"
              className="text-[18px] font-medium text-[#344054]"
            >
              카카오페이
            </label>
          </div>
        </div>
        {/* 약관 동의 */}
        <div className="bg-white rounded-lg p-5 flex gap-2 items-center">
          <input type="checkbox" id="agree" className="w-[20px] h-[20px]" />
          <label htmlFor="agree" className="flex items-center gap-2">
            <span className="text-[16px] font-bold text-[#344054]">필수</span>
            <span className="text-[16px] font-medium text-[#344054]">
              결제 정보 확인 및 정보 제공 동의
            </span>
          </label>
        </div>
      </div>
      <Button
        className="w-full rounded-xl h-[53px] bg-[#359EFF] flex items-center justify-center text-white font-semibold text-[20px]"
        onClick={handlePayment}
      >
        결제하기
      </Button>
    </div>
  );
};

export default PaymentPage;
