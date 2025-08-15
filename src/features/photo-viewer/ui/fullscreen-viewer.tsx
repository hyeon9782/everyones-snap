"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Photo } from "@/entities/photo/model/photo.types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/ui/carousel";
import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import BookmarkButton from "./bookmark-button";
import DownloadButtonWithToast from "@/features/photo-download/ui/download-button-with-toast";
import FileMorePopup from "./file-more-popup";

interface FullscreenViewerProps {
  photos: Photo[];
  selectedPhotoIndex: number;
  isOpen: boolean;
  onClose: () => void;
  initialPosition?: {
    x: number;
    y: number;
    width: number;
    height: number;
  } | null;
}

const FullscreenViewer = ({
  photos,
  selectedPhotoIndex,
  isOpen,
  onClose,
  initialPosition,
}: FullscreenViewerProps) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0); // 항상 0부터 시작
  const [isReady, setIsReady] = useState(false);
  const videoRefsRef = useRef<{ [key: number]: HTMLVideoElement }>({});

  // 미디어 타입 확인 함수들
  const isVideo = (mediaType: string, url?: string) => {
    return (
      mediaType.toLowerCase().startsWith("video/") ||
      mediaType.toLowerCase() === "video" ||
      (url &&
        ["mp4", "webm", "ogg", "mov", "avi"].some((ext) =>
          url.toLowerCase().includes(`.${ext}`)
        ))
    );
  };

  const isImage = (mediaType: string, url?: string) => {
    return (
      mediaType.toLowerCase().startsWith("image/") ||
      (url &&
        ["jpg", "jpeg", "png", "gif", "webp", "svg"].some((ext) =>
          url.toLowerCase().includes(`.${ext}`)
        ))
    );
  };

  // 선택된 이미지가 첫 번째로 오도록 배열 재정렬
  const reorderedPhotos = useMemo(() => {
    if (photos.length === 0) return [];

    const selected = photos[selectedPhotoIndex];
    const before = photos.slice(0, selectedPhotoIndex);
    const after = photos.slice(selectedPhotoIndex + 1);

    return [selected, ...after, ...before];
  }, [photos, selectedPhotoIndex]);

  // 원본 인덱스와 재정렬된 인덱스 간의 매핑
  const getOriginalIndex = useMemo(() => {
    return (reorderedIndex: number) => {
      if (reorderedIndex === 0) return selectedPhotoIndex;

      const afterLength = photos.length - selectedPhotoIndex - 1;

      if (reorderedIndex <= afterLength) {
        // after 영역
        return selectedPhotoIndex + reorderedIndex;
      } else {
        // before 영역
        return reorderedIndex - afterLength - 1;
      }
    };
  }, [photos.length, selectedPhotoIndex]);

  useEffect(() => {
    if (!api) return;

    // API 준비 시 현재 슬라이드 설정
    setCurrent(api.selectedScrollSnap());
    setIsReady(true);

    api.on("select", () => {
      const newCurrent = api.selectedScrollSnap();

      // 이전 슬라이드의 비디오 일시정지
      if (videoRefsRef.current[current]) {
        videoRefsRef.current[current].pause();
      }

      setCurrent(newCurrent);
    });

    return () => {
      api.off("select");
    };
  }, [api, current]);

  // 컴포넌트가 열릴 때마다 초기화
  useEffect(() => {
    if (isOpen) {
      setIsReady(false);
      setCurrent(0);
      videoRefsRef.current = {};
    } else {
      // 뷰어가 닫힐 때 모든 비디오 일시정지
      Object.values(videoRefsRef.current).forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    }
  }, [isOpen]);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  if (photos.length === 0) return null;

  const currentOriginalIndex = getOriginalIndex(current);
  const currentPhoto = photos[currentOriginalIndex];

  // 비디오 ref 콜백 함수
  const setVideoRef = useCallback((index: number) => {
    return (el: HTMLVideoElement | null) => {
      if (el) {
        videoRefsRef.current[index] = el;
      } else {
        delete videoRefsRef.current[index];
      }
    };
  }, []);

  // 미디어 렌더링 함수
  const renderMedia = (photo: Photo, index: number) => {
    if (isVideo(photo.mediaType, photo.url)) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <video
            ref={setVideoRef(index)}
            src={photo.url}
            className="max-w-full max-h-full object-contain"
            controls
            autoPlay={index === current} // 현재 슬라이드일 때만 자동 재생
            muted={false} // 풀스크린에서는 음소거 해제
            loop={false}
            playsInline
            preload={index === current ? "auto" : "metadata"}
            style={{ maxHeight: "100vh", maxWidth: "100vw" }}
            onLoadedData={() => {
              // 현재 슬라이드가 아닌 비디오는 일시정지
              if (index !== current && videoRefsRef.current[index]) {
                videoRefsRef.current[index].pause();
              }
            }}
          />
        </div>
      );
    } else {
      return (
        <Image
          src={photo.url}
          alt={photo.mediaType}
          fill
          sizes="100vw"
          className="object-contain"
          priority={index === 0} // 첫 번째 이미지만 priority
          placeholder="empty" // placeholder 제거로 더 빠른 로딩
        />
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={
              initialPosition
                ? {
                    position: "fixed" as const,
                    top: initialPosition.y,
                    left: initialPosition.x,
                    width: initialPosition.width,
                    height: initialPosition.height,
                    scale: 1,
                  }
                : {
                    scale: 0.8,
                    opacity: 0,
                  }
            }
            animate={{
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              scale: 1,
              opacity: 1,
            }}
            exit={
              initialPosition
                ? {
                    position: "fixed" as const,
                    top: initialPosition.y,
                    left: initialPosition.x,
                    width: initialPosition.width,
                    height: initialPosition.height,
                    scale: 1,
                  }
                : {
                    scale: 0.8,
                    opacity: 0,
                  }
            }
            transition={{
              type: "spring",
              damping: 40,
              stiffness: 400,
              mass: 0.8,
            }}
            className="relative flex items-center justify-center w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full h-full"
              style={{
                opacity: isReady ? 1 : 0,
                transition: "opacity 0.15s ease-in-out",
              }}
            >
              <Carousel
                setApi={setApi}
                className="w-full h-full max-w-none max-h-none"
                opts={{
                  align: "start",
                  loop: true,
                  startIndex: 0, // 항상 0에서 시작
                  duration: 0, // 모든 애니메이션 제거
                  dragFree: false,
                  containScroll: "keepSnaps",
                  skipSnaps: false,
                  slidesToScroll: 1,
                }}
              >
                <CarouselContent className="w-full h-full -ml-0">
                  {reorderedPhotos.map((photo, index) => (
                    <CarouselItem
                      key={`${photo.fileIdx}-${index}`}
                      className="h-full pl-0 basis-full min-h-screen"
                    >
                      <div className="relative w-full h-full flex items-center justify-center min-h-screen">
                        <div className="relative w-full h-full min-h-screen">
                          {renderMedia(photo, index)}
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>

                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black/70" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white border-none hover:bg-black/70" />
              </Carousel>
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ✕
            </button>

            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
              {isVideo(currentPhoto.mediaType, currentPhoto.url) && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
              {currentOriginalIndex + 1} of {photos.length}
            </div>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-5">
              <BookmarkButton
                eventIdx={currentPhoto.eventIdx}
                fileIdx={currentPhoto.fileIdx}
                userIdx={currentPhoto.userIdx}
                initialBookmarked={currentPhoto.isBookmarked}
              />
              <DownloadButtonWithToast
                eventIdx={currentPhoto.eventIdx}
                fileIdxs={[currentPhoto.fileIdx]}
                fileName={`${
                  isVideo(currentPhoto.mediaType, currentPhoto.url)
                    ? "video"
                    : "photo"
                }_${currentPhoto.fileIdx}.${
                  isVideo(currentPhoto.mediaType, currentPhoto.url)
                    ? "mp4"
                    : "jpg"
                }`}
              />
              <FileMorePopup
                userIdx={currentPhoto.userIdx}
                guestIdx={currentPhoto.guestIdx}
                eventIdx={currentPhoto.eventIdx}
                fileIdx={currentPhoto.fileIdx}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenViewer;
