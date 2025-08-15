"use client";

import DatePicker from "@/features/event-create/ui/date-picker";
import ThumbnailBox from "@/features/photo-upload/ui/thumbnail-box";
import {
  CreateEvent,
  updateEvent,
  UpdateEvent,
} from "@/features/event-create/api/event-create.api";
import BasicSelect from "@/shared/ui/basic-select";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import TimePicker from "@/features/event-create/ui/time-picker";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import dayjs from "dayjs";
import { parseTime } from "@/features/event-create/utils/event.utils";
import { useUserStore } from "@/features/login/model/store";
import { createEvent } from "@/features/event-create/api/event-create.api";
import { Event } from "@/features/event-viewer/model/types";

type Props = {
  initialEvent?: Event;
  planIdx?: number;
};

const EventCreateForm = ({ initialEvent, planIdx }: Props) => {
  const router = useRouter();

  const initialDate = initialEvent?.eventDt
    ? dayjs(initialEvent.eventDt).format("YYYY.MM.DD")
    : dayjs().format("YYYY.MM.DD");
  const initialTime = initialEvent?.eventDt
    ? dayjs(initialEvent.eventDt).format("HH:mm")
    : dayjs().format("HH:mm");

  const [date, setDate] = useState<string>(initialDate);
  const [time, setTime] = useState<string>(initialTime);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const { user } = useUserStore();

  const handleDatePickerOpen = () => {
    if (isDatePickerOpen) {
      setIsDatePickerOpen(false);
    } else {
      setIsDatePickerOpen(true);
      setIsTimePickerOpen(false);
    }
  };

  const handleTimePickerOpen = () => {
    if (isTimePickerOpen) {
      setIsTimePickerOpen(false);
    } else {
      setIsTimePickerOpen(true);
      setIsDatePickerOpen(false);
    }
  };

  const [event, setEvent] = useState<CreateEvent | UpdateEvent>({
    eventTitle: initialEvent?.eventTitle || "",
    eventCategoryIdx: initialEvent?.eventCategoryIdx || 0,
    eventDt: initialEvent?.eventDt || "",
    location: initialEvent?.location || "",
    eventIntro: initialEvent?.eventIntro || "",
    mainImageUrl: initialEvent?.mainImageUrl || "",
    isGalleryPublic: initialEvent?.isGalleryPublic || "y",
  });

  const createISODateTime = (date: string, time: string) => {
    // "2024.08.15" -> "2024-08-15" 형식으로 변환
    const formattedDate = date.replace(/\./g, "-");
    // ISO 8601 형식으로 변환: YYYY-MM-DDTHH:mm:ss.sssZ
    return dayjs(`${formattedDate} ${time}`, "YYYY-MM-DD HH:mm").toISOString();
  };

  const handleSubmit = async () => {
    try {
      if (initialEvent) {
        const eventData = {
          ...event,
          eventDt: createISODateTime(date, time),
          planIdx,
          qrToken: initialEvent?.qrToken || "",
          shortUrl: initialEvent?.shortUrl || "",
          qrImageUrl: initialEvent?.qrImageUrl || "",
        };
        const response = await updateEvent(eventData, initialEvent?.eventIdx);
      } else {
        const eventData = {
          ...event,
          eventDt: createISODateTime(date, time),
          hostUserIdx: user?.userIdx || 0,
        };
        const response = await createEvent(eventData);
      }
      router.push(`/host/${user?.userIdx}`);
    } catch (error) {
      console.error("error", error);
      alert("이벤트 등록에 실패했습니다.");
    }
  };

  return (
    <div className="px-4 flex flex-col gap-5 bg-[#F2F2F7]">
      <span className="text-[20px] font-semibold pt-10">이벤트 생성</span>
      <ThumbnailBox
        thumbnail={event.mainImageUrl}
        onChange={(fileUrl) => {
          setEvent({ ...event, mainImageUrl: fileUrl });
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
            value={event.eventTitle}
            onChange={(e) => setEvent({ ...event, eventTitle: e.target.value })}
            className="border-none  shadow-none w-[185px] p-0 text-[16px] font-medium"
            placeholder="이벤트 이름을 입력해주세요"
          />
        </div>
        <hr />
        <div className="flex gap-3 items-center justify-between">
          <span className="text-[16px] font-medium">카테고리</span>
          <BasicSelect
            items={[
              { label: "웨딩", value: "1" },
              { label: "여행", value: "2" },
              { label: "파티", value: "3" },
              { label: "기타", value: "4" },
            ]}
            placeholder="카테고리를 선택해주세요."
            className="min-w-[180px]"
            value={event.eventCategoryIdx.toString()}
            onChange={(value) => {
              setEvent({ ...event, eventCategoryIdx: Number(value) });
            }}
          />
        </div>
      </div>
      {/* 이벤트 날짜 / 시간 / 장소 선택 */}
      <div className="flex flex-col gap-2 bg-white rounded-lg px-4 py-2">
        <div className="flex gap-3 items-center justify-between">
          <span className="text-[16px] font-medium">날짜/시간</span>
          <div className="flex gap-2">
            <Button
              className="bg-[#F2F2F7] rounded-lg text-black"
              onClick={handleDatePickerOpen}
            >
              {date}
            </Button>
            <Button
              className="bg-[#F2F2F7] rounded-lg text-black"
              onClick={handleTimePickerOpen}
            >
              {parseTime(time).isPM ? "오후" : "오전"}&nbsp;
              {parseTime(time).formattedHour}:{parseTime(time).formattedMinute}
            </Button>
          </div>
        </div>
        {isDatePickerOpen && (
          <DatePicker
            value={date}
            onChange={(selectedDate) => {
              setDate(selectedDate);
              setIsDatePickerOpen(false);
            }}
          />
        )}
        {isTimePickerOpen && (
          <TimePicker
            value={time}
            onChange={(selectedTime) => {
              setTime(selectedTime);
            }}
          />
        )}
        <hr />
        <div className="flex gap-3 items-center justify-between">
          <span className="text-[16px] font-medium">장소</span>
          <Input
            type="text"
            value={event.location}
            onChange={(e) => setEvent({ ...event, location: e.target.value })}
            className="border-none shadow-none w-[185px] p-0 text-[16px] font-medium"
            placeholder="장소를 입력해주세요"
          />
        </div>
      </div>
      {/* 웰컴 메시지 */}
      <div className="flex flex-col gap-4 bg-white rounded-lg p-4">
        <span className="text-[16px] font-medium">웰컴 메시지</span>
        <Textarea
          className="resize-none h-[160px] border-none shadow-none p-0"
          placeholder="메세지를 작성해주세요."
          value={event.eventIntro}
          onChange={(e) => setEvent({ ...event, eventIntro: e.target.value })}
        />
      </div>
      {/* 갤러리 */}
      <div className="flex bg-white rounded-lg px-4 py-2 justify-between items-center">
        <span className="text-[16px] font-medium">갤러리</span>
        <BasicSelect
          items={[
            { label: "모두에게 공개", value: "y" },
            { label: "나만 보기", value: "n" },
          ]}
          placeholder=""
          initialValue="y"
          className="min-w-[110px]"
          onChange={(value) => {
            setEvent({ ...event, isGalleryPublic: value as "y" | "n" });
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
        <Button
          onClick={handleSubmit}
          className="flex-1 h-[50px] text-[18px] font-semibold text-black bg-white"
        >
          이벤트 등록
        </Button>
      </div>
    </div>
  );
};

export default EventCreateForm;
