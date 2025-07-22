import EventCard from "@/widgets/event-card";

const GuestPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // const guest = await getGuest(id);

  return (
    <main className="bg-[#F2F2F7] px-4 py-10">
      <EventCard />
    </main>
  );
};

export default GuestPage;
