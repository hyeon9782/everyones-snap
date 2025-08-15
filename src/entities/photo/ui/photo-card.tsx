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

  // 미디어 타입 확인 함수
  const isVideo = (mediaType: string) => {
    return (
      mediaType.toLowerCase().startsWith("video/") ||
      ["mp4", "webm", "ogg", "mov", "avi"].some((ext) =>
        photo.url.toLowerCase().includes(`.${ext}`)
      )
    );
  };

  // 이미지 타입 확인 함수
  const isImage = (mediaType: string) => {
    return (
      mediaType.toLowerCase().startsWith("image/") ||
      ["jpg", "jpeg", "png", "gif", "webp", "svg"].some((ext) =>
        photo.url.toLowerCase().includes(`.${ext}`)
      )
    );
  };

  const renderMedia = () => {
    if (isVideo(photo.mediaType)) {
      return (
        <video
          src={photo.url}
          className={cn(
            "w-full h-full object-cover transition-transform hover:scale-105"
          )}
          controls={false}
          muted
          loop
          playsInline
          onMouseEnter={(e) => {
            const video = e.target as HTMLVideoElement;
            video.play().catch(() => {
              // 자동 재생이 실패해도 무시
            });
          }}
          onMouseLeave={(e) => {
            const video = e.target as HTMLVideoElement;
            video.pause();
            video.currentTime = 0;
          }}
        />
      );
    } else if (isImage(photo.mediaType)) {
      return width && height ? (
        <Image
          src={photo.url}
          alt={photo.mediaType}
          width={width}
          height={height}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      ) : (
        <Image
          src={photo.url}
          alt={photo.mediaType}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      );
    } else {
      // 알 수 없는 미디어 타입의 경우 기본 이미지로 처리
      return width && height ? (
        <Image
          src={photo.url}
          alt={photo.mediaType}
          width={width}
          height={height}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      ) : (
        <Image
          src={photo.url}
          alt={photo.mediaType}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      );
    }
  };

  return (
    <div
      className={cn(
        "relative w-full h-full cursor-pointer overflow-hidden rounded-lg", // rounded-lg 추가로 더 예쁘게
        className,
        selectedPhotos.includes(photo) && "ring-2 ring-blue-500 ring-offset-2" // border 대신 ring 사용
      )}
      onClick={handleClick}
    >
      {renderMedia()}

      {/* 비디오 인디케이터 */}
      {isVideo(photo.mediaType) && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
