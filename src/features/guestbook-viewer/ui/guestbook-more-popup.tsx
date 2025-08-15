"use client";

import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useDeleteGuestbookMutation } from "@/features/guestbook-write/api/api";
import { useQueryClient } from "@tanstack/react-query";

const GuestbookMorePopup = ({ visitorNoteIdx }: { visitorNoteIdx: number }) => {
  const { mutateAsync: deleteGuestbook } = useDeleteGuestbookMutation();

  const queryClient = useQueryClient();

  const handleDeleteGuestbook = async () => {
    const confirm = window.confirm("메시지를 삭제할까요?");
    if (!confirm) return;

    const res = await deleteGuestbook({ visitorNoteIdx });

    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>편집</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleDeleteGuestbook}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GuestbookMorePopup;
