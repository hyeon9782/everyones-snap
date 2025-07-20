"use client";
import { useEffect, useRef, useState } from "react";

interface ScrollPickerProps {
  items: (string | number)[];
  selectedIndex: number;
  onSelectionChange: (index: number) => void;
  height?: number;
  itemHeight?: number;
}

const ScrollPicker: React.FC<ScrollPickerProps> = ({
  items,
  selectedIndex,
  onSelectionChange,
  height = 240,
  itemHeight = 60,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 전체 콘텐츠 높이 (중앙 정렬을 위한 여분 공간 포함)
  const visibleItems = Math.floor(height / itemHeight);
  const centerOffset = Math.floor(visibleItems / 2);

  useEffect(() => {
    if (containerRef.current && !isScrolling) {
      // 선택된 아이템이 정확히 중앙에 오도록 스크롤
      const targetScrollTop =
        (selectedIndex + centerOffset) * itemHeight -
        height / 2 +
        itemHeight / 2;
      containerRef.current.scrollTo({
        top: targetScrollTop,
        behavior: "smooth",
      });
    }
  }, [selectedIndex, itemHeight, isScrolling, height, centerOffset]);

  const handleScroll = () => {
    if (!containerRef.current) return;

    setIsScrolling(true);

    const scrollTop = containerRef.current.scrollTop;
    const containerCenter = scrollTop + height / 2;

    // 각 실제 아이템의 중앙 위치와 컨테이너 중앙 사이의 거리를 계산
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < items.length; i++) {
      const itemCenter = (i + centerOffset) * itemHeight + itemHeight / 2;
      const distance = Math.abs(containerCenter - itemCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }

    if (closestIndex !== selectedIndex) {
      onSelectionChange(closestIndex);
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
      // 가장 가까운 아이템으로 스냅
      if (containerRef.current) {
        const targetScrollTop =
          (closestIndex + centerOffset) * itemHeight -
          height / 2 +
          itemHeight / 2;
        containerRef.current.scrollTo({
          top: targetScrollTop,
          behavior: "smooth",
        });
      }
    }, 150);
  };

  const handleItemClick = (index: number) => {
    onSelectionChange(index);
  };

  // 렌더링할 아이템 배열 생성 (앞뒤에 빈 공간 추가)
  const renderItems = [];

  // 앞쪽 빈 공간
  for (let i = 0; i < centerOffset; i++) {
    renderItems.push({ type: "empty", key: `empty-start-${i}` });
  }

  // 실제 아이템들
  for (let i = 0; i < items.length; i++) {
    renderItems.push({
      type: "item",
      key: `item-${i}`,
      index: i,
      value: items[i],
    });
  }

  // 뒤쪽 빈 공간
  for (let i = 0; i < centerOffset; i++) {
    renderItems.push({ type: "empty", key: `empty-end-${i}` });
  }

  return (
    <div className="relative overflow-hidden" style={{ height: `${height}px` }}>
      {/* 중앙 선택 영역 하이라이트 */}
      <div
        className="absolute left-0 right-0 bg-gray-100 border-gray-300 pointer-events-none z-0"
        style={{
          top: `${height / 2 - itemHeight / 2}px`,
          height: `${itemHeight}px`,
        }}
      />

      <div
        ref={containerRef}
        className="h-full overflow-y-auto relative z-10"
        onScroll={handleScroll}
        style={{
          scrollSnapType: "y mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {renderItems.map((renderItem) => {
          if (renderItem.type === "empty") {
            return (
              <div key={renderItem.key} style={{ height: `${itemHeight}px` }} />
            );
          }

          const index = renderItem.index!;
          const distance = Math.abs(index - selectedIndex);
          const opacity = Math.max(0.3, 1 - distance * 0.25);
          const scale = Math.max(0.8, 1 - distance * 0.1);
          const isSelected = index === selectedIndex;

          return (
            <div
              key={renderItem.key}
              className={`flex items-center justify-center cursor-pointer transition-all duration-200 relative z-20 ${
                isSelected
                  ? "text-black text-3xl font-semibold"
                  : "text-gray-500 text-2xl font-normal"
              }`}
              style={{
                height: `${itemHeight}px`,
                opacity,
                transform: `scale(${scale})`,
                scrollSnapAlign: "center",
              }}
              onClick={() => handleItemClick(index)}
            >
              {renderItem.value}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ScrollPicker;
