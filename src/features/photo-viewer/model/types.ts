import { Photo } from "@/entities/photo/model/photo.types";
import { Event } from "@/entities/event/model/event.types";

export interface GalleryResponse {
  fileTotalCount: number;
  files: Photo[];
  event: Event;
}

export interface FileInfo {
  fileName: string;
  fileSize: number;
  uploadedBy: string;
  createdDate: string;
}
