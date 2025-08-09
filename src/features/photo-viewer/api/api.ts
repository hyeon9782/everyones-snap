import { httpClient } from "@/shared/api/base-client";
import { GalleryResponse } from "../model/types";
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  UseInfiniteQueryOptions,
} from "@tanstack/react-query";
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
export const useInfinitePhotos = (
  qrToken: string,
  userIdx: number,
  options?: Partial<UseInfiniteQueryOptions<GalleryResponse>>
) => {
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
        page: pageParam as number,
        limit: 10,
      }),
    getNextPageParam: (
      lastPage: GalleryResponse,
      allPages: GalleryResponse[]
    ) => {
      const currentPage = allPages.length;
      const totalPages = Math.ceil(lastPage.fileTotalCount / 10);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
    enabled: qrToken !== "" && userIdx !== undefined,
    ...options,
  });
};

export const bookmarkPhoto = async ({
  eventIdx,
  fileIdx,
  userIdx,
}: {
  eventIdx: number;
  fileIdx: number;
  userIdx: number;
}) => {
  return httpClient.post(`/v1/events/${eventIdx}/gallery/bookmark`, {
    eventIdx,
    fileIdx,
    userIdx,
  });
};

// 북마크 토글 mutation 훅
export const useBookmarkMutation = () => {
  const queryClient = useQueryClient();
  const { toggleBookmark, setPhotoBookmarkStatus } = usePhotoViewerStore();

  return useMutation({
    mutationFn: bookmarkPhoto,
    onMutate: async ({ fileIdx }) => {
      // 현재 북마크 상태를 저장 (롤백용)
      const { bookmarkedPhotos } = usePhotoViewerStore.getState();
      const previousIsBookmarked = bookmarkedPhotos.has(fileIdx);

      // 낙관적 업데이트 - 즉시 UI 상태 변경
      toggleBookmark(fileIdx);

      return { fileIdx, previousIsBookmarked };
    },
    onError: (error, variables, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context) {
        setPhotoBookmarkStatus(context.fileIdx, context.previousIsBookmarked);
      }
      console.error("북마크 토글 실패:", error);
    },
    onSuccess: (data, variables) => {
      // 성공 시 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ["photos"],
      });
    },
  });
};

export const getFileInfo = async ({
  eventIdx,
  fileIdx,
}: {
  eventIdx: number;
  fileIdx: number;
}) => {
  return httpClient
    .get(`/v1/events/${eventIdx}/gallery/file/${fileIdx}`)
    .then((res) => (res.data as any).data);
};
