// FullscreenViewer 컴포넌트 개선 버전
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
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  fetchNextPage?: () => void;
}

const FullscreenViewer = ({
  photos,
  selectedPhotoIndex,
  isOpen,
  onClose,
  initialPosition,
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage,
}: FullscreenViewerProps) => {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const videoRefsRef = useRef<{ [key: number]: HTMLVideoElement }>({});
  const [hasTriggeredFetch, setHasTriggeredFetch] = useState(false);

  // 실제 선택된 인덱스를 추적 (photos 배열이 변경되어도 유지)
  const [actualSelectedIndex, setActualSelectedIndex] =
    useState(selectedPhotoIndex);

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

  // 개선된 재정렬 로직
  const reorderedPhotos = useMemo(() => {
    if (photos.length === 0) return [];

    // actualSelectedIndex가 유효한지 확인
    const validIndex = Math.min(
      Math.max(0, actualSelectedIndex),
      photos.length - 1
    );

    // 유효한 인덱스로 업데이트
    if (validIndex !== actualSelectedIndex) {
      setActualSelectedIndex(validIndex);
    }

    const selected = photos[validIndex];
    if (!selected) return photos; // 안전장치

    const before = photos.slice(0, validIndex);
    const after = photos.slice(validIndex + 1);

    return [selected, ...after, ...before];
  }, [photos, actualSelectedIndex]);

  // 원본 인덱스와 재정렬된 인덱스 간의 매핑
  const getOriginalIndex = useMemo(() => {
    return (reorderedIndex: number) => {
      if (reorderedIndex === 0) return actualSelectedIndex;

      const afterLength = photos.length - actualSelectedIndex - 1;

      if (reorderedIndex <= afterLength) {
        return actualSelectedIndex + reorderedIndex;
      } else {
        return reorderedIndex - afterLength - 1;
      }
    };
  }, [photos.length, actualSelectedIndex]);

  // selectedPhotoIndex prop이 변경될 때 actualSelectedIndex 업데이트
  useEffect(() => {
    if (isOpen) {
      setActualSelectedIndex(selectedPhotoIndex);
    }
  }, [selectedPhotoIndex, isOpen]);

  // 다음 페이지를 미리 로드해야 하는지 확인하는 함수
  const checkAndFetchNextPage = useCallback(
    (currentIndex: number) => {
      const originalIndex = getOriginalIndex(currentIndex);
      const remainingPhotos = photos.length - originalIndex - 1;

      if (
        remainingPhotos <= 2 &&
        hasNextPage &&
        !isFetchingNextPage &&
        fetchNextPage &&
        !hasTriggeredFetch
      ) {
        console.log("Fetching next page...", {
          currentIndex,
          originalIndex,
          totalPhotos: photos.length,
          remainingPhotos,
        });
        fetchNextPage();
        setHasTriggeredFetch(true);
      }
    },
    [
      photos.length,
      hasNextPage,
      isFetchingNextPage,
      fetchNextPage,
      getOriginalIndex,
      hasTriggeredFetch,
    ]
  );

  // photos 배열이 업데이트되면 fetch 트리거 리셋
  useEffect(() => {
    if (!isFetchingNextPage) {
      setHasTriggeredFetch(false);
    }
  }, [photos.length, isFetchingNextPage]);

  // Carousel API 초기화 및 이벤트 핸들링
  useEffect(() => {
    if (!api || !isReady) return;

    const handleSelect = () => {
      const newCurrent = api.selectedScrollSnap();

      // 이전 슬라이드의 비디오 일시정지
      if (videoRefsRef.current[current]) {
        videoRefsRef.current[current].pause();
      }

      setCurrent(newCurrent);
      checkAndFetchNextPage(newCurrent);
    };

    // 초기 설정
    setCurrent(api.selectedScrollSnap());
    api.on("select", handleSelect);

    return () => {
      api.off("select", handleSelect);
    };
  }, [api, isReady, current, checkAndFetchNextPage]);

  // 컴포넌트가 열릴 때 초기화
  useEffect(() => {
    if (isOpen) {
      setIsReady(false);
      setCurrent(0);
      setHasTriggeredFetch(false);
      videoRefsRef.current = {};

      // API가 준비되면 isReady를 true로 설정
      if (api) {
        setTimeout(() => {
          api.scrollTo(0, false);
          setIsReady(true);
          checkAndFetchNextPage(0);
        }, 50);
      } else {
        setIsReady(true);
        checkAndFetchNextPage(0);
      }
    } else {
      // 뷰어가 닫힐 때 모든 비디오 일시정지
      Object.values(videoRefsRef.current).forEach((video) => {
        if (video) video.pause();
      });
    }
  }, [isOpen, api, checkAndFetchNextPage]);

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

  // 현재 사진이 유효한지 확인
  if (!currentPhoto) {
    console.error("Current photo is undefined", {
      current,
      currentOriginalIndex,
      photosLength: photos.length,
    });
    return null;
  }

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
    if (!photo) return null; // 안전장치

    if (isVideo(photo.mediaType, photo.url)) {
      return (
        <div className="w-full h-screen flex items-center justify-center">
          <video
            ref={setVideoRef(index)}
            src={photo.url}
            className="max-w-full max-h-full object-contain"
            controls
            autoPlay={index === current}
            muted={false}
            loop={false}
            playsInline
            preload={index === current ? "auto" : "metadata"}
            style={{ maxHeight: "100vh", maxWidth: "100vw" }}
            onLoadedData={() => {
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
          priority={index === 0}
          placeholder="empty"
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
                  startIndex: 0,
                  duration: 0,
                  dragFree: false,
                  containScroll: "keepSnaps",
                  skipSnaps: false,
                  slidesToScroll: 1,
                }}
              >
                <CarouselContent className="w-full h-full -ml-0">
                  {reorderedPhotos.map((photo, index) => {
                    // photo가 undefined인 경우 스킵
                    if (!photo) {
                      console.warn(`Photo at index ${index} is undefined`);
                      return null;
                    }

                    return (
                      <CarouselItem
                        key={`carousel-${photo.fileIdx}-${photo.eventIdx}`}
                        className="h-full pl-0 basis-full min-h-screen"
                      >
                        <div className="relative w-full h-full flex items-center justify-center min-h-screen">
                          <div className="relative w-full h-full min-h-screen">
                            {renderMedia(photo, index)}
                          </div>
                        </div>
                      </CarouselItem>
                    );
                  })}
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
              {currentPhoto &&
                isVideo(currentPhoto.mediaType, currentPhoto.url) && (
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
              {isFetchingNextPage && " (로딩 중...)"}
            </div>

            {currentPhoto && (
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
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenViewer;
