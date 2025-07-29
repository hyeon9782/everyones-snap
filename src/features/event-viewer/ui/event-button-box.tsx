import { Button } from "@/shared/ui/button";
import EventMorePopup from "./event-more-popup";
import EventShareDrawer from "./event-share-drawer";
import { Event } from "@/entities/event/model/event.types";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

type Props = {
  isHost: boolean;
  event: Event;
};

const EventButtonBox = ({ isHost, event }: Props) => {
  const now = dayjs();
  const end =
    now.isAfter(dayjs(event.uploadAvailableFrom)) &&
    now.isBefore(dayjs(event.uploadAvailableUntil));

  return (
    <div>
      {isHost ? (
        <div className="flex gap-2">
          {!end ? (
            <Link
              href={`/gallery/${event.qrToken}`}
              className="bg-[#F2F2F7] flex-1 flex gap-2 items-center justify-center text-black text-[16px] font-semibold h-[48px] rounded-lg"
            >
              <Image
                src="/images/gallery.svg"
                alt="gallery"
                width={18}
                height={18}
              />
              갤러리 보기
            </Link>
          ) : (
            <EventShareDrawer
              eventTitle={event.eventTitle}
              qrImageUrl={event.qrImageUrl}
              shortUrl={event.shortUrl}
            />
          )}
          <EventMorePopup eventId={event.eventIdx} event={event} />
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <Button className="bg-[#F2F2F7] text-black text-[16px] font-semibold h-[48px]">
            <Image
              src="/images/upload_photo.svg"
              alt="upload"
              width={22}
              height={20}
            />
            사진/영상 업로드
          </Button>
          <div className="flex gap-3">
            <Link
              href="/gallery/1"
              className="flex-1 flex gap-2 px-4 items-center justify-center rounded-lg bg-[#F2F2F7] text-black text-[16px] font-semibold h-[48px]"
            >
              <Image
                src="/images/gallery.svg"
                alt="gallery"
                width={18}
                height={18}
              />
              갤러리 보기
            </Link>
            <Button className="flex-1 bg-[#F2F2F7] text-black text-[16px] font-semibold h-[48px]">
              <Image
                src="/images/checkbook.svg"
                alt="checkbook"
                width={21.02}
                height={16}
              />
              메시지 남기기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventButtonBox;
