import { queryKeys } from "@/shared/lib";
import { useApiQuery } from "@/shared/lib/hooks/use-query";
import { useApiMutation } from "@/shared/lib/hooks/use-mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Photo } from "../model/photo.types";

// API 함수들
export const photoApi = {
  // 사진 목록 조회
  getPhotos: async (): Promise<Photo[]> => {
    const response = await fetch("/api/photos");
    if (!response.ok) {
      throw new Error("Failed to fetch photos");
    }
    return response.json();
  },

  // 사진 상세 조회
  getPhoto: async (id: string): Promise<Photo> => {
    const response = await fetch(`/api/photos/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch photo");
    }
    return response.json();
  },

  // 사진 업로드
  uploadPhoto: async (file: File): Promise<Photo> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/photos/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload photo");
    }
    return response.json();
  },

  // 사진 삭제
  deletePhoto: async (id: string): Promise<void> => {
    const response = await fetch(`/api/photos/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete photo");
    }
  },
};

// 커스텀 훅들
export const usePhotos = () => {
  return useApiQuery(queryKeys.photos.lists(), photoApi.getPhotos);
};

export const usePhoto = (id: string) => {
  return useApiQuery(queryKeys.photos.detail(id), () => photoApi.getPhoto(id), {
    enabled: !!id, // id가 있을 때만 실행
  });
};

export const useUploadPhoto = () => {
  const queryClient = useQueryClient();

  return useApiMutation(photoApi.uploadPhoto, {
    onSuccess: () => {
      // 업로드 성공 시 사진 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.photos.lists() });
    },
  });
};

export const useDeletePhoto = () => {
  const queryClient = useQueryClient();

  return useApiMutation(photoApi.deletePhoto, {
    onSuccess: () => {
      // 삭제 성공 시 사진 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: queryKeys.photos.lists() });
    },
  });
};
