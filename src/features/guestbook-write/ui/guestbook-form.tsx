"use client";

import React, { useState } from "react";
import BackgroundSelector from "./background-selector";
import { Textarea } from "@/shared/ui/textarea";
import BasicSelect from "@/shared/ui/basic-select";

const GuestbookForm = ({
  initialBackground = "from-[#FDD7DE] to-[#C8E1FD]",
  initialFont = "나눔명조",
}: {
  initialBackground?: string;
  initialFont?: string;
}) => {
  const [background, setBackground] = useState<string>(initialBackground);
  const [font, setFont] = useState<string>(initialFont);

  return (
    <div className="flex flex-col gap-5">
      <Textarea
        className={`rounded-2xl px-[28px] py-[32px] resize-none h-[312px] bg-gradient-to-b ${background}`}
        placeholder="메시지를 작성해주세요."
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
              value: "나눔명조",
            },
            {
              label: "나눔바른펜",
              value: "나눔바른펜",
            },
          ]}
          className="w-fit max-h-[24px]"
          value={font}
          onChange={(value) => setFont(value)}
          placeholder="폰트를 선택해주세요."
        />
      </div>
    </div>
  );
};

export default GuestbookForm;
