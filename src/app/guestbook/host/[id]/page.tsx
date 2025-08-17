import { getGuestbook } from "@/features/guestbook-viewer/api/api";
import GuestbookItem from "@/features/guestbook-viewer/ui/guestbook-item";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GuestbookHostPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const guestbook = await getGuestbook(Number(id));

  return (
    <div className="h-screen flex flex-col gap-5 px-4 pt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-semibold text-[#344054]">방명록</h1>
        <Link
          href={`/guestbook/write?eventIdx=${id}`}
          className="flex items-center justify-center bg-[#F1F5F9] rounded-full w-[36px] h-[36px]"
        >
          <Image src="/images/edit.svg" alt="edit" width={15.81} height={15} />
        </Link>
      </div>
      <span className="text-[16px] font-semibold text-[#667085]">
        {guestbook.length}개의 메시지가 있어요
      </span>
      <div className="flex flex-col gap-5">
        {guestbook.map((guestbook) => (
          <GuestbookItem key={guestbook.visitorNoteIdx} guestbook={guestbook} />
        ))}
      </div>
    </div>
  );
};

export default GuestbookHostPage;
