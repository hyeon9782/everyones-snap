import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import FileInfoDrawer from "./file-info-drawer";
import { useQuery } from "@tanstack/react-query";
import { getFileInfo } from "../api/api";

const FileMorePopup = ({
  eventIdx,
  fileIdx,
}: {
  eventIdx: number;
  fileIdx: number;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFileInfoClick = () => {
    setIsDropdownOpen(false); // 드롭다운 먼저 닫기
    setTimeout(() => {
      setIsDrawerOpen(true); // 약간의 딜레이 후 Drawer 열기
    }, 100);
  };

  console.log("eventIdx", eventIdx);
  console.log("fileIdx", fileIdx);

  const { data: fileInfo } = useQuery({
    queryKey: ["fileInfo", eventIdx, fileIdx],
    queryFn: () => getFileInfo({ eventIdx, fileIdx }),
  });

  console.log("fileInfo", fileInfo);

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="w-[44px] h-[44px] bg-[#344054]/50 rounded-full"
          >
            <MoreHorizontal className="text-white size-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onSelect={handleFileInfoClick}>
            파일 정보
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500">
            파일 삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {fileInfo && (
        <FileInfoDrawer
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          fileInfo={fileInfo}
        />
      )}
    </>
  );
};

export default FileMorePopup;
