"use client";
import { useEffect, useState } from "react";
import ScrollPicker from "./scroll-picker";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  className?: string;
}

const TimePicker: React.FC<TimePickerProps> = ({
  value = "08:59",
  onChange,
  className = "",
}) => {
  // 시간 파싱
  const parseTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(":").map(Number);
    const isPM = hour >= 12;
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return { hour: displayHour, minute, isPM };
  };

  const {
    hour: initialHour,
    minute: initialMinute,
    isPM: initialIsPM,
  } = parseTime(value);

  const [selectedHour, setSelectedHour] = useState(initialHour);
  const [selectedMinute, setSelectedMinute] = useState(initialMinute);
  const [isPM, setIsPM] = useState(initialIsPM);

  // value prop이 변경될 때 상태 업데이트
  useEffect(() => {
    const parsed = parseTime(value);
    setSelectedHour(parsed.hour);
    setSelectedMinute(parsed.minute);
    setIsPM(parsed.isPM);
  }, [value]);

  // 옵션 배열 생성
  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 60 }, (_, i) => i); // 0부터 59까지의 숫자 배열
  const periods = ["AM", "PM"];

  // 시간 업데이트
  useEffect(() => {
    const hour24 = isPM
      ? selectedHour === 12
        ? 12
        : selectedHour + 12
      : selectedHour === 12
      ? 0
      : selectedHour;

    const timeString = `${hour24.toString().padStart(2, "0")}:${selectedMinute
      .toString()
      .padStart(2, "0")}`;
    onChange?.(timeString);
  }, [selectedHour, selectedMinute, isPM, onChange]);

  return (
    <div className={`w-full max-w-lg mx-auto ${className}`}>
      <div className="bg-white text-black rounded-3xl overflow-hidden shadow-lg border border-gray-200">
        {/* 메인 스크롤 선택기 */}
        <div className="flex divide-x divide-gray-200">
          {/* 시간 선택기 */}
          <div className="flex-1">
            <ScrollPicker
              items={hours}
              selectedIndex={selectedHour - 1}
              onSelectionChange={(index) => setSelectedHour(hours[index])}
              height={240}
              itemHeight={60}
            />
          </div>

          {/* 분 선택기 */}
          <div className="flex-1">
            <ScrollPicker
              items={minutes.map((m) => m.toString().padStart(2, "0"))} // 표시용으로 포맷팅
              selectedIndex={selectedMinute} // 분 값을 그대로 인덱스로 사용
              onSelectionChange={(index) => setSelectedMinute(minutes[index])} // 인덱스로 실제 분 값 설정
              height={240}
              itemHeight={60}
            />
          </div>

          {/* 오전/오후 선택기 */}
          <div className="flex-1">
            <ScrollPicker
              items={periods}
              selectedIndex={isPM ? 1 : 0}
              onSelectionChange={(index) => setIsPM(index === 1)}
              height={240}
              itemHeight={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePicker;
