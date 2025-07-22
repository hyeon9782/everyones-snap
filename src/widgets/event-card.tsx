import { Button } from "@/shared/ui/button";
import Image from "next/image";
import Link from "next/link";

const EventCard = () => {
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
      </div>
    </article>
  );
};

export default EventCard;
