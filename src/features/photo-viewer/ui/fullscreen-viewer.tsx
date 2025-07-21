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
import { useState, useEffect, useMemo } from "react";

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
      setCurrent(api.selectedScrollSnap());
    });

    return () => {
      api.off("select");
    };
  }, [api]);

  // 컴포넌트가 열릴 때마다 초기화
  useEffect(() => {
    if (isOpen) {
      setIsReady(false);
      setCurrent(0);
    }
  }, [isOpen]);

  if (photos.length === 0) return null;

  const currentOriginalIndex = getOriginalIndex(current);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
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
                      key={`${photo.id}-${index}`}
                      className="h-full pl-0 basis-full min-h-screen"
                    >
                      <div className="relative w-full h-full flex items-center justify-center min-h-screen">
                        <div className="relative w-full h-full min-h-screen">
                          <Image
                            src={photo.url}
                            alt={photo.title}
                            fill
                            sizes="100vw"
                            className="object-contain"
                            priority={index === 0} // 첫 번째 이미지만 priority
                            placeholder="empty" // placeholder 제거로 더 빠른 로딩
                          />
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

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentOriginalIndex + 1} / {photos.length}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenViewer;
