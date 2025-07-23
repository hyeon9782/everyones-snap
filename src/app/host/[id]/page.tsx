import EventDetailDrawer from "@/features/event-viewer/ui/event-detail-drawer";
import EventShareDrawer from "@/features/event-viewer/ui/event-share-drawer";
import EventCard from "@/widgets/event-card";

const HostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="bg-[#F2F2F7] px-4 py-10">
      <EventCard />
      <EventDetailDrawer />
      <EventShareDrawer />
    </div>
  );
};

export default HostPage;
