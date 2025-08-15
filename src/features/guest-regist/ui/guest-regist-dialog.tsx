"use client";

import { registGuest } from "../api/api";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useGuestRegistStore } from "../model/store";
import { addVisitedEvent, getDeviceId } from "../lib/guest-utils";

const GuestRegistDialog = ({
  eventIdx,
  isOpen,
  onClose,
}: {
  eventIdx: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [name, setName] = useState("");

  const [isAgree, setIsAgree] = useState(false);
  const { setGuest } = useGuestRegistStore();
  const handleRegist = async () => {
    try {
      const response = await registGuest(eventIdx, {
        name,
        deviceId: getDeviceId(),
      });
      console.log(response);
      localStorage.setItem("deviceId", response.deviceId);
      setGuest(response);
      addVisitedEvent(eventIdx);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center font-semibold text-[18px] text-[#344054]">
            게스트 이름
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            className="text-center placeholder:text-[#D0D5DD] placeholder:text-[18px] placeholder:font-medium text-[18px] h-[51px]"
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex justify-between items-center text-[14px] font-medium text-[#667085]">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-[20px] h-[20px]"
                checked={isAgree}
                onChange={(e) => setIsAgree(e.target.checked)}
              />
              (필수) 모두의스냅 서비스 이용약관
            </label>
            <Link
              href={`https://imminent-drop-afd.notion.site/24e5eb23b550800584d9d017dc635da3?pvs=73`}
              target="_blank"
              className="text-[#359EFF] underline cursor-pointer"
            >
              약관 보기
            </Link>
          </div>
          <Button
            onClick={handleRegist}
            className="w-full bg-[#F1F5F9] text-[#344054] rounded-xl h-[50px] text-[18px] font-semibold hover:bg-[#F1F5F9]/90"
            disabled={!isAgree || !name}
          >
            시작하기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuestRegistDialog;
