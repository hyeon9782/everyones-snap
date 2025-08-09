"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/shared/ui/progress";
import { X, Download, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface DownloadProgressToastProps {
  isVisible: boolean;
  current: number;
  total: number;
  filename: string;
  status: "downloading" | "completed" | "error";
  errorMessage?: string;
  onClose: () => void;
}

const DownloadProgressToast = ({
  isVisible,
  current,
  total,
  filename,
  status,
  errorMessage,
  onClose,
}: DownloadProgressToastProps) => {
  const [shouldShow, setShouldShow] = useState(false);

  const progress = total > 0 ? (current / total) * 100 : 0;

  useEffect(() => {
    if (isVisible) {
      setShouldShow(true);
    } else {
      // 애니메이션을 위해 약간의 지연
      const timer = setTimeout(() => setShouldShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // 완료 후 자동 닫기
  useEffect(() => {
    if (status === "completed") {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onClose]);

  if (!shouldShow) return null;

  const getStatusIcon = () => {
    switch (status) {
      case "downloading":
        return <Download className="size-5 text-blue-500 animate-bounce" />;
      case "completed":
        return <CheckCircle className="size-5 text-green-500" />;
      case "error":
        return <AlertCircle className="size-5 text-red-500" />;
      default:
        return <Download className="size-5 text-blue-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "downloading":
        return `다운로드 중... (${current}/${total})`;
      case "completed":
        return "다운로드 완료!";
      case "error":
        return "다운로드 실패";
      default:
        return "다운로드 준비 중...";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "downloading":
        return "border-blue-200 bg-blue-50";
      case "completed":
        return "border-green-200 bg-green-50";
      case "error":
        return "border-red-200 bg-red-50";
      default:
        return "border-gray-200 bg-white";
    }
  };

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 w-80 rounded-lg border p-4 shadow-lg transition-all duration-300",
        getStatusColor(),
        isVisible
          ? "transform translate-y-0 opacity-100"
          : "transform translate-y-2 opacity-0"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">
              {getStatusText()}
            </p>
            <p className="text-xs text-gray-500 truncate">{filename}</p>
            {status === "error" && errorMessage && (
              <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="size-4" />
        </button>
      </div>

      {status === "downloading" && total > 1 && (
        <div className="mt-3">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-gray-500 mt-1 text-center">
            {Math.round(progress)}% 완료
          </p>
        </div>
      )}
    </div>
  );
};

export default DownloadProgressToast;
