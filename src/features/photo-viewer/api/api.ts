import { httpClient } from "@/shared/api/base-client";
import { GalleryResponse } from "../model/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePhotoViewerStore } from "../model/store";

export const getPhotos = async ({
  qrToken,
  userIdx,
  guestIdx,
  onlyMyFiles,
  fileType,
  sortBy,
  bookmarked,
  sortOrder,
  page = 1,
  limit = 10,
}: {
  qrToken: string;
  userIdx: number;
  guestIdx: number;
  onlyMyFiles: string;
  fileType: string;
  sortBy: string;
  bookmarked: string;
  sortOrder: string;
  page?: number;
  limit?: number;
}): Promise<GalleryResponse> => {
  return httpClient
    .get(
      `/v1/events/gallery/${qrToken}?page=${page}&limit=${limit}&userIdx=${userIdx}&guestIdx=${guestIdx}&onlyMyFiles=${onlyMyFiles}&fileType=${fileType}&sortBy=${sortBy}&bookmarked=${bookmarked}&sortOrder=${sortOrder}`
    )
    .then((res) => (res.data as any).data);
};

// 무한 스크롤을 위한 훅
export const useInfinitePhotos = (qrToken: string, userIdx: number) => {
  const { onlyMyFiles, fileType, sortBy, bookmarked, sortOrder } =
    usePhotoViewerStore();

  return useInfiniteQuery({
    queryKey: [
      "photos",
      "infinite",
      qrToken,
      userIdx,
      onlyMyFiles,
      fileType,
      sortBy,
      bookmarked,
      sortOrder,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getPhotos({
        qrToken,
        userIdx,
        guestIdx: 0,
        onlyMyFiles,
        fileType,
        sortBy,
        bookmarked,
        sortOrder,
        page: pageParam,
        limit: 10,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.fileTotalCount / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });
};
