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
  // 북마크 상태 관리
  bookmarkedPhotos: Set<number>;
  toggleBookmark: (fileIdx: number) => void;
  setPhotoBookmarkStatus: (fileIdx: number, isBookmarked: boolean) => void;
  initializeBookmarks: (photos: Photo[]) => void;
}

export const usePhotoViewerStore = create<PhotoViewerStore>((set, get) => ({
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
  // 북마크 상태 관리
  bookmarkedPhotos: new Set<number>(),
  toggleBookmark: (fileIdx) => {
    const { bookmarkedPhotos } = get();
    const newBookmarkedPhotos = new Set(bookmarkedPhotos);
    if (newBookmarkedPhotos.has(fileIdx)) {
      newBookmarkedPhotos.delete(fileIdx);
    } else {
      newBookmarkedPhotos.add(fileIdx);
    }
    set({ bookmarkedPhotos: newBookmarkedPhotos });
  },
  setPhotoBookmarkStatus: (fileIdx, isBookmarked) => {
    const { bookmarkedPhotos } = get();
    const newBookmarkedPhotos = new Set(bookmarkedPhotos);
    if (isBookmarked) {
      newBookmarkedPhotos.add(fileIdx);
    } else {
      newBookmarkedPhotos.delete(fileIdx);
    }
    set({ bookmarkedPhotos: newBookmarkedPhotos });
  },
  initializeBookmarks: (photos) => {
    const { bookmarkedPhotos: currentBookmarks } = get();
    const bookmarkedFileIds = new Set<number>();

    photos.forEach((photo) => {
      if (photo.isBookmarked) {
        bookmarkedFileIds.add(photo.fileIdx);
      }
    });

    // 현재 북마크 상태와 다를 때만 업데이트
    const currentBookmarksArray = Array.from(currentBookmarks).sort();
    const newBookmarksArray = Array.from(bookmarkedFileIds).sort();
    const isDifferent =
      JSON.stringify(currentBookmarksArray) !==
      JSON.stringify(newBookmarksArray);

    if (isDifferent) {
      set({ bookmarkedPhotos: bookmarkedFileIds });
    }
  },
}));
