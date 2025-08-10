import { getPlans } from "@/features/price-viewer/api/api";
import { PriceListHydrated } from "@/features/price-viewer";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

const HydratedPricePage = async () => {
  // QueryClient 인스턴스 생성
  const queryClient = new QueryClient();

  // 서버사이드에서 데이터 프리페칭
  await queryClient.prefetchQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  return (
    <div className="bg-[#344054] min-h-screen flex flex-col gap-10 px-4 py-10">
      <h1 className="text-[28px] font-semibold text-white text-center">
        합리적인 가격으로 <br /> 이용해보세요
      </h1>

      {/* HydrationBoundary로 서버 데이터를 클라이언트에 전달 */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PriceListHydrated />
      </HydrationBoundary>
    </div>
  );
};

export default HydratedPricePage;
