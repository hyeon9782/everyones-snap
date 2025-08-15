"use client";

import { useUserStore } from "@/features/login/model/store";
import { getOrder } from "@/features/payment-viewer/api/api";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentSuccessPage = () => {
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
            {order?.amount.toLocaleString()}원
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <span className="text-center font-medium text-[16px] text-[#344054]">
          나의 이벤트에서 이벤트를 생성하여 <br /> 바로 이용해보세요.
        </span>
        <Link
          href={`/host/${user?.userIdx}`}
          className="w-full rounded-xl h-[53px] bg-[#359EFF] flex items-center justify-center text-white font-semibold text-[20px]"
        >
          나의 이벤트로 이동
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
