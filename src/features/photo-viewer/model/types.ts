import { Photo } from "@/entities/photo/model/photo.types";
import { Event } from "@/entities/event/model/event.types";

export interface GalleryResponse {
  fileTotalCount: number;
  files: Photo[];
  event: Event;
}

export interface FileInfo {
  fileIdx: number;
  eventIdx: number;
  userIdx: number;
  guestIdx: number;
  mediaType: string;
  type: string;
  url: string;
  isThumbnail: string;
  fileSize: number;
  fileName: string;
  targetType: string;
  deleteYn: string;
  createDt: string;
  updateDt: string | null;
  isBookmarked: boolean;
}
