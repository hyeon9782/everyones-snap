"use client";

import { useState, useRef } from "react";
import { Photo } from "@/entities/photo/model/photo.types";
import PhotoCard from "@/entities/photo/ui/photo-card";
import FullscreenViewer from "@/features/photo-viewer/ui/fullscreen-viewer";

const PhotoGalleryGrid = ({ photos }: { photos: Photo[] }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const handlePhotoClick = (photo: Photo, event: React.MouseEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setInitialPosition({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });
    setSelectedPhoto(photo);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setSelectedPhoto(null);
    setInitialPosition(null);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-1">
        {photos.map((photo) => (
          <div key={photo.id} className="aspect-square">
            <PhotoCard
              photo={photo}
              onClick={(e) => handlePhotoClick(photo, e)}
            />
          </div>
        ))}
      </div>

      <FullscreenViewer
        photo={selectedPhoto}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        initialPosition={initialPosition}
      />
    </>
  );
};

export default PhotoGalleryGrid;
