"use client";

import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GuestbookFooter = () => {
  const router = useRouter();

  const handleMessageRegister = () => {
    router.push("/guestbook/write/success");
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 flex gap-3 px-4 pb-[20px] pt-[40px]">
      <Button
        onClick={() => router.back()}
        className="w-[50px] h-[50px] bg-white text-[#344054] rounded-xl"
      >
        <ArrowLeft className="size-6" />
      </Button>
      <Button
        onClick={handleMessageRegister}
        className="flex-1 rounded-xl bg-[#359EFF] text-white h-[50px] text-[18px] font-semibold hover:bg-[#359EFF]/90"
      >
        메시지 등록
      </Button>
    </div>
  );
};

export default GuestbookFooter;
