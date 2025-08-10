import { getPlans } from "@/features/price-viewer/api/api";
import PriceCard from "@/features/price-viewer/ui/price-card";

const PricePage = async () => {
  const plans = await getPlans();
  console.log(plans);
  return (
    <div className="bg-[#344054] min-h-screen flex flex-col gap-10 px-4 py-10">
      <h1 className="text-[28px] font-semibold text-white text-center">
        합리적인 가격으로 <br /> 이용해보세요
      </h1>
      <div className="flex flex-col gap-4">
        {plans?.map((plan) => (
          <PriceCard key={plan.planIdx} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default PricePage;
