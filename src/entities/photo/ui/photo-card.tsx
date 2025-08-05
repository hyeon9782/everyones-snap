"use client";

import Image from "next/image";
import { Photo } from "../model/photo.types";
import { cn } from "@/shared/lib/utils";

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
  return (
    <div
      className={cn(
        "relative w-full h-full cursor-pointer overflow-hidden",
        className
      )}
      onClick={onClick}
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
