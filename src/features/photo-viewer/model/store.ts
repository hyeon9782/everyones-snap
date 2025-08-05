import { Photo } from "@/entities/photo/model/photo.types";
import { create } from "zustand";

interface PhotoViewerStore {
  viewMode: "grid" | "list" | "grid_on";
  setViewMode: (mode: "grid" | "list" | "grid_on") => void;
  selectedPhotoIndex: number | null;
  setSelectedPhotoIndex: (index: number) => void;
  isSelecting: boolean;
  setIsSelecting: (isSelecting: boolean) => void;
  selectedPhotos: Photo[];
  setSelectedPhotos: (photos: Photo[]) => void;
  page: number;
  setPage: (page: number) => void;
  onlyMyFiles: "y" | "n";
  setOnlyMyFiles: (onlyMyFiles: "y" | "n") => void;
  fileType: "all" | "image" | "video";
  setFileType: (fileType: "all" | "image" | "video") => void;
  sortBy: "createDt";
  setSortBy: (sortBy: "createDt") => void;
  bookmarked: "y" | "n";
  setBookmarked: (bookmarked: "y" | "n") => void;
  sortOrder: "DESC" | "ASC";
  setSortOrder: (sortOrder: "DESC" | "ASC") => void;
}

export const usePhotoViewerStore = create<PhotoViewerStore>((set) => ({
  viewMode: "grid",
  setViewMode: (mode) => set({ viewMode: mode }),
  selectedPhotoIndex: null,
  setSelectedPhotoIndex: (index) => set({ selectedPhotoIndex: index }),
  isSelecting: false,
  setIsSelecting: (isSelecting) => set({ isSelecting }),
  selectedPhotos: [],
  setSelectedPhotos: (photos) => set({ selectedPhotos: photos }),
  page: 1,
  setPage: (page) => set({ page }),
  onlyMyFiles: "n",
  setOnlyMyFiles: (onlyMyFiles) => set({ onlyMyFiles }),
  fileType: "all",
  setFileType: (fileType) => set({ fileType }),
  sortBy: "createDt",
  setSortBy: (sortBy) => set({ sortBy }),
  bookmarked: "n",
  setBookmarked: (bookmarked) => set({ bookmarked }),
  sortOrder: "DESC",
  setSortOrder: (sortOrder) => set({ sortOrder }),
}));
