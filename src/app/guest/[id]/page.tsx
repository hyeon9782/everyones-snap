import { getEventByQrToken } from "@/features/event-viewer/api/api";
import EventCard from "@/widgets/event-card";

const GuestPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const event = await getEventByQrToken(id);

  console.log("guest event", event);

  return (
    <main className="bg-[#F2F2F7] px-4 py-10">
      <EventCard isHost={false} event={event} />
    </main>
  );
};

export default GuestPage;
