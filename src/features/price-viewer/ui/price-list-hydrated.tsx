"use client";

import { Plan } from "../model/types";
import PriceCard from "./price-card";
import { usePlans } from "../api/api";

const PriceListHydrated = () => {
  // TanStack Query로 데이터 가져오기 (HydrationBoundary로 이미 캐시됨)
  const { data: plans, isLoading, error } = usePlans();

  if (isLoading && !plans) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg px-6 pt-10 pb-5 h-[400px] animate-pulse">
            <div className="bg-gray-200 h-8 rounded mb-4"></div>
            <div className="bg-gray-200 h-6 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        가격 정보를 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {plans?.map((plan) => (
        <PriceCard key={plan.planIdx} plan={plan} />
      ))}
    </div>
  );
};

export default PriceListHydrated;
