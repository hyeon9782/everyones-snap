import Image from "next/image";

const SecondSection = () => {
  return (
    <section className="h-[610px] flex items-center bg-[#F9FBFD]">
      <div className="flex flex-col gap-10 justify-center items-center w-full">
        <h2 className="text-[#344054] text-center text-[28px] font-semibold">
          번거로웠던 사진 공유 <br /> 이제는{" "}
          <span className="text-[#359EFF]">모두의스냅</span>으로
        </h2>
        <div className="flex flex-col gap-3 w-full px-4">
          <div
            className="gap-5 px-5 py-6 rounded-lg w-full flex items-center"
            style={{
              boxShadow: "0 12px 31.2px -3px rgba(121, 141, 162, 0.27)",
            }}
          >
            <div className="w-10 h-10 flex justify-center items-center">
              <Image
                src="/images/face_right.svg"
                alt="face_right"
                width={26.67}
                height={34.33}
              />
            </div>
            <h3 className="text-[20px] font-semibold text-[#344054]">
              메신저로 사진 요청하기 <br /> 불편하지 않으셨나요?
            </h3>
          </div>
          <div
            className="gap-5 px-5 py-6 rounded-lg w-full flex items-center"
            style={{
              boxShadow: "0 12px 31.2px -3px rgba(121, 141, 162, 0.27)",
            }}
          >
            <div className="w-10 h-10 flex justify-center items-center">
              <Image
                src="/images/hide_image.svg"
                alt="hide_image"
                width={31.96}
                height={31.96}
              />
            </div>
            <h3 className="text-[20px] font-semibold text-[#344054]">
              저화질의 짧은 유효기간으로 <br /> 깜빡하면 사라지는 소중한 추억
            </h3>
          </div>
          <div
            className="gap-5 px-5 py-6 rounded-lg w-full flex items-center"
            style={{
              boxShadow: "0 12px 31.2px -3px rgba(121, 141, 162, 0.27)",
            }}
          >
            <div className="w-10 h-10 flex justify-center items-center">
              <Image
                src="/images/art_track.svg"
                alt="art_track"
                width={36.67}
                height={23.33}
              />
            </div>
            <h3 className="text-[20px] font-semibold text-[#344054]">
              수많은 사진들로 <br /> 관리가 안되는 사진첩
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecondSection;
