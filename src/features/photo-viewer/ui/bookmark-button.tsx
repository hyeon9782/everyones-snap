"use client";

import { Button } from "@/shared/ui/button";
import { Bookmark } from "lucide-react";
import { useBookmarkMutation } from "../api/api";
import { usePhotoViewerStore } from "../model/store";
import { useCallback, useRef, useEffect } from "react";
import { cn } from "@/shared/lib/utils";

interface BookmarkButtonProps {
  eventIdx: number;
  fileIdx: number;
  userIdx: number;
}

const BookmarkButton = ({
  eventIdx,
  fileIdx,
  userIdx,
}: BookmarkButtonProps) => {
  const { bookmarkedPhotos } = usePhotoViewerStore();
  const bookmarkMutation = useBookmarkMutation();
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const isBookmarked = bookmarkedPhotos.has(fileIdx);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handleBookmark = useCallback(() => {
    // 기존 디바운스 타이머 클리어
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // 300ms 디바운스 적용
    debounceRef.current = setTimeout(() => {
      bookmarkMutation.mutate({
        eventIdx,
        fileIdx,
        userIdx,
      });
    }, 300);
  }, [eventIdx, fileIdx, userIdx, bookmarkMutation]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-[44px] h-[44px] bg-[#344054]/50 rounded-full"
      onClick={handleBookmark}
      disabled={bookmarkMutation.isPending}
    >
      <Bookmark
        className={cn(
          "size-5 text-white transition-all duration-200",
          isBookmarked && "fill-current"
        )}
      />
    </Button>
  );
};

export default BookmarkButton;
