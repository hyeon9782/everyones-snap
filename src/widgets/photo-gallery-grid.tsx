"use client";

import { useState } from "react";
import { Photo } from "@/entities/photo/model/photo.types";
import PhotoCard from "@/entities/photo/ui/photo-card";
import FullscreenViewer from "@/features/photo-viewer/ui/fullscreen-viewer";
import { cn } from "@/shared/lib/utils";
import { usePhotoViewerStore } from "@/features/photo-viewer/model/store";

const PhotoGalleryGrid = ({ photos }: { photos: Photo[] }) => {
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
        return "grid grid-cols-2 gap-1";
      case "grid_on":
        return "grid grid-cols-3 gap-1";
      default:
        return "grid grid-cols-1 gap-1";
    }
  };

  // viewMode에 따른 개별 아이템 클래스 결정
  const getItemClasses = () => {
    switch (viewMode) {
      case "grid":
        return "aspect-square"; // 세로 스크롤, 원본 비율 유지
      case "list":
        return "aspect-square"; // 2열은 정사각형 유지
      case "grid_on":
        return ""; // 3열은 원본 비율 유지하되 높이 제한
      default:
        return "aspect-square";
    }
  };

  return (
    <>
      <div className={cn("h-screen px-4 py-5", getContainerClasses())}>
        {photos.map((photo, index) => (
          <div key={photo.fileIdx} className={getItemClasses()}>
            <PhotoCard
              photo={photo}
              onClick={(e) => handlePhotoClick(photo, index, e)}
              className={cn(viewMode === "grid_on" && "max-h-40 object-cover")}
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
      />
    </>
  );
};

export default PhotoGalleryGrid;
