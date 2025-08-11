import { getEventList } from "@/features/event-create/api/event-create.api";
import EventCard from "@/widgets/event-card";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { httpClient } from "@/shared/api/base-client";
import EventFilterBox from "@/features/event-viewer/ui/event-filter-box";
import { CircleAlert } from "lucide-react";

const HostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // 서버 사이드에서 쿠키를 통해 토큰 설정
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    console.log(
      "Found accessToken in cookies:",
      accessToken.substring(0, 10) + "..."
    );
    httpClient.setTokenFromString(accessToken);
  } else {
    console.log("No accessToken found in cookies");
  }

  const events = await getEventList(Number(id));

  // const events = [];

  console.log("eventList", events);

  return (
    <div className="bg-[#F2F2F7] flex flex-col gap-5">
      <EventFilterBox />
      <div className="px-4 pb-[90px]">
        {events.length === 0 ? (
          <div className="flex items-center h-[364px] gap-2 justify-center">
            <CircleAlert className="size-5 text-[#C7C7CC]" />
            <span className="text-[16px] font-semibold text-[#C7C7CC]">
              아직 생성된 이벤트가 없어요.
            </span>
          </div>
        ) : (
          events?.map((event) => (
            <EventCard isHost={true} key={event.eventIdx} event={event} />
          ))
        )}
      </div>
      <div className="fixed bottom-0 w-full bg-white h-[90px] flex justify-center items-center px-5">
        <Link
          href="/event/edit"
          className="w-full rounded-[10px] h-[50px] flex justify-center gap-[6px] items-center text-[18px] font-semibold text-black bg-[#F2F2F7]"
        >
          <Image
            src="/images/add_photo.svg"
            alt="plus"
            width={24}
            height={24}
          />
          이벤트 생성하기
        </Link>
      </div>
    </div>
  );
};

export default HostPage;
