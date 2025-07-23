import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { Progress } from "@/shared/ui/progress";
import { X } from "lucide-react";

const EventDetailDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>상세정보</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>이벤트 상세 정보</DrawerTitle>
          <DrawerClose asChild className="absolute right-3 top-8">
            <Button variant="ghost" size="icon" className="w-[36px] h-[36px]">
              <X
                style={{ width: "24px", height: "24px" }}
                className="text-black"
              />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        <div className="flex flex-col gap-3 items-center p-5">
          <div className="px-5 py-4 bg-[#F2F2F7] flex items-center gap-3 rounded-[20px]">
            <div className="bg-white rounded-[8px] px-3 py-1 text-[16px] font-medium">
              웨딩
            </div>
            <div className="text-[16px] font-semibold">
              김진우 이도희 결혼식
            </div>
          </div>
          {/* 날짜 정보 */}
          <div className="flex items-center gap-3 bg-[#F2F2F7] w-full rounded-[20px] px-5 py-4 flex-col">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/calendar_month.svg"
                    alt="calendar_month"
                    width={18}
                    height={20}
                  />
                </div>
                <span className="text-[16px] font-medium">생성일자</span>
              </div>
              <div className="text-[16px] font-normal">2025.07.23</div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/backup.svg"
                    alt="upload_period"
                    width={22}
                    height={16}
                  />
                </div>
                <span className="text-[16px] font-medium">
                  업로드 가능 기간
                </span>
              </div>
              <div className="text-[16px] font-normal">2025.07.23 까지</div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/download.svg"
                    alt="calendar_month"
                    width={16}
                    height={16}
                  />
                </div>
                <span className="text-[16px] font-medium">
                  다운로드 가능 기간
                </span>
              </div>
              <div className="text-[16px] font-normal">2025.07.23 까지</div>
            </div>
          </div>
          {/* 컨텐츠 정보 */}
          <div className="flex items-center gap-3 bg-[#F2F2F7] w-full rounded-[20px] px-5 py-4 flex-col">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/group.svg"
                    alt="group"
                    width={22}
                    height={16}
                  />
                </div>
                <span className="text-[16px] font-medium">참여 게스트 수</span>
              </div>
              <div className="text-[16px] font-normal">10 / 1000명</div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/photo.svg"
                    alt="photo"
                    width={20}
                    height={20}
                  />
                </div>
                <span className="text-[16px] font-medium">사진</span>
              </div>
              <div className="text-[16px] font-normal">94 / 100개</div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/play_circle.svg"
                    alt="play_circle"
                    width={20}
                    height={20}
                  />
                </div>
                <span className="text-[16px] font-medium">영상</span>
              </div>
              <div className="text-[16px] font-normal">4 / 10개</div>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/message.svg"
                    alt="message"
                    width={20}
                    height={18.61}
                  />
                </div>
                <span className="text-[16px] font-medium">메시지</span>
              </div>
              <div className="text-[16px] font-normal">53개</div>
            </div>
          </div>
          {/* 용량 정보 */}
          <div className="flex items-center gap-3 bg-[#F2F2F7] w-full rounded-[20px] px-5 py-4 flex-col">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/storage.svg"
                    alt="storage"
                    width={18}
                    height={19}
                  />
                </div>
                <span className="text-[16px] font-medium">용량</span>
              </div>
              <div className="text-[16px] font-normal">1GB / 10GB</div>
            </div>
            <div className="w-full">
              <Progress value={50} className="h-[20px]" />
            </div>
            <div className="flex justify-end gap-[10px] w-full">
              <div className="flex gap-1">사진</div>
              <div className="flex gap-1">영상</div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default EventDetailDrawer;
