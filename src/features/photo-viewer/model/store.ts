import { create } from "zustand";

interface PhotoViewerStore {
  viewMode: "grid" | "list" | "grid_on";
  setViewMode: (mode: "grid" | "list" | "grid_on") => void;
  selectedPhotoIndex: number | null;
  setSelectedPhotoIndex: (index: number) => void;
}

export const usePhotoViewerStore = create<PhotoViewerStore>((set) => ({
  viewMode: "grid",
  setViewMode: (mode) => set({ viewMode: mode }),
  selectedPhotoIndex: null,
  setSelectedPhotoIndex: (index) => set({ selectedPhotoIndex: index }),
}));
