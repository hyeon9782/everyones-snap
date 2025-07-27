"use client";
import { Calendar } from "@/shared/ui/calendar";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

type Props = {
  value: string;
  onChange: (date: string) => void;
};

const DatePicker = ({ value, onChange }: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? dayjs(value, "YYYY.MM.DD").toDate() : undefined
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = dayjs(date).format("YYYY.MM.DD");
      onChange(formattedDate);
    }
  };

  return (
    <div className="bg-white w-full">
      <Calendar
        className="w-full h-[324px]"
        mode="single"
        selected={selectedDate}
        onSelect={handleDateSelect}
        weekStartsOn={1} // 월요일부터 시작
        formatters={{
          formatWeekdayName: (date) => {
            const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
            return weekdays[date.getDay()];
          },
          formatCaption: (date) => {
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            return `${year}년 ${month}월`;
          },
          formatMonthDropdown: (date) => {
            const month = date.getMonth() + 1;
            return `${month}월`;
          },
          formatYearDropdown: (date) => {
            return `${date.getFullYear()}년`;
          },
        }}
      />
    </div>
  );
};

export default DatePicker;
