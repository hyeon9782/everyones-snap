import React from "react";

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
          className="w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#FDD7DE] to-[#C8E1FD]"
          onClick={() => setBackground("from-[#FDD7DE] to-[#C8E1FD]")}
        ></button>
        <button
          className="w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#9DD8DC] to-[#FAECBE]"
          onClick={() => setBackground("from-[#9DD8DC] to-[#FAECBE]")}
        ></button>
        <button
          className="w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#FEF0B6] to-[#DDD1FD]"
          onClick={() => setBackground("from-[#FEF0B6] to-[#DDD1FD]")}
        ></button>
        <button
          className="w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#ADD6FF] to-[#FDD3B3]"
          onClick={() => setBackground("from-[#ADD6FF] to-[#FDD3B3]")}
        ></button>
        <button
          className="w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#FFE6CF] to-[#FBCBEF]"
          onClick={() => setBackground("from-[#FFE6CF] to-[#FBCBEF]")}
        ></button>
        <button
          className="w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#FBCBD5] to-[#D1F1D1]"
          onClick={() => setBackground("from-[#FBCBD5] to-[#D1F1D1]")}
        ></button>
        <button
          className="w-[32px] h-[32px] rounded-full bg-gradient-to-b from-[#CCF0FA] to-[#FADDAF]"
          onClick={() => setBackground("from-[#CCF0FA] to-[#FADDAF]")}
        ></button>
      </div>
    </div>
  );
};

export default BackgroundSelector;
