"use client";

import Image from "next/image";
import { useState } from "react";
import { getPresignedUrl } from "../api/photo.api";

type Props = {
  thumbnail?: string;
  onChange: (fileUrl: string) => void;
};

const ThumbnailBox = ({ thumbnail, onChange }: Props) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // 업로드된 이미지가 있으면 우선적으로 사용, 없으면 thumbnail prop 사용
  const displayImage = uploadedImage || thumbnail;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const response = await getPresignedUrl({
          mimetype: file.type,
          type: "event",
          extension: file.name.split(".").pop() || "",
          id: "1",
        });

        console.log("response", response);

        const presignedUrl = (response.data as any).data.url;

        console.log("presignedUrl", presignedUrl);

        // presigned URL로 직접 업로드 (헤더 없이)
        const uploadResponse = await fetch(presignedUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        console.log("uploadResponse", uploadResponse);

        if (!uploadResponse.ok) {
          throw new Error(`Upload failed: ${uploadResponse.statusText}`);
        }

        console.log("Upload successful");

        const fileUrl = URL.createObjectURL(file);
        setUploadedImage(fileUrl);
        onChange(uploadResponse.url.split("?")[0]);
      } catch (error) {
        console.error("Upload error:", error);
        // 에러 처리 (사용자에게 알림 등)
      }
    }
  };

  return (
    <div className="w-full h-[228px] rounded-lg">
      {displayImage ? (
        <div className="relative w-full h-full">
          <Image
            src={displayImage}
            alt="thumbnail"
            width={343}
            height={228}
            className="w-full h-full object-cover rounded-lg"
          />
          {/* 이미지 교체 버튼 */}
          <label
            htmlFor="thumbnail"
            className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-md text-sm cursor-pointer hover:bg-opacity-70 transition-all"
          >
            변경
          </label>
          <input
            type="file"
            hidden
            id="thumbnail"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
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
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default ThumbnailBox;
