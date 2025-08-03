import Image from "next/image";
import Link from "next/link";
import React from "react";

const GuestbookPage = () => {
  return (
    <div className="h-screen flex flex-col gap-5 px-4 pt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-[20px] font-semibold text-[#344054]">방명록</h1>
        <Link
          href="/guestbook/write"
          className="flex items-center justify-center bg-[#F1F5F9] rounded-full w-[36px] h-[36px]"
        >
          <Image src="/images/edit.svg" alt="edit" width={15.81} height={15} />
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default GuestbookPage;
