import Image from "next/image";
import Link from "next/link";

const EighthSection = () => {
  return (
    <section className="h-[400px] relative">
      <Image
        src="/images/main_last.png"
        alt="home"
        fill
        className="object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <h2 className="text-center text-[24px] font-semibold text-white mb-5">
          우리의 순간을 모두 함께 <br /> 기록하는 방법, 모두의스냅
        </h2>
        <div className="flex gap-3">
          <Link
            href="/login"
            className="bg-[#FFFFFF]/80 text-[#344054] font-semibold text-[16px] rounded-lg px-4 py-2"
          >
            무료 체험하기
          </Link>
          <Link
            href="/price"
            className="bg-[#FFFFFF]/80 text-[#344054] font-semibold text-[16px] rounded-lg px-4 py-2"
          >
            시작하기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EighthSection;
