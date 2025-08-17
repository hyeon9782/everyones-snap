"use client";

import Image from "next/image";
import { Photo } from "../model/photo.types";
import { cn } from "@/shared/lib/utils";
import { usePhotoViewerStore } from "@/features/photo-viewer/model/store";
import { useState, useRef, useEffect, useCallback } from "react";
import { Clock, Loader2 } from "lucide-react";

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

  const [videoDuration, setVideoDuration] = useState<number | null>(null);
  const [isLoadingDuration, setIsLoadingDuration] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  // 비디오 길이를 mm:ss 형식으로 변환
  const formatDuration = useCallback((seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  }, []);

  // 비디오 메타데이터 로드하여 길이 가져오기
  useEffect(() => {
    if (!isVideo(photo.mediaType) || !videoRef.current) return;

    setIsLoadingDuration(true);
    setDurationError(false);
    setVideoDuration(null);

    const video = videoRef.current;

    const handleLoadedMetadata = () => {
      if (video.duration && isFinite(video.duration)) {
        setVideoDuration(video.duration);
        setIsLoadingDuration(false);
      } else {
        setDurationError(true);
        setIsLoadingDuration(false);
      }
    };

    const handleError = () => {
      setDurationError(true);
      setIsLoadingDuration(false);
    };

    // 타임아웃 설정 (5초 후 실패로 처리)
    timeoutRef.current = setTimeout(() => {
      if (isLoadingDuration) {
        setDurationError(true);
        setIsLoadingDuration(false);
      }
    }, 5000);

    video.addEventListener("loadedmetadata", handleLoadedMetadata, {
      once: true,
    });
    video.addEventListener("error", handleError, { once: true });

    // 이미 로드된 경우
    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [photo.mediaType, photo.url]);

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const renderMedia = () => {
    if (isVideo(photo.mediaType)) {
      return (
        <video
          ref={videoRef}
          src={photo.url}
          className={cn(
            "w-full h-full object-cover transition-transform hover:scale-105"
          )}
          controls={false}
          muted
          loop
          playsInline
          preload="metadata"
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
        "relative w-full h-full cursor-pointer overflow-hidden",
        className,
        selectedPhotos.includes(photo) && "border-5 border-[#344054]"
      )}
      onClick={handleClick}
    >
      {renderMedia()}

      {/* 비디오 길이 표시 (좌측 상단) */}
      {isVideo(photo.mediaType) && (
        <div className="absolute top-2 left-2 bg-black/10 text-white px-2 py-1.5 rounded-md text-xs font-medium backdrop-blur-sm border border-white/20 shadow-lg">
          {isLoadingDuration ? (
            <div className="flex items-center gap-1.5">
              <Loader2 className="w-3 h-3 animate-spin" />
              <span>로딩...</span>
            </div>
          ) : videoDuration ? (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>{formatDuration(videoDuration)}</span>
            </div>
          ) : durationError ? (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              <span>--:--</span>
            </div>
          ) : null}
        </div>
      )}

      {/* 비디오 인디케이터 (우측 상단) */}
      {/* {isVideo(photo.mediaType) && (
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
      )} */}
    </div>
  );
};

export default PhotoCard;
