import EventButtonBox from "@/features/event-viewer/ui/event-button-box";
import { Event } from "@/entities/event/model/event.types";
import Image from "next/image";
import dayjs from "dayjs";

type Props = {
  isHost: boolean;
  event: Event;
};

const EventCard = ({ isHost, event }: Props) => {
  return (
    <article className="bg-white rounded-lg h-[626px]">
      <Image
        src={event.mainImageUrl}
        alt="event-card-thumbnail"
        width={375}
        height={228}
        className="w-full h-[228px] object-cover rounded-t-lg"
      />
      <div className="p-5 flex flex-col gap-[32px]">
        <div className="flex flex-col gap-5 text-center">
          <div className="flex flex-col gap-2">
            <span className="text-[16px] font-medium">
              {dayjs(event.eventDt).format("YYYY.MM.DD")}
            </span>
            <span className="text-[22px] font-semibold">
              {event.eventTitle}
            </span>
            <div className="flex gap-3 justify-center">
              <div className="flex gap-1">
                <Image
                  src="/images/location_on.svg"
                  alt="location"
                  width={13.33}
                  height={16.1}
                />
                <span className="text-[16px] font-medium">
                  {event.location}
                </span>
              </div>
              <div className="flex gap-1">
                <Image
                  src="/images/alarm.svg"
                  alt="alarm"
                  width={17.04}
                  height={16.02}
                />
                <span className="text-[16px] font-medium">
                  {event.eventDt.split("T")[1].split(":")[0]}:
                  {event.eventDt.split("T")[1].split(":")[1]}
                </span>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-medium">{event.eventIntro}</div>
        </div>
        {isHost && (
          <div className="flex gap-[10px] w-full justify-center items-center">
            <div className="flex gap-1 items-center">
              <Image
                src="/images/group.svg"
                alt="group"
                width={14}
                height={14}
              />
              <span className="text-[16px] font-medium">24</span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src="/images/photo.svg"
                alt="photo"
                width={16.67}
                height={16.67}
              />
              <span className="text-[16px] font-medium">172</span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src="/images/play_circle.svg"
                alt="play_circle"
                width={16.67}
                height={16.67}
              />
              <span className="text-[16px] font-medium">20</span>
            </div>
            <div className="flex gap-1 items-center">
              <Image
                src="/images/message.svg"
                alt="message"
                width={17.5}
                height={16.28}
              />
              <span className="text-[16px] font-medium">24</span>
            </div>
          </div>
        )}
        <EventButtonBox isHost={isHost} event={event} />
      </div>
    </article>
  );
};

export default EventCard;
