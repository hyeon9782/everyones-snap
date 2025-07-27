// 시간 파싱
export const parseTime = (timeStr: string) => {
  const [hour, minute] = timeStr.split(":").map(Number);
  const isPM = hour >= 12;
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const formattedHour = displayHour.toString().padStart(2, "0");
  const formattedMinute = minute.toString().padStart(2, "0");
  return { hour: displayHour, minute, isPM, formattedHour, formattedMinute };
};
