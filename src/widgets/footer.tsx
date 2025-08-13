import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#344054] text-white flex flex-col gap-5 px-4 py-10">
      <div className="flex flex-col gap-[10px] text-[14px] font-semibold">
        <span>모두의스냅</span>
        <div className="flex gap-[10px]">
          <Link href="/">홈</Link>
          <Link href="/login">무료체험</Link>
          <Link href="/price">가격</Link>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-[14px] font-normal">
          <span>사업자등록번호ㅣ561-07-03011</span>
          <span>대표ㅣ정홍기</span>
          <span>주소ㅣ서울특별시 성동구 무학봉 16길 22, 3층</span>
          <span>통신판매업 신고번호ㅣ2025-서울성동-1234</span>
          <span>이메일ㅣsolvers.official@gmail.com</span>
        </div>
        <div className="flex gap-4">
          <Link href="https://www.instagram.com/mywed_log/" target="_blank">
            <Image
              src="/images/instagram.svg"
              alt="instagram"
              width={32}
              height={32}
            />
          </Link>
          <Link href="https://www.threads.com/@mywed_log" target="_blank">
            <Image
              src="/images/logo_thread.svg"
              alt="thread"
              width={32}
              height={32}
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[14px] font-normal">
        <span>Copyright 2025. All rights reserved.</span>
        <span>
          <Link
            href={`https://imminent-drop-afd.notion.site/24e5eb23b550800584d9d017dc635da3?pvs=73`}
            target="_blank"
          >
            서비스 이용약관
          </Link>
          ㅣ
          <Link
            href={`https://imminent-drop-afd.notion.site/24e5eb23b55080b2addcc3ba21848bc9`}
            target="_blank"
          >
            개인정보처리방침
          </Link>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
