import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import FileInfoDrawer from "./file-info-drawer";

const FileMorePopup = () => {
  return (
    <DropdownMenu>
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
        <DropdownMenuItem>
          <FileInfoDrawer />
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500">파일 삭제</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FileMorePopup;
