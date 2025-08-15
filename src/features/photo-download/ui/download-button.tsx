"use client";

import { Button } from "@/shared/ui/button";
import { Download, Loader2 } from "lucide-react";
import { downloadPhotos } from "../api/api";
import {
  downloadFile,
  downloadMultipleFiles,
  DownloadProgressCallback,
} from "@/shared/lib/file-utils";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";

interface DownloadButtonProps {
  eventIdx: number;
  fileIdxs: number[];
  className?: string;
  fileName: string;
  onDownloadStart?: () => void;
  onDownloadComplete?: () => void;
  onDownloadError?: (error: string) => void;
  onProgress?: DownloadProgressCallback;
}

const DownloadButton = ({
  eventIdx,
  fileIdxs,
  fileName,
  className,
  onDownloadStart,
  onDownloadComplete,
  onDownloadError,
  onProgress,
}: DownloadButtonProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    if (isDownloading || fileIdxs.length === 0) return;

    try {
      setIsDownloading(true);
      onDownloadStart?.();

      // API에서 presigned URL 가져오기
      const response = await downloadPhotos(eventIdx, fileIdxs);

      // 파일 다운로드 실행
      if (fileIdxs.length === 1 && response.urls[0]) {
        // 단일 파일 다운로드
        const file = response.urls[0];
        downloadFile(file, fileName);
        onProgress?.(1, 1, fileName);
      } else if (response.urls.length > 1) {
        // 다중 파일 순차 다운로드
        const urls = response.urls;
        const baseFileName = `photo_${eventIdx}`;

        await downloadMultipleFiles(urls, baseFileName, onProgress);
      }

      onDownloadComplete?.();
    } catch (error) {
      console.error("Download failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "다운로드에 실패했습니다.";
      onDownloadError?.(errorMessage);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        "w-[44px] h-[44px] bg-[#344054]/50 rounded-full hover:bg-[#344054]/70 transition-colors",
        className
      )}
      onClick={handleDownload}
      disabled={isDownloading || fileIdxs.length === 0}
    >
      {isDownloading ? (
        <Loader2 className="text-white size-5 animate-spin" />
      ) : (
        <Download className="text-white size-5" />
      )}
    </Button>
  );
};

export default DownloadButton;
