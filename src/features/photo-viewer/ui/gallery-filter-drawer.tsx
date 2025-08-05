"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Button } from "@/shared/ui/button";
import { X } from "lucide-react";
import { Switch } from "@/shared/ui/switch";
import BasicSelect from "@/shared/ui/basic-select";
import Image from "next/image";
import { usePhotoViewerStore } from "../model/store";

const GalleryFilterDrawer = () => {
  const onlyMyFiles = usePhotoViewerStore((state) => state.onlyMyFiles);
  const setOnlyMyFiles = usePhotoViewerStore((state) => state.setOnlyMyFiles);
  const fileType = usePhotoViewerStore((state) => state.fileType);
  const setFileType = usePhotoViewerStore((state) => state.setFileType);
  const sortBy = usePhotoViewerStore((state) => state.sortBy);
  const setSortBy = usePhotoViewerStore((state) => state.setSortBy);
  const sortOrder = usePhotoViewerStore((state) => state.sortOrder);
  const setSortOrder = usePhotoViewerStore((state) => state.setSortOrder);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          size="icon"
          className="w-[36px] h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
        >
          <Image src="/images/filter.svg" alt="filter" width={15} height={15} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>갤러리 필터</DrawerTitle>
          <DrawerClose asChild className="absolute right-3 top-8">
            <Button variant="ghost" size="icon" className="w-[36px] h-[36px]">
              <X
                style={{ width: "24px", height: "24px" }}
                className="text-black"
              />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="px-4 pt-6 pb-10 space-y-4">
          <div className="flex items-center justify-between bg-[#F2F2F7] rounded-lg p-4 w-full">
            <span className="font-medium text-[16px]">
              내가 업로드한 파일만 보기
            </span>
            <div>
              <Switch
                checked={onlyMyFiles === "y"}
                onCheckedChange={() =>
                  setOnlyMyFiles(onlyMyFiles === "y" ? "n" : "y")
                }
              />
            </div>
          </div>
          <div className="bg-[#F2F2F7] rounded-lg p-4 w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[16px]">정렬 기준</span>
              <div>
                <BasicSelect
                  items={[{ label: "업로드한 시간", value: "createDt" }]}
                  value={sortBy}
                  className="w-fit max-h-[24px]"
                  onChange={(value) => setSortBy(value as "createDt")}
                  placeholder="파일 종류"
                />
              </div>
            </div>
            <hr />
            <div className="flex items-center justify-between">
              <span className="font-medium text-[16px]">정렬 순서</span>
              <div>
                <BasicSelect
                  items={[
                    { label: "최신순", value: "DESC" },
                    { label: "오래된순", value: "ASC" },
                  ]}
                  value={sortOrder}
                  className="w-fit max-h-[24px]"
                  onChange={(value) => setSortOrder(value as "DESC" | "ASC")}
                  placeholder="파일 종류"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#F2F2F7] rounded-lg p-4 w-full">
            <span className="font-medium text-[16px]">파일 종류</span>
            <div>
              <BasicSelect
                items={[
                  { label: "모두", value: "all" },
                  { label: "이미지", value: "image" },
                  { label: "영상", value: "video" },
                ]}
                value={fileType}
                className="w-fit max-h-[24px]"
                onChange={(value) =>
                  setFileType(value as "all" | "image" | "video")
                }
                placeholder="파일 종류"
              />
            </div>
          </div>
          {/* <div className="flex items-center justify-between bg-[#F2F2F7] rounded-lg p-4 w-full">
            <span className="font-medium text-[16px]">
              다운로드 안한 파일만 보기
            </span>
            <div>
              <Switch
                checked={bookmarked === "y"}
                onCheckedChange={() =>
                  setBookmarked(bookmarked === "y" ? "n" : "y")
                }
              />
            </div>
          </div> */}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GalleryFilterDrawer;
