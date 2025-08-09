"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/shared/lib/utils";

interface DualProgressProps
  extends Omit<React.ComponentProps<typeof ProgressPrimitive.Root>, "value"> {
  value1: number; // 첫 번째 값 (예: 사진)
  value2: number; // 두 번째 값 (예: 영상)
  max?: number; // 최대값 (기본 100)
  color1?: string; // 첫 번째 바의 색상 클래스
  color2?: string; // 두 번째 바의 색상 클래스
  label1?: string; // 첫 번째 값의 라벨
  label2?: string; // 두 번째 값의 라벨
  showLabels?: boolean; // 라벨 표시 여부
}

function DualProgress({
  className,
  value1 = 0,
  value2 = 0,
  max = 100,
  color1 = "bg-[#359EFF]",
  color2 = "bg-[#B5A8F8]",
  label1 = "사진",
  label2 = "영상",
  showLabels = true,
  ...props
}: DualProgressProps) {
  // 백분율 계산
  const percentage1 = Math.min((value1 / max) * 100, 100);
  const percentage2 = Math.min((value2 / max) * 100, 100);

  return (
    <div className="w-full">
      <ProgressPrimitive.Root
        data-slot="dual-progress"
        className={cn(
          "bg-white relative h-2 w-full overflow-hidden rounded-sm",
          className
        )}
        {...props}
      >
        {/* 첫 번째 진행바 (사진) */}
        <div
          data-slot="progress-indicator-1"
          className={cn("h-full absolute top-0 left-0 transition-all", color1)}
          style={{ width: `${percentage1}%` }}
        />

        {/* 두 번째 진행바 (영상) */}
        <div
          data-slot="progress-indicator-2"
          className={cn("h-full absolute top-0 transition-all ", color2)}
          style={{
            left: `${percentage1}%`,
            width: `${percentage2}%`,
          }}
        />
      </ProgressPrimitive.Root>

      {showLabels && (
        <div className="flex justify-end gap-[10px] w-full mt-2">
          <div className="flex items-center gap-1">
            <div className={cn("w-2 h-2 rounded-full", color1)} />
            <span className="text-sm">{label1}</span>
          </div>
          <div className="flex items-center gap-1">
            <div className={cn("w-2 h-2 rounded-full", color2)} />
            <span className="text-sm">{label2}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 기존 Progress 컴포넌트도 유지
function Progress({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="bg-primary h-full w-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress, DualProgress };
