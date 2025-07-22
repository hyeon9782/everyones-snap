"use client";

import DatePicker from "@/features/event-create/ui/date-picker";
import ThumbnailBox from "@/features/photo-upload/ui/thumbnail-box";
import BasicSelect from "@/shared/ui/basic-select";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import TimePicker from "@/shared/ui/time-picker";
import { CalendarIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EventCreatePage = () => {
  const router = useRouter();

  return (
    <main className="px-4 flex flex-col gap-5 bg-[#F2F2F7]">
      <span className="text-[20px] font-semibold pt-10">이벤트 생성</span>
      <ThumbnailBox
        // thumbnail="https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/f29be00f-6783-4d15-b0d3-c6745c06f2a9.jpg"
        onChange={(file) => {
          console.log(file);
        }}
      />
      {/* 이벤트 이름 / 카테고리 선택 */}
      <div className="flex flex-col gap-2 bg-white rounded-lg px-4 py-2">
        <div className="flex gap-3 items-center justify-between">
          <label className="text-[16px] font-medium" htmlFor="eventName">
            이벤트 이름
          </label>
          <Input
            type="text"
            id="eventName"
            className="border-none  shadow-none w-[185px] p-0 text-[16px] font-medium"
            placeholder="이벤트 이름을 입력해주세요"
          />
        </div>
        <hr />
        <div className="flex gap-3 items-center justify-between">
          <span className="text-[16px] font-medium">카테고리</span>
          <BasicSelect
            items={[
              { label: "웨딩", value: "wedding" },
              { label: "여행", value: "travel" },
              { label: "파티", value: "party" },
              { label: "행사", value: "event" },
              { label: "기타", value: "etc" },
            ]}
            placeholder="카테고리를 선택해주세요."
            className="min-w-[180px]"
            onChange={(value) => {
              console.log(value);
            }}
          />
        </div>
      </div>
      {/* 이벤트 날짜 / 시간 / 장소 선택 */}
      <div className="flex flex-col gap-2 bg-white rounded-lg px-4 py-2">
        <div className="flex gap-3 items-center">
          <span className="text-[16px] font-medium">날짜/시간</span>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <CalendarIcon className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ClockIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div>
          <DatePicker />
          <TimePicker />
        </div>
        <hr />
        <div className="flex gap-3 items-center justify-between">
          <span className="text-[16px] font-medium">장소</span>
        </div>
      </div>
      {/* 웰컴 메시지 */}
      <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
        <span className="text-[16px] font-medium">웰컴 메시지</span>
        <Textarea
          className="resize-none h-[160px] border-none shadow-none p-0"
          placeholder="메세지를 작성해주세요."
        />
      </div>
      {/* 갤러리 */}
      <div className="flex bg-white rounded-lg px-4 py-2 justify-between items-center">
        <span className="text-[16px] font-medium">갤러리</span>
        <BasicSelect
          items={[
            { label: "모두에게 공개", value: "public" },
            { label: "나만 보기", value: "private" },
          ]}
          placeholder=""
          initialValue="public"
          className="min-w-[110px]"
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
      {/* 이벤트 등록 */}
      <div className="flex gap-3 items-center ">
        <Button
          onClick={() => router.back()}
          className="bg-white p-3 w-[50px] h-[50px]"
        >
          <Image
            src="/images/left-arrow.svg"
            alt="back"
            width={24}
            height={24}
          />
        </Button>
        <Button className="flex-1 h-[50px] text-[18px] font-semibold text-black bg-white">
          이벤트 등록
        </Button>
      </div>
    </main>
  );
};

export default EventCreatePage;
