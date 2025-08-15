"use client";

import { useState } from "react";
import { Photo } from "@/entities/photo/model/photo.types";
import PhotoCard from "@/entities/photo/ui/photo-card";
import FullscreenViewer from "@/features/photo-viewer/ui/fullscreen-viewer";
import { cn } from "@/shared/lib/utils";
import { usePhotoViewerStore } from "@/features/photo-viewer/model/store";

interface PhotoGalleryGridProps {
  photos: Photo[];
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

const PhotoGalleryGrid = ({
  photos,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: PhotoGalleryGridProps) => {
  const { viewMode } = usePhotoViewerStore();

  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handlePhotoClick = (
    photo: Photo,
    photoIndex: number,
    event: React.MouseEvent
  ) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setInitialPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedPhotoIndex(photoIndex);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedPhotoIndex(null);
    setInitialPosition(null);
  };

  // viewMode에 따른 컨테이너 클래스 결정
  const getContainerClasses = () => {
    switch (viewMode) {
      case "grid":
        return "flex flex-col gap-1";
      case "list":
        return "flex flex-wrap gap-1"; // Flexbox 사용
      case "grid_on":
        return "flex flex-wrap gap-1"; // Flexbox 사용
      default:
        return "flex flex-col gap-1";
    }
  };

  // viewMode에 따른 개별 아이템 스타일 결정
  const getItemStyle = () => {
    switch (viewMode) {
      case "list":
        return {
          width: "calc(50% - 2px)", // 2열, gap 1개 (4px)의 절반을 빼줌
          aspectRatio: "1 / 1", // 정사각형
        };
      case "grid_on":
        return {
          width: "calc(33.333% - 2.67px)", // 3열, gap 2개 (8px)를 3으로 나눈 값
          aspectRatio: "1 / 1", // 정사각형
        };
      default:
        return {
          width: "100%",
          aspectRatio: "1 / 1",
        };
    }
  };

  return (
    <>
      <div className={cn("min-h-screen px-4 py-5", getContainerClasses())}>
        {photos.map((photo, index) => (
          <div
            key={`${photo.fileIdx}-${index}`}
            style={getItemStyle()}
            className="flex-shrink-0"
          >
            <PhotoCard
              photo={photo}
              onClick={(e) => handlePhotoClick(photo, index, e)}
              className="w-full h-full"
            />
          </div>
        ))}
      </div>

      <FullscreenViewer
        photos={photos}
        selectedPhotoIndex={selectedPhotoIndex ?? 0}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        initialPosition={initialPosition}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </>
  );
};

export default PhotoGalleryGrid;
