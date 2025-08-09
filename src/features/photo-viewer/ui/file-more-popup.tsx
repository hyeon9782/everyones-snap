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
import { deletePhoto, getFileInfo } from "../api/api";

const FileMorePopup = ({
  eventIdx,
  fileIdx,
  userIdx,
  guestIdx,
}: {
  eventIdx: number;
  fileIdx: number;
  userIdx: number;
  guestIdx: number;
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleFileInfoClick = () => {
    setIsDropdownOpen(false); // 드롭다운 먼저 닫기
    setTimeout(() => {
      setIsDrawerOpen(true); // 약간의 딜레이 후 Drawer 열기
    }, 100);
  };

  const { data: fileInfo } = useQuery({
    queryKey: ["fileInfo", eventIdx, fileIdx],
    queryFn: () => getFileInfo({ eventIdx, fileIdx }),
  });

  const handleDeleteClick = async () => {
    const confirm = window.confirm(
      "사진을 삭제할까요? \n사진을 삭제하면 되돌릴 수 없어요."
    );
    if (!confirm) return;

    const response = await deletePhoto({
      eventIdx,
      fileIdxList: [fileIdx],
      userIdx,
      guestIdx,
    });
    if (response.success) {
      alert("사진이 삭제되었습니다.");
      window.location.reload();
    } else {
      alert("사진 삭제에 실패했습니다.");
    }
  };

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
          <DropdownMenuItem
            className="text-red-500"
            onSelect={handleDeleteClick}
          >
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
