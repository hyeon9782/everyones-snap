"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";

import GridTypeTabs from "./grid-type-tabs";
import GalleryFilterDrawer from "./gallery-filter-drawer";
import { Bookmark, Download, Trash2 } from "lucide-react";
import { usePhotoViewerStore } from "../model/store";
import { cn } from "@/shared/lib/utils";
import { downloadPhotos } from "@/features/photo-download/api/api";
import {
  downloadMultipleFiles,
  downloadAsZip,
  DownloadProgressCallback,
} from "@/shared/lib/file-utils";
import { useState } from "react";

const GalleryToolbar = ({ eventIdx }: { eventIdx: number }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{
    current: number;
    total: number;
    filename: string;
  } | null>(null);

  const isSelecting = usePhotoViewerStore((state) => state.isSelecting);
  const setIsSelecting = usePhotoViewerStore((state) => state.setIsSelecting);
  const bookmarked = usePhotoViewerStore((state) => state.bookmarked);
  const setBookmarked = usePhotoViewerStore((state) => state.setBookmarked);
  const selectedPhotos = usePhotoViewerStore((state) => state.selectedPhotos);

  const toggleSelect = () => {
    setIsSelecting(!isSelecting);
  };

  const handleBookmark = () => {
    setBookmarked(bookmarked === "y" ? "n" : "y");
  };

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      setDownloadProgress(null);
      console.log("handleDownload", eventIdx, selectedPhotos);

      const response = await downloadPhotos(
        eventIdx,
        selectedPhotos.map((photo) => photo.fileIdx)
      );

      const urls = (response.data as any).data.urls;
      console.log("Download URLs:", urls);

      if (urls.length === 1) {
        // 단일 파일인 경우 ZIP으로 다운로드
        downloadAsZip(urls[0], "download.zip");
      } else if (urls.length > 1) {
        // 여러 파일인 경우 개별 다운로드 (진행 상황 추적)
        const progressCallback: DownloadProgressCallback = (
          current,
          total,
          filename
        ) => {
          setDownloadProgress({ current, total, filename });
        };

        await downloadMultipleFiles(urls, "photo", progressCallback);
      }

      console.log("handleDownload response", response);
    } catch (error) {
      console.error("Download failed:", error);
      alert("다운로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDownloading(false);
      setDownloadProgress(null);
    }
  };

  const handleDelete = () => {};

  return (
    <div className="flex items-center justify-between px-4 pt-5">
      <div className="">
        {!isSelecting ? (
          <span className="text-[20px] font-semibold">갤러리</span>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-[20px] font-semibold">
              {selectedPhotos.length}개 선택
            </span>
            <div className="flex items-center gap-2">
              <Button
                className="w-fit h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
                onClick={handleDelete}
              >
                <Trash2 className="text-[#344054]" />
                <span className="text-[#344054] font-semibold text-[16px]">
                  삭제
                </span>
              </Button>
              <Button
                className="w-fit h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#344054]"></div>
                ) : (
                  <Download className="text-[#344054]" />
                )}
                <span className="text-[#344054] font-semibold text-[16px]">
                  {isDownloading ? "다운로드 중..." : "다운로드"}
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* 다운로드 진행 상황 표시 */}
      {downloadProgress && (
        <div className="absolute top-16 left-4 right-4 bg-white border border-gray-200 rounded-lg p-3 shadow-lg z-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              다운로드 진행 중...
            </span>
            <span className="text-sm text-gray-500">
              {downloadProgress.current} / {downloadProgress.total}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (downloadProgress.current / downloadProgress.total) * 100
                }%`,
              }}
            ></div>
          </div>
          {downloadProgress.filename !== "완료" && (
            <p className="text-xs text-gray-500 mt-1 truncate">
              {downloadProgress.filename}
            </p>
          )}
        </div>
      )}

      {!isSelecting ? (
        <div className="flex items-center gap-2">
          <GridTypeTabs />
          <GalleryFilterDrawer />
          <Button
            size="icon"
            className="w-[36px] h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
            onClick={handleBookmark}
          >
            <Bookmark
              className={cn(
                "text-[#344054]",
                bookmarked === "y" ? "fill-[#344054]" : ""
              )}
            />
          </Button>
          <Button
            size="sm"
            className="w-[44px] h-[35px] p-2 rounded-full shadow-none bg-[#F2F2F7] text-[#344054] text-[16px] font-semibold "
            onClick={toggleSelect}
          >
            선택
          </Button>
        </div>
      ) : (
        <Button
          size="icon"
          onClick={toggleSelect}
          className="w-[36px] h-[36px] rounded-full shadow-none "
        >
          <Image
            src="/images/close.svg"
            alt="close"
            width={10.96}
            height={10.96}
          />
        </Button>
      )}
    </div>
  );
};

export default GalleryToolbar;
