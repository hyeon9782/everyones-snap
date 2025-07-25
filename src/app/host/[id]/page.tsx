import EventCard from "@/widgets/event-card";

const HostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return (
    <div className="bg-[#F2F2F7] px-4 py-10">
      <EventCard isHost={true} />
    </div>
  );
};

export default HostPage;
