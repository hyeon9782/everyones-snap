import { getGuestbook } from "@/features/guestbook-viewer/api/api";
import GuestbookFooter from "@/features/guestbook-viewer/ui/guestbook-footer";
import GuestbookItem from "@/features/guestbook-viewer/ui/guestbook-item";
import { CircleAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GuestbookHostPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ qrToken: string }>;
}) => {
  const { id } = await params;
  const { qrToken } = await searchParams;

  const guestbook = await getGuestbook(Number(id));

  return (
    <div className="h-screen flex flex-col gap-5 px-4 pt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-semibold text-[#344054]">방명록</h1>
        <Link
          href={`/guestbook/write?eventIdx=${id}&qrToken=${qrToken}`}
          className="flex items-center justify-center bg-[#F1F5F9] rounded-full w-[36px] h-[36px]"
        >
          <Image src="/images/edit.svg" alt="edit" width={15.81} height={15} />
        </Link>
      </div>
      {guestbook.length > 0 ? (
        <span className="text-[16px] font-semibold text-[#667085]">
          {guestbook.length}개의 메시지가 있어요
        </span>
      ) : (
        <div className="flex items-center h-[364px] gap-2 justify-center">
          <CircleAlert className="size-5 text-[#C7C7CC]" />
          <span className="text-[16px] font-semibold text-[#C7C7CC]">
            아직 작성된 메시지가 없어요
          </span>
        </div>
      )}
      <div className="flex flex-col gap-5">
        {guestbook.map((guestbook) => (
          <GuestbookItem
            key={guestbook.visitorNoteIdx}
            guestbook={guestbook}
            qrToken={qrToken}
          />
        ))}
      </div>
      <GuestbookFooter eventIdx={Number(id)} qrToken={qrToken} />
    </div>
  );
};

export default GuestbookHostPage;
