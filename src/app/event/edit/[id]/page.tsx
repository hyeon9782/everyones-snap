import { getEventList } from "@/features/event-create/api/event-create.api";
import { httpClient } from "@/shared/api/base-client";
import EventCreateForm from "@/widgets/event-create-form";
import { cookies } from "next/headers";

const EventEditPage = async ({
  params,
}: {
  params: Promise<{ id: number }>;
}) => {
  const { id } = await params;

  // 서버 사이드에서 쿠키를 통해 토큰 설정
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (accessToken) {
    httpClient.setTokenFromString(accessToken);
  }

  const response = await getEventList(id);

  return (
    <main className="bg-[#F2F2F7] flex flex-col gap-5 min-h-screen">
      <EventCreateForm
        initialEvent={response.events[0]}
        planIdx={response.planUsage.planIdx}
      />
    </main>
  );
};

export default EventEditPage;
