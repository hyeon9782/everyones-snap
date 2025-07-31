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

const GalleryFilterDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Filter</Button>
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
              <Switch />
            </div>
          </div>
          <div className="bg-[#F2F2F7] rounded-lg p-4 w-full space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[16px]">정렬 기준</span>
              <div>
                <BasicSelect
                  items={[
                    { label: "업로드한 시간", value: "uploadTime" },
                    { label: "업로드한 사람", value: "uploadUser" },
                    { label: "촬영 시간", value: "shootingTime" },
                    { label: "북마크", value: "bookmark" },
                  ]}
                  initialValue="uploadTime"
                  className="w-fit max-h-[24px]"
                  onChange={() => {}}
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
                    { label: "최신순", value: "latest" },
                    { label: "오래된순", value: "oldest" },
                  ]}
                  initialValue="latest"
                  className="w-fit max-h-[24px]"
                  onChange={() => {}}
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
                initialValue="all"
                className="w-fit max-h-[24px]"
                onChange={() => {}}
                placeholder="파일 종류"
              />
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#F2F2F7] rounded-lg p-4 w-full">
            <span className="font-medium text-[16px]">
              다운로드 안한 파일만 보기
            </span>
            <div>
              <Switch />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default GalleryFilterDrawer;
