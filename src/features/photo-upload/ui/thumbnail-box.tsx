"use client";

import Image from "next/image";

type Props = {
  thumbnail?: string;
  onChange: (file: File) => void;
};

const ThumbnailBox = ({ thumbnail, onChange }: Props) => {
  return (
    <div className="w-full h-[228px] rounded-lg">
      {thumbnail ? (
        <Image
          src={thumbnail}
          alt="thumbnail"
          width={343}
          height={228}
          className="w-full h-full object-cover"
        />
      ) : (
        <label
          htmlFor="thumbnail"
          className="w-full h-[228px] bg-[#E5E5EA] cursor-pointer rounded-lg flex items-center justify-center"
        >
          <div className="flex flex-col gap-2 items-center">
            <Image
              src="/images/add_photo.svg"
              alt="upload"
              width={40}
              height={40}
            />
            <span className="text-[16px] font-medium text-[#8E8E93]">
              썸네일 추가
            </span>
          </div>
          <input
            type="file"
            hidden
            id="thumbnail"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                onChange(file);
              }
            }}
          />
        </label>
      )}
    </div>
  );
};

export default ThumbnailBox;
