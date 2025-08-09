import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import Image from "next/image";

const FileInfoDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger>파일 정보</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>파일 정보</DrawerTitle>
          <DrawerClose asChild className="absolute right-3 top-8">
            <Button variant="ghost" size="icon" className="w-[36px] h-[36px]">
              <X
                style={{ width: "24px", height: "24px" }}
                className="text-black"
              />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-4 px-4 pt-6 pb-10">
          <div className="flex flex-col gap-3 px-5 py-4 bg-[#F2F2F7] rounded-2xl text-[16px] text-[#344054]">
            {/* 생성일자 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <Image
                    src="/images/calendar_month.svg"
                    alt="calendar_month"
                    width={18}
                    height={20}
                  />
                </div>
                <span className="font-medium">생성일자</span>
              </div>
              <span className="font-normal">2025.05.25</span>
            </div>
            {/* 업로드한 사람 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <Image
                    src="/images/backup.svg"
                    alt="backup"
                    width={22}
                    height={16}
                  />
                </div>
                <span className="font-medium">업로드한 사람</span>
              </div>
              <span className="font-normal">홍길동</span>
            </div>
            {/* 업로드한 사람 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <Image
                    src="/images/file.svg"
                    alt="file"
                    width={16}
                    height={20}
                  />
                </div>
                <span className="font-medium">파일 이름</span>
              </div>
              <span className="font-normal">guamtrip.png</span>
            </div>
            {/* 업로드한 사람 */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="w-[24px] h-[24px] flex items-center justify-center">
                  <Image
                    src="/images/storage.svg"
                    alt="storage"
                    width={18}
                    height={19}
                  />
                </div>
                <span className="font-medium">파일 크기</span>
              </div>
              <span className="font-normal">3.2MB</span>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FileInfoDrawer;
