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

  return (
    <>
      <div
        className={cn(
          "h-screen grid gap-1 px-4 py-5",
          viewMode === "grid" && "grid-cols-1",
          viewMode === "list" && "grid-cols-2",
          viewMode === "grid_on" && "grid-cols-3"
        )}
      >
        {photos.map((photo, index) => (
          <div key={photo.id} className="aspect-square">
            <PhotoCard
              photo={photo}
              onClick={(e) => handlePhotoClick(photo, index, e)}
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
