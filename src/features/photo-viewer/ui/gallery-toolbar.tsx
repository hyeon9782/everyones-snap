"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import GridTypeTabs from "./grid-type-tabs";
import GalleryFilterDrawer from "./gallery-filter-drawer";
import { Bookmark, Download, Trash2 } from "lucide-react";

const GalleryToolbar = () => {
  const [isSelected, setIsSelected] = useState(false);

  const toggleSelect = () => {
    setIsSelected((prev) => !prev);
  };

  const handleBookmark = () => {};

  const handleDownload = () => {};

  const handleDelete = () => {};

  return (
    <div className="flex items-center justify-between px-4 pt-5">
      <div className="">
        {!isSelected ? (
          <span className="text-[20px] font-semibold">갤러리</span>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-[20px] font-semibold">1개 선택</span>
            <div className="flex items-center gap-2">
              <Button
                className="w-fit h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
                onClick={handleDelete}
              >
                <Trash2 className="text-[#344054]" />
                <span className="text-[#344054] font-semibold text-[16px]">
                  삭제
                </span>
              </Button>
              <Button
                className="w-fit h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
                onClick={handleDownload}
              >
                <Download className="text-[#344054]" />
                <span className="text-[#344054] font-semibold text-[16px]">
                  다운로드
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
      {!isSelected ? (
        <div className="flex items-center gap-2">
          <GridTypeTabs />
          <GalleryFilterDrawer />
          <Button
            size="icon"
            className="w-[36px] h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
            onClick={handleBookmark}
          >
            <Bookmark className="text-[#344054]" />
          </Button>
          <Button
            size="sm"
            className="w-[44px] h-[35px] p-2 rounded-full shadow-none bg-[#F2F2F7] text-[#344054] text-[16px] font-semibold "
            onClick={toggleSelect}
          >
            선택
          </Button>
        </div>
      ) : (
        <Button
          size="icon"
          onClick={toggleSelect}
          className="w-[36px] h-[36px] rounded-full shadow-none "
        >
          <Image
            src="/images/close.svg"
            alt="close"
            width={10.96}
            height={10.96}
          />
        </Button>
      )}
    </div>
  );
};

export default GalleryToolbar;
