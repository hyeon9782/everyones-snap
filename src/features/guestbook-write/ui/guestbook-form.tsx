"use client";

import React, { useState } from "react";
import BackgroundSelector from "./background-selector";
import { Textarea } from "@/shared/ui/textarea";
import BasicSelect from "@/shared/ui/basic-select";

import { updateGuestbook, useWriteGuestbookMutation } from "../api/api";
import { useGuestRegistStore } from "@/features/guest-regist/model/store";
import { Button } from "@/shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const GuestbookForm = ({
  initialBackground,
  initialFont,
  eventIdx,
  visitorNoteIdx,
  initialContent,
}: {
  initialBackground?: string;
  initialFont?: string;
  eventIdx: number;
  visitorNoteIdx?: number;
  initialContent?: string;
}) => {
  const { mutateAsync: writeGuestbook, isPending } =
    useWriteGuestbookMutation();

  const { guest } = useGuestRegistStore();
  const router = useRouter();

  const [background, setBackground] = useState<string>(
    initialBackground ?? "from-[#FDD7DE] to-[#C8E1FD]"
  );
  const [font, setFont] = useState<string>(initialFont ?? "font-myeongjo");
  const [content, setContent] = useState<string>(initialContent ?? "");

  const handleWriteGuestbook = async () => {
    try {
      if (initialContent) {
        const res = await updateGuestbook(visitorNoteIdx ?? 0, {
          content,
          font,
          backgroundColor: background,
          fontColor: "#000000",
        });
      } else {
        const res = await writeGuestbook({
          eventIdx,
          guestName: guest?.name ?? "",
          content,
          fontColor: "#000000",
          backgroundColor: background,
          font,
        });
      }

      router.push(`/guestbook/guest/${eventIdx}?guestName=${guest?.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-5">
        <Textarea
          className={`rounded-2xl px-[28px] py-[32px] resize-none h-[312px] bg-gradient-to-b ${background}`}
          placeholder="메시지를 작성해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <BackgroundSelector
          background={background}
          setBackground={setBackground}
        />
        <div className="flex justify-between items-center bg-white rounded-lg px-4 py-3">
          <h2 className="text-[16px] font-medium text-[#344054]">폰트</h2>
          <BasicSelect
            items={[
              {
                label: "나눔명조",
                value: "font-myeongjo",
              },
              {
                label: "나눔바른펜",
                value: "font-barunpen",
              },
            ]}
            className="w-fit max-h-[24px]"
            value={font}
            onChange={(value) => setFont(value)}
            placeholder="폰트를 선택해주세요."
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex gap-3 px-4 pb-[20px] pt-[40px] w-full md:w-[375px] mx-auto">
        <Button
          onClick={() => router.back()}
          className="w-[50px] h-[50px] bg-white text-[#344054] rounded-xl"
        >
          <ArrowLeft className="size-6" />
        </Button>
        <Button
          onClick={handleWriteGuestbook}
          disabled={isPending}
          className="flex-1 rounded-xl bg-[#359EFF] text-white h-[50px] text-[18px] font-semibold hover:bg-[#359EFF]/90"
        >
          {isPending ? "등록중..." : "메시지 등록"}
        </Button>
      </div>
    </>
  );
};

export default GuestbookForm;
