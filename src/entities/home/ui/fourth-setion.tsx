const FourthSetion = () => {
  return (
    <section className="h-[678px] flex items-center justify-center bg-[#E6F3FF]">
      <div className="flex flex-col gap-10 w-full">
        <h2 className="text-[#344054] text-center text-[28px] font-semibold">
          모두의스냅 <br /> 이렇게 사용할 수 있어요
        </h2>
        <div className="flex flex-col gap-3 px-4 w-full">
          <div
            className="bg-white w-full rounded-lg flex gap-3 items-center px-5 py-6"
            style={{
              boxShadow: "0 12px 31.2px -3px rgba(121, 141, 162, 0.27)",
            }}
          >
            <div className="w-[28px] h-[28px] flex justify-center items-center">
              <div className="w-[23.33px] h-[23.33px] bg-[#359EFF] rounded-full flex justify-center items-center text-[16px] font-semibold text-white">
                1
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[20px] font-semibold text-[#344054]">
                이벤트 만들기
              </h3>
              <span className="text-[#667085] text-[16px] font-medium">
                이벤트 이름과 정보를 입력하고 생성.
              </span>
            </div>
          </div>
          <div
            className="bg-white w-full rounded-lg flex gap-3 items-center px-5 py-6"
            style={{
              boxShadow: "0 12px 31.2px -3px rgba(121, 141, 162, 0.27)",
            }}
          >
            <div className="w-[28px] h-[28px] flex justify-center items-center">
              <div className="w-[23.33px] h-[23.33px] bg-[#359EFF] rounded-full flex justify-center items-center text-[16px] font-semibold text-white">
                2
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[20px] font-semibold text-[#344054]">
                QR코드&middot;링크 공유
              </h3>
              <span className="text-[#667085] text-[16px] font-medium">
                친구들과 쉽게 나누세요.
              </span>
            </div>
          </div>
          <div
            className="bg-white w-full rounded-lg flex gap-3 items-center px-5 py-6"
            style={{
              boxShadow: "0 12px 31.2px -3px rgba(121, 141, 162, 0.27)",
            }}
          >
            <div className="w-[28px] h-[28px] flex justify-center items-center">
              <div className="w-[23.33px] h-[23.33px] bg-[#359EFF] rounded-full flex justify-center items-center text-[16px] font-semibold text-white">
                3
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[20px] font-semibold text-[#344054]">
                사진&middot;영상 업로드
              </h3>
              <span className="text-[#667085] text-[16px] font-medium">
                앱 설치 없이 바로 업로드하세요.
              </span>
            </div>
          </div>
          <div
            className="bg-white w-full rounded-lg flex gap-3 items-center px-5 py-6"
            style={{
              boxShadow: "0 12px 31.2px -3px rgba(121, 141, 162, 0.27)",
            }}
          >
            <div className="w-[28px] h-[28px] flex justify-center items-center">
              <div className="w-[23.33px] h-[23.33px] bg-[#359EFF] rounded-full flex justify-center items-center text-[16px] font-semibold text-white">
                4
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-[20px] font-semibold text-[#344054]">
                함께 보는 갤러리
              </h3>
              <span className="text-[#667085] text-[16px] font-medium">
                게스트와 함께 사진을 공유해요.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthSetion;
