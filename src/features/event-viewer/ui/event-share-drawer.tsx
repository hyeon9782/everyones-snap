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

const EventShareDrawer = () => {
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
            <Image
              src="/images/qr_code.svg"
              alt="qr_code"
              width={160}
              height={160}
            />
            <div className="text-[18px] font-semibold">
              김진우 이도희 결혼식
            </div>
          </div>
          <div className="flex w-full justify-around">
            <div className="flex flex-col gap-2 items-center">
              <Button className="w-[48px] h-[48px] bg-[#34C759] rounded-full">
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
              <Button className="w-[48px] h-[48px] bg-[#FEE500] rounded-full">
                <Image
                  src="/images/kakao_logo.svg"
                  alt="kakao_logo"
                  width={28}
                  height={28}
                />
              </Button>
              <span className="text-[16px] font-medium">카카오톡</span>
            </div>
            <div className="flex flex-col gap-2 items-center">
              <Button className="w-[48px] h-[48px] bg-[#F2F2F7] rounded-full">
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
              <Button className="w-[48px] h-[48px] bg-[#F2F2F7] rounded-full">
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
