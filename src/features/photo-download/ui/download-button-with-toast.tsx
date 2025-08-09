"use client";

import { useState } from "react";
import DownloadButton from "./download-button";
import DownloadProgressToast from "./download-progress-toast";

interface DownloadButtonWithToastProps {
  eventIdx: number;
  fileIdxs: number[];
  className?: string;
  fileName: string;
}

const DownloadButtonWithToast = ({
  eventIdx,
  fileIdxs,
  className,
  fileName,
}: DownloadButtonWithToastProps) => {
  const [toastState, setToastState] = useState({
    isVisible: false,
    current: 0,
    total: 0,
    filename: "",
    status: "downloading" as "downloading" | "completed" | "error",
    errorMessage: "",
  });

  const handleDownloadStart = () => {
    setToastState({
      isVisible: true,
      current: 0,
      total: fileIdxs.length,
      filename: "다운로드 준비 중...",
      status: "downloading",
      errorMessage: "",
    });
  };

  const handleProgress = (current: number, total: number, filename: string) => {
    setToastState((prev) => ({
      ...prev,
      current,
      total,
      filename,
      status: "downloading",
    }));
  };

  const handleDownloadComplete = () => {
    setToastState((prev) => ({
      ...prev,
      status: "completed",
      filename:
        fileIdxs.length === 1
          ? "파일 다운로드 완료"
          : `${fileIdxs.length}개 파일 다운로드 완료`,
    }));
  };

  const handleDownloadError = (error: string) => {
    setToastState((prev) => ({
      ...prev,
      status: "error",
      errorMessage: error,
      filename: "다운로드 실패",
    }));
  };

  const handleCloseToast = () => {
    setToastState((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };

  return (
    <>
      <DownloadButton
        eventIdx={eventIdx}
        fileIdxs={fileIdxs}
        className={className}
        fileName={fileName}
        onDownloadStart={handleDownloadStart}
        onDownloadComplete={handleDownloadComplete}
        onDownloadError={handleDownloadError}
        onProgress={handleProgress}
      />

      <DownloadProgressToast
        isVisible={toastState.isVisible}
        current={toastState.current}
        total={toastState.total}
        filename={toastState.filename}
        status={toastState.status}
        errorMessage={toastState.errorMessage}
        onClose={handleCloseToast}
      />
    </>
  );
};

export default DownloadButtonWithToast;
