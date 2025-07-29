import EventCreateForm from "@/widgets/event-create-form";

const EventEditPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // const initialEvent = await getEvent(id);

  return (
    <main>
      <EventCreateForm initialEvent={initialEvent} />
    </main>
  );
};

export default EventEditPage;
