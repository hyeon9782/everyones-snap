import { Button } from "@/shared/ui/button";
import EventMorePopup from "./event-more-popup";
import EventShareDrawer from "./event-share-drawer";
import { Event } from "@/entities/event/model/event.types";
import React from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  isHost: boolean;
  event: Event;
};

const EventButtonBox = ({ isHost, event }: Props) => {
  return (
    <div>
      {isHost ? (
        <div className="flex gap-2">
          <EventShareDrawer
            eventTitle={event.eventTitle}
            qrImageUrl={event.qrImageUrl}
            shortUrl={event.shortUrl}
          />
          <Link
            href={`/gallery/${event.qrToken}?eventIdx=${event.eventIdx}`}
            className="bg-[#F2F2F7] w-[119px] flex gap-2 items-center justify-center text-black text-[16px] font-semibold h-[48px] rounded-lg"
          >
            <Image
              src="/images/gallery.svg"
              alt="gallery"
              width={18}
              height={18}
            />
            갤러리
          </Link>

          <EventMorePopup eventId={event.eventIdx} event={event} />
        </div>
      ) : (
        <div className="flex gap-3">
          <Link
            href={`/gallery/${event.qrToken}?eventIdx=${event.eventIdx}`}
            className="flex-1 flex gap-2 px-4 items-center justify-center rounded-lg bg-[#F2F2F7] text-black  h-[48px] whitespace-nowrap"
          >
            <Image
              src="/images/gallery.svg"
              alt="gallery"
              width={18}
              height={18}
            />
            <span className="text-[16px] font-medium">갤러리 보기</span>
          </Link>
          <Link
            href={`/guestbook/${event.eventIdx}`}
            className="flex-1 flex gap-2 px-4 items-center justify-center rounded-lg bg-[#F2F2F7] text-black  h-[48px] whitespace-nowrap"
          >
            <Image
              src="/images/checkbook.svg"
              alt="checkbook"
              width={21.02}
              height={16}
            />
            <span className="text-[16px] font-medium">메시지 남기기</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventButtonBox;
