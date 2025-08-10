# Price Viewer Feature

서버사이드에서 데이터를 패칭하고 TanStack Query로 캐싱하는 가격 정보 표시 기능입니다.

## 🚀 구현된 방식들

### 1. 기본 방식 (useEffect + setQueryData)

**장점:**
- 간단한 구현
- 기존 코드와 호환성 좋음

**사용법:**
```tsx
// 서버 컴포넌트
const PricePage = async () => {
  const plans = await getPlans();
  return <PriceList initialPlans={plans} />;
};

// 클라이언트 컴포넌트
const PriceList = ({ initialPlans }) => {
  const queryClient = useQueryClient();
  
  useEffect(() => {
    queryClient.setQueryData(["plans"], initialPlans);
  }, [initialPlans, queryClient]);

  const { data: plans } = usePlans();
  // ...
};
```

### 2. 권장 방식 (HydrationBoundary)

**장점:**
- 더 효율적인 하이드레이션
- 서버 상태를 클라이언트에 정확하게 전달
- Next.js App Router와 최적화

**사용법:**
```tsx
// 서버 컴포넌트
const HydratedPricePage = async () => {
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PriceListHydrated />
    </HydrationBoundary>
  );
};

// 클라이언트 컴포넌트
const PriceListHydrated = () => {
  const { data: plans } = usePlans(); // 이미 캐시됨
  // ...
};
```

## 📁 파일 구조

```
src/features/price-viewer/
├── api/
│   └── api.ts              # API 함수와 TanStack Query 훅
├── model/
│   └── types.ts            # Plan 타입 정의
├── ui/
│   ├── price-card.tsx      # 개별 가격 카드
│   ├── price-list.tsx      # 기본 방식의 가격 목록
│   └── price-list-hydrated.tsx # HydrationBoundary 방식
├── index.ts                 # Public API
└── README.md               # 이 파일
```

## 🔧 API 훅

### usePlans()
```tsx
const { data: plans, isLoading, error } = usePlans();
```

**설정:**
- `staleTime`: 5분 (5분 동안은 fresh 상태)
- `gcTime`: 10분 (10분 동안 캐시 유지)

## 🎯 사용 예시

### 기본 페이지
```tsx
// app/price/page.tsx
import { PriceList } from "@/features/price-viewer";

const PricePage = async () => {
  const plans = await getPlans();
  return <PriceList initialPlans={plans} />;
};
```

### 하이드레이션 페이지
```tsx
// app/price/hydrated/page.tsx
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { PriceListHydrated } from "@/features/price-viewer";

const HydratedPricePage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["plans"],
    queryFn: getPlans,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PriceListHydrated />
    </HydrationBoundary>
  );
};
```

## 💡 장점

1. **SEO 최적화**: 서버사이드에서 데이터 렌더링
2. **성능 향상**: 초기 로딩 시 서버 데이터 즉시 표시
3. **캐싱**: TanStack Query로 클라이언트 상태 관리
4. **사용자 경험**: 로딩 상태와 에러 처리
5. **데이터 동기화**: 서버와 클라이언트 데이터 일치

## 🔄 데이터 흐름

1. **서버**: `getPlans()` 호출하여 데이터 패칭
2. **하이드레이션**: 서버 데이터를 클라이언트 캐시에 전달
3. **클라이언트**: `usePlans()` 훅으로 캐시된 데이터 사용
4. **업데이트**: 필요시 백그라운드에서 데이터 리페칭
