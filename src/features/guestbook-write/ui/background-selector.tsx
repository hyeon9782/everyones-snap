"use client";

import { cn } from "@/shared/lib/utils";

const BackgroundSelector = ({
  background,
  setBackground,
}: {
  background: string;
  setBackground: (background: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-3 p-4 bg-white rounded-lg">
      <h2 className="text-[16px] font-medium text-[#344054]">배경 색상</h2>
      <div className="flex items-center justify-between">
        <button
          className={cn(
            "w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#FDD7DE] to-[#C8E1FD]",
            background === "from-[#FDD7DE] to-[#C8E1FD]"
              ? "border-2 border-[#359EFF]"
              : "border-none"
          )}
          onClick={() => setBackground("from-[#FDD7DE] to-[#C8E1FD]")}
        ></button>
        <button
          className={cn(
            "w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#9DD8DC] to-[#FAECBE]",
            background === "from-[#9DD8DC] to-[#FAECBE]"
              ? "border-2 border-[#359EFF]"
              : "border-none"
          )}
          onClick={() => setBackground("from-[#9DD8DC] to-[#FAECBE]")}
        ></button>
        <button
          className={cn(
            "w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#FEF0B6] to-[#DDD1FD]",
            background === "from-[#FEF0B6] to-[#DDD1FD]"
              ? "border-2 border-[#359EFF]"
              : "border-none"
          )}
          onClick={() => setBackground("from-[#FEF0B6] to-[#DDD1FD]")}
        ></button>
        <button
          className={cn(
            "w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#ADD6FF] to-[#FDD3B3]",
            background === "from-[#ADD6FF] to-[#FDD3B3]"
              ? "border-2 border-[#359EFF]"
              : "border-none"
          )}
          onClick={() => setBackground("from-[#ADD6FF] to-[#FDD3B3]")}
        ></button>
        <button
          className={cn(
            "w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#FFE6CF] to-[#FBCBEF]",
            background === "from-[#FFE6CF] to-[#FBCBEF]"
              ? "border-2 border-[#359EFF]"
              : "border-none"
          )}
          onClick={() => setBackground("from-[#FFE6CF] to-[#FBCBEF]")}
        ></button>
        <button
          className={cn(
            "w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#FBCBD5] to-[#D1F1D1]",
            background === "from-[#FBCBD5] to-[#D1F1D1]"
              ? "border-2 border-[#359EFF]"
              : "border-none"
          )}
          onClick={() => setBackground("from-[#FBCBD5] to-[#D1F1D1]")}
        ></button>
        <button
          className={cn(
            "w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#CCF0FA] to-[#FADDAF]",
            background === "from-[#CCF0FA] to-[#FADDAF]"
              ? "border-2 border-[#359EFF]"
              : "border-none"
          )}
          onClick={() => setBackground("from-[#CCF0FA] to-[#FADDAF]")}
        ></button>
      </div>
    </div>
  );
};

export default BackgroundSelector;
