"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { X, Upload, Camera, Video, Check, AlertCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useState, useRef, useCallback, useEffect } from "react";
import { getPresignedUrl, uploadPhotos } from "../api/photo.api";
import Image from "next/image";
import { useUserStore } from "@/features/login/model/store";

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "s3-completed" | "completed" | "error";
  url?: string;
}

const UploadDrawer = ({ eventIdx }: { eventIdx: number }) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmittingToApi, setIsSubmittingToApi] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useUserStore();

  console.log("user", user);
  console.log("eventIdx", eventIdx);

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadFile[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // 각 파일 S3 업로드 시작
    newFiles.forEach(uploadFileToS3);
  }, []);

  const uploadFileToS3 = async (uploadFile: UploadFile) => {
    try {
      // Presigned URL 받기
      const response = await getPresignedUrl({
        mimetype: uploadFile.file.type,
        type: "event",
        extension: uploadFile.file.name.split(".").pop() || "",
        id: "1",
      });

      const presignedUrl = (response.data as any).data.url;

      // S3에 업로드된 파일의 URL 생성 (presigned URL에서 쿼리 파라미터 제거)
      const uploadedUrl = presignedUrl.split("?")[0];

      // XMLHttpRequest를 사용하여 실제 진행률과 함께 S3에 업로드
      const xhr = new XMLHttpRequest();

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const progress = Math.round((e.loaded / e.total) * 100);
          setFiles((prev) =>
            prev.map((f) => (f.id === uploadFile.id ? { ...f, progress } : f))
          );
        }
      });

      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          // S3 업로드 완료
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id
                ? {
                    ...f,
                    progress: 100,
                    status: "s3-completed",
                    url: uploadedUrl,
                  }
                : f
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === uploadFile.id ? { ...f, status: "error" } : f
            )
          );
        }
      });

      xhr.addEventListener("error", () => {
        setFiles((prev) =>
          prev.map((f) =>
            f.id === uploadFile.id ? { ...f, status: "error" } : f
          )
        );
      });

      xhr.open("PUT", presignedUrl);
      xhr.setRequestHeader("Content-Type", uploadFile.file.type);
      xhr.send(uploadFile.file);
    } catch (error) {
      console.error("S3 업로드 실패:", error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: "error" } : f
        )
      );
    }
  };

  // 모든 파일의 S3 업로드 완료 여부 확인 및 API 호출
  const checkAndSubmitToApi = useCallback(async () => {
    const allS3Completed = files.every(
      (file) => file.status === "s3-completed" || file.status === "completed"
    );
    const hasS3CompletedFiles = files.some(
      (file) => file.status === "s3-completed"
    );

    if (allS3Completed && hasS3CompletedFiles && !isSubmittingToApi) {
      setIsSubmittingToApi(true);

      try {
        // S3 업로드가 완료된 파일들만 API로 전송
        const completedFiles = files.filter(
          (file) => file.status === "s3-completed"
        );

        const photoData = completedFiles.map((file) => ({
          eventIdx: eventIdx, // 실제 eventIdx로 변경 필요
          userIdx: user?.userIdx, // 실제 userIdx로 변경 필요
          guestIdx: 100, // 실제 guestIdx로 변경 필요 (optional일 수 있음)
          mediaType: file.file.type.startsWith("image/") ? "image" : "video",
          type: file.file.type,
          url: file.url!,
          isThumbnail: "n",
          fileSize: file.file.size,
        }));

        console.log("API에 전송할 데이터:", photoData);

        // uploadPhotos API 호출
        await uploadPhotos({
          eventIdx: eventIdx,
          files: photoData,
        });

        // 모든 파일을 완료 상태로 변경
        setFiles((prev) =>
          prev.map((f) =>
            f.status === "s3-completed" ? { ...f, status: "completed" } : f
          )
        );

        console.log("모든 파일 업로드 완료!");
      } catch (error) {
        console.error("API 전송 실패:", error);
        // 에러 발생 시 해당 파일들을 에러 상태로 변경
        setFiles((prev) =>
          prev.map((f) =>
            f.status === "s3-completed" ? { ...f, status: "error" } : f
          )
        );
      } finally {
        setIsSubmittingToApi(false);
      }
    }
  }, [files, isSubmittingToApi]);

  // files 상태가 변경될 때마다 API 호출 체크
  useEffect(() => {
    checkAndSubmitToApi();
  }, [checkAndSubmitToApi]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Camera className="w-5 h-5" />;
    } else if (file.type.startsWith("video/")) {
      return <Video className="w-5 h-5" />;
    }
    return <Upload className="w-5 h-5" />;
  };

  const getStatusIcon = (status: UploadFile["status"]) => {
    switch (status) {
      case "completed":
        return <Check className="w-4 h-4 text-green-500" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: UploadFile["status"]) => {
    switch (status) {
      case "uploading":
        return "업로드 중...";
      case "s3-completed":
        return isSubmittingToApi ? "서버 전송 중..." : "업로드 완료";
      case "completed":
        return "완료";
      case "error":
        return "실패";
      default:
        return "";
    }
  };

  const completedFiles = files.filter((f) => f.status === "completed").length;
  const s3CompletedFiles = files.filter(
    (f) => f.status === "s3-completed" || f.status === "completed"
  ).length;
  const totalFiles = files.length;

  // S3 업로드 진행률
  const s3Progress =
    totalFiles > 0 ? Math.round((s3CompletedFiles / totalFiles) * 100) : 0;

  // 전체 완료 진행률
  const overallProgress =
    totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 0;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button className="flex-1 text-[16px] font-semibold flex items-center gap-2 bg-[#F1F5F9] rounded-xl h-[48px] text-[#344054]">
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            <Image
              src="/images/upload_photo.svg"
              alt="upload"
              width={22}
              height={20}
            />
          </div>
          업로드
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="relative">
          <DrawerTitle>업로드</DrawerTitle>
          <DrawerClose asChild className="absolute right-3 top-8">
            <Button variant="ghost" size="icon" className="w-[36px] h-[36px]">
              <X
                style={{ width: "24px", height: "24px" }}
                className="text-black"
              />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-4">
          {/* 전체 진행률 */}
          {files.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">
                  {isSubmittingToApi
                    ? "서버 전송 중..."
                    : `업로드 진행률 ${overallProgress}%`}
                </span>
                <span className="text-gray-500">
                  {completedFiles}/{totalFiles}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    isSubmittingToApi ? "bg-blue-500" : "bg-green-500"
                  }`}
                  style={{ width: `${overallProgress}%` }}
                />
              </div>

              {/* S3 업로드 진행률 (디버깅용) */}
              {s3Progress > 0 && s3Progress < 100 && (
                <div className="text-xs text-gray-500">
                  S3 업로드: {s3CompletedFiles}/{totalFiles} ({s3Progress}%)
                </div>
              )}
            </div>
          )}

          {/* 파일 선택 영역 */}
          <div className="border-2 border-dashed rounded-lg p-8 text-center transition-colors border-gray-300 hover:border-gray-400">
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">
              파일을 여기로 끌어다 놓으세요
            </p>
            <p className="text-gray-500 mb-4">
              또는 버튼을 클릭해서 파일을 선택하세요
            </p>
            <Button onClick={handleButtonClick} variant="outline">
              파일 선택
            </Button>
          </div>

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />

          {/* 파일 목록 */}
          {files.length > 0 && (
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {files.map((uploadFile) => (
                <div key={uploadFile.id} className="border rounded-lg p-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      {getFileIcon(uploadFile.file)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">
                          {uploadFile.file.name}
                        </p>
                        {getStatusIcon(uploadFile.status)}
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span>{formatFileSize(uploadFile.file.size)}</span>
                        <span>{getStatusText(uploadFile.status)}</span>
                      </div>

                      {uploadFile.status === "uploading" && (
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div
                            className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${uploadFile.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 하단 정보 */}
          {files.length === 0 && (
            <div className="text-center py-4">
              <p className="text-sm text-gray-500">
                파일을 업로드할 준비가 되었습니다
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadDrawer;
