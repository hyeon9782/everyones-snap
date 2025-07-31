import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#344054] text-white flex flex-col gap-5 px-4 py-10">
      <div className="flex flex-col gap-[10px] text-[14px] font-semibold">
        <span>모두의스냅</span>
        <div className="flex gap-[10px]">
          <span>홈</span>
          <span>무료체험</span>
          <span>가격</span>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 text-[14px] font-normal">
          <span>사업자등록번호ㅣ000-00-0000</span>
          <span>대표ㅣ정홍기</span>
          <span>주소ㅣ인천광역시 남동구 인천로 000길 00, 0층</span>
          <span>통신판매업 신고번호ㅣ2025-인천남동A-0000</span>
          <span>이메일ㅣ@sfe.co.kr</span>
        </div>
        <div className="flex gap-4">
          <Image
            src="/images/instagram.svg"
            alt="instagram"
            width={32}
            height={32}
          />
          <Image
            src="/images/logo_thread.svg"
            alt="thread"
            width={32}
            height={32}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 text-[14px] font-normal">
        <span>Copyright 2025. All rights reserved.</span>
        <span>서비스 이용약관ㅣ개인정보처리방침</span>
      </div>
    </footer>
  );
};

export default Footer;
