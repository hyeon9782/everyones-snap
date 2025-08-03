import GuestbookForm from "@/features/guestbook-write/ui/guestbook-form";
import GuestbookFooter from "@/features/guestbook-write/ui/guestbook-footer";

const GuestbookWritePage = () => {
  return (
    <div className="h-screen bg-[#F1F5F9] flex flex-col gap-5 px-4 pt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-semibold text-[#344054]">
          방명록 작성
        </h1>
      </div>
      <GuestbookForm />
      <GuestbookFooter />
    </div>
  );
};

export default GuestbookWritePage;
