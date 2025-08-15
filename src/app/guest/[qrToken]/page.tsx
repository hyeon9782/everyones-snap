"use client";

import { getEventByQrToken } from "@/features/event-viewer/api/api";
import GuestRegistDialog from "@/features/guest-regist/ui/guest-regist-dialog";
import EventCard from "@/widgets/event-card";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { isFirstVisit } from "@/features/guest-regist/lib/guest-utils";

const GuestPage = () => {
  const params = useParams();
  const qrToken = params.qrToken as string;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", qrToken],
    queryFn: () => getEventByQrToken(qrToken),
    enabled: !!qrToken,
  });

  // 이벤트 데이터가 로드되면 첫 방문인지 확인
  useEffect(() => {
    if (event?.eventIdx) {
      const firstVisit = isFirstVisit(event.eventIdx);
      setIsDialogOpen(firstVisit);
    }
  }, [event]);

  if (error) {
    return (
      <main className="bg-[#F2F2F7] px-4 py-10 min-h-screen">
        <div className="flex justify-center items-center h-screen">
          <div className="text-red-500">이벤트를 불러오는데 실패했습니다.</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#F2F2F7] px-4 py-10 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : event ? (
        <div>
          <EventCard isHost={false} event={event} />

          {/* 첫 방문일 때만 다이얼로그 표시 */}
          <GuestRegistDialog
            eventIdx={event.eventIdx}
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div>이벤트를 찾을 수 없습니다.</div>
        </div>
      )}
    </main>
  );
};

export default GuestPage;
