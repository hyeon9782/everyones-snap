import { getGuestbookById } from "@/features/guestbook-viewer/api/api";
import GuestbookForm from "@/features/guestbook-write/ui/guestbook-form";

const GuestbookEditPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ eventIdx: string; qrToken: string }>;
}) => {
  const { id } = await params;
  const { eventIdx, qrToken } = await searchParams;
  const guestbook = await getGuestbookById(Number(id));

  console.log("guestbook", guestbook);

  return (
    <div className="h-screen bg-[#F1F5F9] flex flex-col gap-5 px-4 pt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-semibold text-[#344054]">
          방명록 수정
        </h1>
      </div>
      <GuestbookForm
        eventIdx={Number(eventIdx)}
        visitorNoteIdx={Number(id)}
        initialContent={guestbook?.content}
        initialBackground={guestbook?.backgroundColor}
        initialFont={guestbook?.font}
        qrToken={qrToken}
      />
    </div>
  );
};

export default GuestbookEditPage;
