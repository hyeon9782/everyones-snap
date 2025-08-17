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
import Link from "next/link";

const GuestbookMorePopup = ({
  visitorNoteIdx,
  isGuest,
  eventIdx,
}: {
  visitorNoteIdx: number;
  isGuest: boolean;
  eventIdx: number;
}) => {
  const { mutateAsync: deleteGuestbook } = useDeleteGuestbookMutation();

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
        {isGuest && (
          <DropdownMenuItem asChild>
            <Link
              href={`/guestbook/write/${visitorNoteIdx}?eventIdx=${eventIdx}`}
            >
              편집
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={handleDeleteGuestbook}>
          삭제
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GuestbookMorePopup;
