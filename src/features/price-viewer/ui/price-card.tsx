"use client";
import { Plan } from "../model/types";
import Image from "next/image";
import { Calendar, Download, Folder, Upload } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/features/login/model/store";

const PriceCard = ({ plan }: { plan?: Plan }) => {
  const { user } = useUserStore();
  const router = useRouter();
  const handleBuy = () => {
    if (plan) {
      if (user) {
        router.push(`/payment?planIdx=${plan?.planIdx}`);
      } else {
        router.push("/login");
      }
    } else {
      alert("준비중입니다.");
    }
  };
  return (
    <div className="bg-white rounded-lg px-6 pt-10 pb-5 flex flex-col gap-[28px]">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 items-center">
          {plan && (
            <div className="border border-[#FF6B6B] text-[#FF6B6B] rounded-lg px-2 py-1 text-[14px]">
              오픈 혜택
            </div>
          )}
          <h2 className="text-[32px] font-semibold text-[#344054]">
            {plan?.name ? plan?.name : "엔터프라이즈"}
          </h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          {plan?.originalPrice && plan?.discountRate && (
            <div className="flex gap-2 items-center">
              <span className="text-[20px] font-semibold text-gray-300 line-through">
                {plan?.originalPrice.toLocaleString()}원
              </span>{" "}
              <span className="text-[#FF6B6B] font-semibold text-[18px]">
                {plan?.discountRate}%할인
              </span>
            </div>
          )}
          <span className="text-[#359EFF] text-[28px] font-semibold">
            {plan?.price ? `${plan?.price.toLocaleString()}원` : "가격 협의"}
          </span>
          <span className="text-[16px] font-medium text-[#667085]">
            (모든 항목 협의 가능)
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
          <div className="flex items-center gap-2">
            <Image src="/images/group.svg" alt="guest" width={24} height={24} />
            <span className="text-[#344054] text-[16px] font-medium">
              최대 게스트 수
            </span>
          </div>
          <div className="text-[#344054] text-[16px] font-medium">
            {plan?.guestLimit ? plan?.guestLimit : "제한 없음"}
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
          <div className="flex items-center gap-2">
            <Image src="/images/photo.svg" alt="photo" width={20} height={20} />
            <span className="text-[#344054] text-[16px] font-medium">
              생성 가능한 이벤트
            </span>
          </div>
          <div className="text-[#344054] text-[16px] font-medium">
            {plan?.eventLimit ? `1개` : "협의"}
          </div>
        </div>
        <div className="flex items-start justify-between border-b border-[#EAECF0] pb-3">
          <div className="flex items-center gap-2">
            <Folder className="size-5 " />
            <div className="flex flex-col gap-1">
              <span className="text-[#344054] text-[16px] font-medium">
                최대 업로드 파일 수
              </span>
              {/* <span className="text-[12px] font-medium text-[#667085]">
                (약 {plan.storageGb}GB 제공)
              </span> */}
            </div>
          </div>
          {plan ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/images/photo.svg"
                    alt="photo"
                    width={15}
                    height={15}
                  />
                  <span className="text-[#344054] text-[14px] font-semibold">
                    사진
                  </span>
                </div>
                <span
                  className={cn(
                    "text-[14px] font-semibold",
                    plan?.planIdx === 2 ? "text-[#359EFF]" : "text-[#344054]"
                  )}
                >
                  {plan?.photoLimit.toLocaleString()}장
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/images/play_circle.svg"
                    alt="play_circle"
                    width={15}
                    height={15}
                  />
                  <span className="text-[#344054] text-[14px] font-semibold">
                    동영상
                  </span>
                </div>
                <span
                  className={cn(
                    "text-[14px] font-semibold",
                    plan?.planIdx === 2 ? "text-[#359EFF]" : "text-[#344054]"
                  )}
                >
                  {plan?.videoLimit.toLocaleString()}개
                </span>
              </div>
              <span className="text-[12px] font-medium text-[#667085]">
                (개당, 최대 300mb <br /> 5분 가량의 동영상)
              </span>
            </div>
          ) : (
            <span className="text-[#344054] text-[16px] font-medium">협의</span>
          )}
        </div>
        <div className="flex items-start justify-between border-b border-[#EAECF0] pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="size-5" />
            <span className="text-[#344054] text-[16px] font-medium">
              사용 기간
            </span>
          </div>
          {plan ? (
            <div className="flex flex-col items-end gap-1">
              <div className="flex items-center gap-1.5">
                <div className="flex gap-[2px] items-center">
                  <div className="flex justify-center items-center w-[20px] h-[20px]">
                    <Upload className="size-4 text-[#344054]" />
                  </div>
                  <span className="text-[#344054] text-[14px] font-semibold">
                    업로드
                  </span>
                </div>
                <span className="text-[#344054] text-[14px] font-semibold">
                  이벤트일 <b>전후 1개월</b>
                </span>
              </div>
              <div className="flex items-center gap-1">
                <div className="flex gap-[2px] items-center">
                  <div className="flex justify-center items-center w-[20px] h-[20px]">
                    <Download className="size-4 text-[#344054]" />
                  </div>
                  <span className="text-[#344054] text-[14px] font-semibold">
                    다운로드
                  </span>
                </div>
                <span className="text-[#344054] text-[14px] font-semibold">
                  이벤트일 <b>후 3개월</b>
                </span>
              </div>
              <span className="text-[12px] font-medium text-[#667085]">
                (3개월 이후 자동 삭제)
              </span>
            </div>
          ) : (
            <span className="text-[#344054] text-[16px] font-medium">협의</span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-[#EAECF0] pb-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/checkbook.svg"
              alt="checkbook"
              width={24}
              height={24}
            />
            <span className="text-[#344054] text-[16px] font-medium">
              방명록
            </span>
          </div>
          <div className="text-[#344054] text-[16px] font-medium">제공</div>
        </div>
        <div className="flex items-center justify-between pb-3">
          <div className="flex items-center gap-2">
            <Image
              src="/images/qr_code.svg"
              alt="qr_code"
              width={20}
              height={20}
            />
            <span className="text-[#344054] text-[16px] font-medium">
              QR코드 템플릿
            </span>
          </div>
          {plan ? (
            <div className="text-[#344054] text-[16px] font-medium">
              기본 템플릿 제공
            </div>
          ) : (
            <span className="text-[#344054] text-[16px] font-medium">
              커스텀 템플릿 가능
            </span>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          className={cn(
            "w-full rounded-xl h-[53px] flex items-center justify-center font-semibold text-[16px]",
            plan?.planIdx === 2
              ? "bg-[#359EFF] text-white"
              : "bg-white text-[#359EFF] border border-[#359EFF]"
          )}
          onClick={handleBuy}
        >
          {plan ? "구매하기" : "도입 문의"}
        </Button>
      </div>
    </div>
  );
};

export default PriceCard;
