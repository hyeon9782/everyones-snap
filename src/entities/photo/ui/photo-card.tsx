"use client";

import Image from "next/image";
import { Photo } from "../model/photo.types";
import { cn } from "@/shared/lib/utils";
import { usePhotoViewerStore } from "@/features/photo-viewer/model/store";

interface PhotoCardProps {
  photo: Photo;
  width?: number;
  height?: number;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}

const PhotoCard = ({
  photo,
  width,
  height,
  onClick,
  className,
}: PhotoCardProps) => {
  const { selectedPhotos, setSelectedPhotos, isSelecting } =
    usePhotoViewerStore();

  const handleClick = (event: React.MouseEvent) => {
    if (isSelecting) {
      if (selectedPhotos.includes(photo)) {
        setSelectedPhotos(
          selectedPhotos.filter((p) => p.fileIdx !== photo.fileIdx)
        );
      } else {
        setSelectedPhotos([...selectedPhotos, photo]);
      }
    } else {
      onClick?.(event);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-full cursor-pointer overflow-hidden",
        className,
        selectedPhotos.includes(photo) && "border-2 border-blue-500"
      )}
      onClick={handleClick}
    >
      {width && height ? (
        <Image
          src={photo.url}
          alt={photo.mediaType}
          width={width}
          height={height}
          className="transition-transform hover:scale-105"
        />
      ) : (
        <Image
          src={photo.url}
          alt={photo.mediaType}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      )}
    </div>
  );
};

export default PhotoCard;
