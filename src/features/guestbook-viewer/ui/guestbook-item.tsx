"use client";

import { cn } from "@/shared/lib";
import { Guestbook } from "../model/types";
import dayjs from "dayjs";
import GuestbookMorePopup from "./guestbook-more-popup";

const GuestbookItem = ({ guestbook }: { guestbook: Guestbook }) => {
  return (
    <div
      className={cn(
        `flex flex-col gap-2 rounded-lg text-[#344054] font-medium text-[14px] px-[28px] py-[32px] bg-gradient-to-b ${guestbook.backgroundColor} ${guestbook.font}`
      )}
    >
      <p className="text-[14px] font-medium">{guestbook.content}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p>{dayjs(guestbook.createDt).format("YYYY.MM.DD")}</p>
          <p>{guestbook.guestName}</p>
        </div>
        <GuestbookMorePopup visitorNoteIdx={guestbook.visitorNoteIdx} />
      </div>
    </div>
  );
};

export default GuestbookItem;
