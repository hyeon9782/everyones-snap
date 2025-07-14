"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Photo } from "@/entities/photo/model/photo.types";

interface FullscreenViewerProps {
  photo: Photo | null;
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
  photo,
  isOpen,
  onClose,
  initialPosition,
}: FullscreenViewerProps) => {
  if (!photo) return null;

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
            className="relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photo.url}
              alt={photo.title}
              fill
              className="object-contain"
              priority
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FullscreenViewer;
