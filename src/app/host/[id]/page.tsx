import { getEventList } from "@/features/event-create/api/event-create.api";
import EventCard from "@/widgets/event-card";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { httpClient } from "@/shared/api/base-client";

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

  try {
    const { data: eventList } = await getEventList(Number(id));
    console.log("eventList", eventList);
  } catch (error) {
    console.error("Failed to fetch event list:", error);
    // 에러 발생 시 빈 배열로 처리
    const eventList = [];
  }

  return (
    <div className="bg-[#F2F2F7] ">
      <div className="px-4 py-10">
        <EventCard isHost={true} />
      </div>
      <div className="fixed bottom-0 w-full bg-white h-[90px] flex justify-center items-center px-5">
        <Link
          href="/event/create"
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
