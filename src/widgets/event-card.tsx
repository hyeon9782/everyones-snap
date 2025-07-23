import EventButtonBox from "@/features/event-viewer/ui/event-button-box";
import Image from "next/image";

type Props = {
  isHost: boolean;
};

const EventCard = ({ isHost }: Props) => {
  return (
    <article className="bg-white rounded-lg h-[626px]">
      <Image
        src="https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/f29be00f-6783-4d15-b0d3-c6745c06f2a9.jpg"
        alt="event-card-thumbnail"
        width={100}
        height={100}
        className="w-full h-[228px] object-cover rounded-t-lg"
      />
      <div className="p-5 flex flex-col gap-[32px]">
        <div className="flex flex-col gap-5 text-center">
          <div className="flex flex-col gap-2">
            <span className="text-[16px] font-medium">2025.05.25</span>
            <span className="text-[22px] font-semibold">
              김진우❤️이도희 결혼식
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
                  신라호텔 다이너스티홀
                </span>
              </div>
              <div className="flex gap-1">
                <Image
                  src="/images/alarm.svg"
                  alt="alarm"
                  width={17.04}
                  height={16.02}
                />
                <span className="text-[16px] font-medium">10:00</span>
              </div>
            </div>
          </div>
          <div className="text-[14px] font-medium">
            웨딩 본식 끝나고 바로 올라온 사진 덕분에 감동이 두 배였어요! 웨딩
            본식 끝나고 바로 올라온 사진 덕분에 감동이 두 배였어요! 웨딩 본식
            끝나고 바로 올라온 사진 덕분에 감동이 두 배였어요! 웨딩 본식 끝나고
            바로 올라온 사진 덕분에 감동이 두 배였어요!
          </div>
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
        <EventButtonBox isHost={isHost} />
      </div>
    </article>
  );
};

export default EventCard;
