"use client";

import PhotoGalleryGrid from "@/widgets/photo-gallery-grid";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { useInfinitePhotos } from "@/features/photo-viewer/api/api";
import UploadDrawer from "@/features/photo-upload/ui/upload-drawer";
import Link from "next/link";
import GalleryToolbar from "@/features/photo-viewer/ui/gallery-toolbar";
import { useEffect, useState, useCallback, useMemo } from "react";
import { getCookie } from "@/shared/lib/cookie-utils";
import { usePhotoViewerStore } from "@/features/photo-viewer/model/store";

const GalleryPage = ({ params }: { params: Promise<{ qrToken: string }> }) => {
  const [qrToken, setQrToken] = useState<string>("");
  const [userIdx, setUserIdx] = useState<number>(0);
  const [isParamsLoaded, setIsParamsLoaded] = useState(false);
  const { initializeBookmarks } = usePhotoViewerStore();

  // 클라이언트에서 파라미터 초기화
  useEffect(() => {
    const initializeParams = async () => {
      const { qrToken: token } = await params;
      const storedUserIdx = getCookie("userIdx");

      setQrToken(token);
      setUserIdx(storedUserIdx ? Number(storedUserIdx) : 0);
      setIsParamsLoaded(true);
    };

    initializeParams();
  }, [params]);

  // 무한 쿼리 사용
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfinitePhotos(qrToken, userIdx);

  // 모든 페이지의 사진들을 하나의 배열로 합치기
  const allPhotos =
    (data as any)?.pages?.flatMap((page: any) => page.files) || [];
  const eventData = (data as any)?.pages?.[0]?.event;

  // 북마크된 사진들의 fileIdx만 메모이제이션
  const bookmarkedFileIds = useMemo(() => {
    return allPhotos
      .filter((photo: any) => photo.isBookmarked)
      .map((photo: any) => photo.fileIdx)
      .join(","); // 문자열로 변환하여 비교 가능하게 만듦
  }, [allPhotos]);

  // 북마크된 사진 ID가 변경될 때만 초기화
  useEffect(() => {
    if (allPhotos.length > 0) {
      initializeBookmarks(allPhotos);
    }
  }, [bookmarkedFileIds, initializeBookmarks]);

  // 스크롤 이벤트 핸들러 (useCallback으로 최적화)
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 스크롤이 하단에서 200px 이내에 도달했을 때 다음 페이지 로드
    if (scrollTop + windowHeight >= documentHeight - 200) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!isParamsLoaded || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">데이터를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <GalleryToolbar eventIdx={Number(eventData?.eventIdx)} />
      <PhotoGalleryGrid
        photos={allPhotos}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />

      {/* 로딩 인디케이터 */}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">
            더 많은 사진을 불러오는 중...
          </span>
        </div>
      )}

      {/* 더 이상 로드할 데이터가 없을 때 */}
      {!hasNextPage && allPhotos.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          모든 사진을 불러왔습니다.
        </div>
      )}

      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center h-[72px] w-full bg-white gap-2 px-4 md:w-[375px] mx-auto">
        <Button className="w-[48px] h-[48px] bg-[#F1F5F9] rounded-xl">
          <Image
            src="/images/download.svg"
            alt="download"
            width={13.33}
            height={13.33}
          />
        </Button>
        <UploadDrawer eventIdx={Number(eventData?.eventIdx || 0)} />
        <Link
          href={`/guestbook/${qrToken}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#F1F5F9] rounded-xl h-[48px] text-[16px] font-semibold text-[#344054]"
        >
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            <Image
              src="/images/checkbook.svg"
              alt="guestbook"
              width={21.02}
              height={16}
            />
          </div>
          방명록
        </Link>
      </div>
    </div>
  );
};

export default GalleryPage;
