"use client";

import { Button } from "@/shared/ui/button";
import { ArrowLeft, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const GuestbookFooter = ({
  eventIdx,
  qrToken,
}: {
  eventIdx: number;
  qrToken: string;
}) => {
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center h-[72px] w-full bg-white gap-2 px-4 md:w-[375px] mx-auto">
      <Button
        onClick={() => router.back()}
        className="w-[48px] h-[48px] bg-[#F1F5F9] rounded-xl"
      >
        <ArrowLeft className="text-[#344054] size-5" />
      </Button>
      <Link
        href={`/gallery/${qrToken}?eventIdx=${eventIdx}`}
        className="flex-1 flex items-center justify-center gap-2 bg-[#F1F5F9] rounded-xl h-[48px] text-[16px] font-semibold text-[#344054]"
      >
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <Image
            src="/images/gallery.svg"
            alt="gallery"
            width={18}
            height={18}
          />
        </div>
        갤러리
      </Link>
      <Link
        href={`/guestbook/write?eventIdx=${eventIdx}&qrToken=${qrToken}`}
        className="flex-1 flex items-center justify-center gap-2 bg-[#F1F5F9] rounded-xl h-[48px] text-[16px] font-semibold text-[#344054]"
      >
        <div className="w-[24px] h-[24px] flex items-center justify-center">
          <Edit className="size-5" />
        </div>
        글쓰기
      </Link>
    </div>
  );
};

export default GuestbookFooter;
