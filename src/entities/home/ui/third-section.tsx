import Image from "next/image";

const ThirdSection = () => {
  return (
    <section
      className="h-[1778px] flex items-center justify-center"
      style={{
        background:
          "linear-gradient(to bottom, #F9FBFD 0%, #E6F3FF 20%, #6EB4FF 60%, #6EB4FF 100%)",
      }}
    >
      <div className="flex flex-col gap-10 w-full">
        <h2 className="text-[#344054] text-center text-[24px] font-semibold">
          이제 QR코드를 전달하고 <br /> 사진을 한 곳에서 손쉽게 확인해요
        </h2>
        <div className="flex flex-col px-4 gap-4 w-full">
          <div className="bg-white rounded-lg pt-7 w-full flex flex-col items-center">
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px] font-bold text-[#359EFF] text-center">
                누구나 참여 가능한 <br /> 무설치 웹 기반
              </h2>
              <h3 className="text-[#667085] text-[18px] font-medium text-center">
                앱 다운로드 없이 웹으로 바로 사용
              </h3>
            </div>
            <Image src="/images/Main.png" alt="Main" width={280} height={300} />
          </div>
          <div className="bg-white rounded-lg pt-7 w-full flex flex-col items-center">
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px] font-bold text-[#359EFF] text-center">
                QR코드와 링크로 <br /> 간편하게 전달
              </h2>
              <h3 className="text-[#667085] text-[18px] font-medium text-center">
                간편하게 공유하고 바로 업로드
              </h3>
            </div>
            <Image src="/images/menu.png" alt="menu" width={280} height={300} />
          </div>
          <div className="bg-white rounded-lg pt-7 w-full flex flex-col items-center">
            <div className="flex flex-col gap-3">
              <h2 className="text-[24px] font-bold text-[#359EFF] text-center">
                고화질 원본 사진을 <br /> 실시간으로 공유
              </h2>
              <h3 className="text-[#667085] text-[18px] font-medium text-center">
                원본 사진을 손쉽게 확인&middot;관리
              </h3>
            </div>
            <Image
              src="/images/Gallery.png"
              alt="Gallery"
              width={280}
              height={300}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirdSection;
