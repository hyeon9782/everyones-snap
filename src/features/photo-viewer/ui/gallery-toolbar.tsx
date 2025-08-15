"use client";

import { Button } from "@/shared/ui/button";
import Image from "next/image";

import GridTypeTabs from "./grid-type-tabs";
import GalleryFilterDrawer from "./gallery-filter-drawer";
import { Bookmark, Download, Trash2 } from "lucide-react";
import { usePhotoViewerStore } from "../model/store";
import { cn } from "@/shared/lib/utils";
import {
  compressedDownloadPresignedUrl,
  compressedDownloadRequest,
  downloadPhotos,
} from "@/features/photo-download/api/api";
import {
  downloadMultipleFiles,
  downloadAsZip,
  DownloadProgressCallback,
  downloadFile,
} from "@/shared/lib/file-utils";
import { useState } from "react";
import { deletePhoto } from "../api/api";
import { useUserStore } from "@/features/login/model/store";

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
  const setSelectedPhotos = usePhotoViewerStore(
    (state) => state.setSelectedPhotos
  );

  const { user } = useUserStore();

  const toggleSelect = () => {
    setIsSelecting(!isSelecting);
    setSelectedPhotos([]);
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

      if (selectedPhotos.length > 1) {
        const requestResponse = await compressedDownloadRequest(
          eventIdx,
          selectedPhotos.map((photo) => photo.fileIdx)
        );

        console.log("requestResponse", requestResponse);

        const presignedUrlResponse = await pollForPresignedUrl(
          eventIdx,
          requestResponse.zipKey
        );

        console.log("presignedUrlResponse", presignedUrlResponse);

        downloadAsZip(presignedUrlResponse, "download.zip");
      } else {
        const response = await downloadPhotos(
          eventIdx,
          selectedPhotos.map((photo) => photo.fileIdx)
        );

        downloadFile(response.urls[0], "download.jpg");

        console.log("response", response);
      }
    } catch (error) {
      console.error("Download failed:", error);
      alert("다운로드에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsDownloading(false);
      setDownloadProgress(null);
    }
  };

  // 폴링 함수
  const pollForPresignedUrl = async (
    eventIdx: number,
    zipKey: string
  ): Promise<string> => {
    const maxAttempts = 60; // 최대 60번 시도 (60초)
    let attempts = 0;

    return new Promise((resolve, reject) => {
      const poll = async () => {
        try {
          attempts++;
          console.log(`압축 상태 확인 중... (${attempts}/${maxAttempts})`);

          const presignedUrlResponse = await compressedDownloadPresignedUrl(
            eventIdx,
            zipKey
          );

          console.log("presignedUrlResponse", presignedUrlResponse);

          // 압축이 완료되어 URL을 받았을 때
          if (presignedUrlResponse && presignedUrlResponse.url) {
            console.log("압축 완료! 다운로드를 시작합니다.");
            resolve(presignedUrlResponse.url);
            return;
          }

          // 최대 시도 횟수에 도달했을 때
          if (attempts >= maxAttempts) {
            reject(
              new Error(
                "압축 대기 시간이 초과되었습니다. 잠시 후 다시 시도해주세요."
              )
            );
            return;
          }

          // 1초 후 다시 시도
          setTimeout(poll, 1000);
        } catch (error: any) {
          console.log("폴링 중 응답:", error);

          // 404 에러이고 "아직 압축이 완료되지 않았습니다" 메시지인 경우
          if (error?.response?.status === 404 || error?.status === 404) {
            console.log("압축이 아직 진행중입니다. 계속 기다립니다...");

            // 최대 시도 횟수 체크
            if (attempts >= maxAttempts) {
              reject(
                new Error(
                  "압축 대기 시간이 초과되었습니다. 잠시 후 다시 시도해주세요."
                )
              );
              return;
            }

            // 1초 후 다시 시도
            setTimeout(poll, 1000);
            return;
          }

          // 404가 아닌 다른 에러는 실제 에러로 처리
          console.error("폴링 중 실제 오류:", error);
          reject(error);
        }
      };

      // 첫 번째 폴링 시작
      poll();
    });
  };

  const handleDelete = async () => {
    const confirm = window.confirm(
      "사진을 삭제할까요? \n사진을 삭제하면 되돌릴 수 없어요."
    );
    if (!confirm) return;

    const response = await deletePhoto({
      eventIdx,
      fileIdxList: selectedPhotos.map((photo) => photo.fileIdx),
      userIdx: user?.userIdx,
      guestIdx: selectedPhotos[0].guestIdx,
    });

    console.log("response", response);

    if (response.success) {
      alert("사진이 삭제되었습니다.");
      window.location.reload();
    } else {
      alert("사진 삭제에 실패했습니다.");
    }
  };

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
