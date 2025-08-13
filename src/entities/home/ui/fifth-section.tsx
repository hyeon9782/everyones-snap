import Image from "next/image";

const FifthSection = () => {
  return (
    <section className="h-[1170px] flex items-center justify-center">
      <div className="flex flex-col gap-10 w-full">
        <h2 className="text-[#344054] text-center text-[28px] font-semibold">
          결혼식부터 <br /> 소규모 파티까지 다양하게
        </h2>
        <div className="flex flex-col gap-3 w-full px-4">
          <div className="w-full h-[221px] rounded-lg px-5 py-6 relative overflow-hidden">
            {/* 배경 이미지 */}
            <Image
              src="/images/wed_image.png"
              alt="wedding"
              width={200}
              height={221}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6F3FF] via-[#E6F3FF] to-transparent"></div>

            {/* 컨텐츠 */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex gap-1 items-center">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/celebration.svg"
                    alt="celebration"
                    width={20.62}
                    height={19.57}
                  />
                </div>
                <span className="text-[18px] font-semibold text-[#344054]">
                  결혼식
                </span>
              </div>
              <span className="text-[#344054] text-[14px] font-medium">
                하객이 직접 찍은 소중한 <br /> 순간들을 QR로 간편하게 <br />
                모아보세요. 따로 요청하 <br />지 않아도 자연스럽게 공<br />
                유됩니다.
              </span>
            </div>
          </div>
          <div className="w-full h-[221px] rounded-lg px-5 py-6 relative overflow-hidden">
            {/* 배경 이미지 */}
            <Image
              src="/images/private_party.png"
              alt="private_party"
              width={200}
              height={221}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6F3FF] via-[#E6F3FF] to-transparent"></div>

            {/* 컨텐츠 */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex gap-1 items-center">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/nightlife.svg"
                    alt="nightlife"
                    width={20.62}
                    height={19.57}
                  />
                </div>
                <span className="text-[18px] font-semibold text-[#344054]">
                  프라이빗 파티
                </span>
              </div>
              <span className="text-[#344054] text-[14px] font-medium">
                친구들과의 특별한 모임, <br /> 사진 공유를 번거롭게 하<br />
                지 마세요. QR 하나로 추 <br />
                억을 쉽게 모으고 나눌 수<br />
                있어요.
              </span>
            </div>
          </div>
          <div className="w-full h-[221px] rounded-lg px-5 py-6 relative overflow-hidden">
            {/* 배경 이미지 */}
            <Image
              src="/images/business_image.png"
              alt="business_image"
              width={200}
              height={221}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6F3FF] via-[#E6F3FF] to-transparent"></div>

            {/* 컨텐츠 */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex gap-1 items-center">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/business_center.svg"
                    alt="business_center"
                    width={20}
                    height={19}
                  />
                </div>
                <span className="text-[18px] font-semibold text-[#344054]">
                  기업 행사
                </span>
              </div>
              <span className="text-[#344054] text-[14px] font-medium">
                행사 현장의 다양한 순간 <br /> 을 실시간으로 수집하고, <br />
                브랜드 아카이브나 리포트 <br />에 바로 활용할 수 있습니
                <br />
                다.
              </span>
            </div>
          </div>
          <div className="w-full h-[221px] rounded-lg px-5 py-6 relative overflow-hidden">
            {/* 배경 이미지 */}
            <Image
              src="/images/event_image.png"
              alt="event"
              width={200}
              height={221}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* 그라데이션 오버레이 */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6F3FF] via-[#E6F3FF] to-transparent"></div>

            {/* 컨텐츠 */}
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <div className="w-[24px] h-[24px] flex justify-center items-center">
                  <Image
                    src="/images/person_celebrate.svg"
                    alt="person_celebrate"
                    width={18}
                    height={19}
                  />
                </div>
                <span className="text-[18px] font-semibold text-[#344054]">
                  각종 이벤트
                </span>
              </div>
              <span className="text-[#344054] text-[14px] font-medium">
                동호회 모임, 지역행사, 플 <br /> 리마켓 등 누구나 자유롭 <br />
                게 사진을 업로드하고 공 <br />
                유하는 열린 갤러리를 만<br />
                들어보세요.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FifthSection;
