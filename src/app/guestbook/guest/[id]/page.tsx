import { getGuestbook } from "@/features/guestbook-viewer/api/api";
import GuestbookFooter from "@/features/guestbook-viewer/ui/guestbook-footer";
import GuestbookItem from "@/features/guestbook-viewer/ui/guestbook-item";
import { CircleAlert, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const GuestbookGuestPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ guestName: string; qrToken: string }>;
}) => {
  const { id } = await params;
  const { guestName, qrToken } = await searchParams;

  const guestbook = await getGuestbook(Number(id));

  const filteredGuestbook = guestbook.filter(
    (guestbook) => guestbook.guestName === guestName
  );

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
      {filteredGuestbook ? (
        <>
          <span className="text-[16px] font-semibold text-[#667085]">
            내가 작성한 글
          </span>
          <div className="flex flex-col gap-5">
            {filteredGuestbook.map((guestbook) => (
              <GuestbookItem
                key={guestbook.visitorNoteIdx}
                guestbook={guestbook}
                qrToken={qrToken}
              />
            ))}
          </div>
        </>
      ) : (
        <div>
          <div className="rounded-lg bg-[#F1F5F9] h-[128px] w-full pl-5 py-3 pr-3">
            <span className="text-[16px] font-medium text-[#344054]">
              신랑신부에게 전하고 싶은 <br />
              진심 어린 축하 메시지를 남겨주세요. <br />
              당신의 따뜻한 한마디가 <br />
              평생 기억될 소중한 선물이 될거에요.
            </span>
          </div>
          <div className="flex items-center h-[220px] gap-2 justify-center">
            <CircleAlert className="size-5 text-[#C7C7CC]" />
            <span className="text-[16px] font-semibold text-[#C7C7CC]">
              아직 작성한 메시지가 없어요
            </span>
          </div>
        </div>
      )}
      <GuestbookFooter eventIdx={Number(id)} qrToken={qrToken} />
    </div>
  );
};

export default GuestbookGuestPage;
