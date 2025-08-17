import { getGuestbook } from "@/features/guestbook-viewer/api/api";
import GuestbookItem from "@/features/guestbook-viewer/ui/guestbook-item";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GuestbookGuestPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ guestName: string }>;
}) => {
  const { id } = await params;
  const { guestName } = await searchParams;

  const guestbook = await getGuestbook(Number(id));

  const filteredGuestbook = guestbook.find(
    (guestbook) => guestbook.guestName === guestName
  );

  console.log("filteredGuestbook", filteredGuestbook);
  console.log("guestbook", guestbook);
  console.log("guestName", guestName);

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
      <div>
        <span className="text-[16px] font-semibold text-[#667085]">
          내가 작성한 글
        </span>
      </div>
      <div className="flex flex-col gap-5">
        {filteredGuestbook && <GuestbookItem guestbook={filteredGuestbook} />}
      </div>
    </div>
  );
};

export default GuestbookGuestPage;
