import { getPlans } from "@/features/price-viewer/api/api";
import { PriceList } from "@/features/price-viewer";

const PricePage = async () => {
  // 서버사이드에서 데이터 패칭
  const plans = await getPlans();

  return (
    <div className="bg-[#344054] min-h-screen flex flex-col gap-10 px-4 py-10">
      <h1 className="text-[28px] font-semibold text-white text-center">
        합리적인 가격으로 <br /> 이용해보세요
      </h1>
      {/* 서버에서 받은 초기 데이터를 클라이언트 컴포넌트에 전달 */}
      <PriceList initialPlans={plans} />
    </div>
  );
};

export default PricePage;
