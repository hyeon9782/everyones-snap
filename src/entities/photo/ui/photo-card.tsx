"use client";

import Image from "next/image";
import { Photo } from "../model/photo.types";

interface PhotoCardProps {
  photo: Photo;
  width?: number;
  height?: number;
  onClick?: (event: React.MouseEvent) => void;
}

const PhotoCard = ({ photo, width, height, onClick }: PhotoCardProps) => {
  return (
    <div
      className="relative w-full h-full cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      {width && height ? (
        <Image
          src={photo.url}
          alt={photo.title}
          width={width}
          height={height}
          className="transition-transform hover:scale-105"
        />
      ) : (
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      )}
    </div>
  );
};

export default PhotoCard;
