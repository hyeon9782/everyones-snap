"use client";
import { Button } from "@/shared/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  eventTitle: string;
  qrImageUrl: string;
  shortUrl: string;
};

const EventShareDrawer = ({ eventTitle, qrImageUrl, shortUrl }: Props) => {
  const handleMessageShare = async () => {
    const shareText = `${eventTitle} 이벤트에 초대합니다! ${shortUrl}`;

    try {
      // Web Share API를 지원하는 경우
      if (navigator.share) {
        await navigator.share({
          title: eventTitle,
          text: shareText,
          url: shortUrl,
        });
      } else {
        // Web Share API를 지원하지 않는 경우 SMS 링크 사용
        const smsUrl = `sms:?body=${encodeURIComponent(shareText)}`;
        window.open(smsUrl, "_blank");
      }
    } catch (error) {
      console.error("메시지 공유 실패:", error);
      // 에러 처리 (토스트 메시지 등)
    }
  };

  const handleKakaoShare = () => {
    try {
      if (typeof window !== "undefined" && window.Kakao) {
        window.Kakao.Share.sendDefault({
          objectType: "feed",
          content: {
            title: eventTitle,
            description: `${eventTitle} 이벤트에 초대합니다!`,
            imageUrl: qrImageUrl,
            link: {
              mobileWebUrl: shortUrl,
              webUrl: shortUrl,
            },
          },
          buttons: [
            {
              title: "이벤트 참여하기",
              link: {
                mobileWebUrl: shortUrl,
                webUrl: shortUrl,
              },
            },
          ],
        });
      } else {
        // 카카오 SDK가 없는 경우 카카오톡 URL 스킴 사용
        const kakaoUrl = `https://sharer.kakao.com/talk/friends/picker/link?app_key=${kakaoAppKey}&validation_action=default&validation_params=${encodeURIComponent(
          JSON.stringify({
            link_ver: "4.0",
            template_object: {
              object_type: "text",
              text: `${eventTitle} 이벤트에 초대합니다!\n${shortUrl}`,
              link: {
                web_url: shortUrl,
                mobile_web_url: shortUrl,
              },
            },
          })
        )}`;
        window.open(kakaoUrl, "_blank", "width=500,height=600");
      }
    } catch (error) {
      console.error("카카오톡 공유 실패:", error);
      // 폴백: 카카오톡 웹 공유 페이지로 이동
      const fallbackUrl = `https://accounts.kakao.com/login?continue=https://sharer.kakao.com/talk/friends/picker/link`;
      window.open(fallbackUrl, "_blank");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shortUrl);
  };

  const handleDownloadQR = async () => {
    try {
      const response = await fetch(qrImageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${eventTitle}_QR코드.png`; // 파일명 설정
      document.body.appendChild(link);
      link.click();

      // 메모리 정리
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("QR 코드 다운로드 실패:", error);
      // 에러 처리 (토스트 메시지 등)
    }
  };
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="bg-[#F2F2F7] flex-1 text-black text-[16px] font-semibold h-[48px]">
          <Image src="/images/qr_code.svg" alt="share" width={20} height={20} />
          QR/링크 공유
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>QR/링크 공유</DrawerTitle>
          <DrawerClose asChild className="absolute right-3 top-8">
            <Button variant="ghost" size="icon" className="w-[36px] h-[36px]">
              <X
                style={{ width: "24px", height: "24px" }}
                className="text-black"
              />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-10 p-5">
          <div className="w-full h-[261px] bg-[#F2F2F7] rounded-[20px] flex flex-col gap-4 items-center justify-center">
            <Image src={qrImageUrl} alt="qr_code" width={160} height={160} />
            <div className="text-[18px] font-semibold">{eventTitle}</div>
          </div>
          <div className="flex w-full justify-around">
            <div className="flex flex-col gap-2 items-center">
              <Button
                onClick={handleMessageShare}
                className="w-[48px] h-[48px] bg-[#34C759] rounded-full p-0"
              >
                <Image
                  src="/images/message_white.svg"
                  alt="message"
                  width={23.33}
                  height={21.71}
                />
              </Button>
              <span className="text-[16px] font-medium">메시지</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button
                onClick={handleKakaoShare}
                className="w-[48px] h-[48px] bg-[#FEE500] rounded-full p-0"
              >
                <Image
                  src="/images/kakao_logo.svg"
                  alt="kakao_logo"
                  width={23.33}
                  height={21.71}
                />
              </Button>
              <span className="text-[16px] font-medium">카카오톡</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button
                onClick={handleCopyLink}
                className="w-[48px] h-[48px] bg-[#F2F2F7] rounded-full p-0"
              >
                <Image
                  src="/images/link.svg"
                  alt="link"
                  width={23.33}
                  height={11.67}
                />
              </Button>
              <span className="text-[16px] font-medium">링크 복사</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button
                onClick={handleDownloadQR}
                className="w-[48px] h-[48px] bg-[#F2F2F7] rounded-full p-0"
              >
                <Image
                  src="/images/download.svg"
                  alt="download"
                  width={18.67}
                  height={18.67}
                />
              </Button>
              <span className="text-[16px] font-medium">QR 저장</span>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EventShareDrawer;
