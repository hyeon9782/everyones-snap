"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/ui/drawer";
import { X, PlusCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useState, useRef, useCallback, useEffect } from "react";
import { getPresignedUrl, uploadPhotos } from "../api/photo.api";
import Image from "next/image";
import { useUserStore } from "@/features/login/model/store";
import UploadController from "./upload-controller";
import FileItem from "./file-item";
import { UplaodStatus, UploadPhoto } from "../model/types";
import Link from "next/link";

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: UplaodStatus;
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

        console.log("completedFiles", completedFiles);

        const photoData: UploadPhoto[] = completedFiles.map((file) => ({
          eventIdx: eventIdx, // 실제 eventIdx로 변경 필요
          userIdx: user?.userIdx || 0, // 실제 userIdx로 변경 필요
          guestIdx: user?.userIdx ? 0 : 100, // 실제 guestIdx로 변경 필요 (optional일 수 있음)
          mediaType: file.file.type.startsWith("image/") ? "image" : "video",
          fileName: file.file.name,
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

  const handleCloseClick = () => {
    setIsOpen(false);
    setFiles([]);
  };

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
          <DrawerClose asChild className="absolute right-3 top-2">
            <Button
              onClick={handleCloseClick}
              variant="ghost"
              size="icon"
              className="w-[36px] h-[36px]"
            >
              <X
                style={{ width: "24px", height: "24px" }}
                className="text-black"
              />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <div className="px-4 pb-6 space-y-2">
          {/* 전체 진행률 */}
          {files.length > 0 && (
            <UploadController
              isSubmittingToApi={isSubmittingToApi}
              overallProgress={overallProgress}
              s3Progress={s3Progress}
              s3CompletedFiles={s3CompletedFiles}
              totalFiles={totalFiles}
              completedFiles={completedFiles}
            />
          )}

          {files.length === 0 && (
            <label className="w-full h-[302px] bg-[#F1F5F9] flex flex-col items-center justify-center gap-2 cursor-pointer rounded-lg">
              <div className="flex items-center gap-2 text-[#667085]">
                <PlusCircle className="size-5" />
                <span className="text-[16px] font-semibold">파일 선택</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files)}
              />
            </label>
          )}

          {/* 파일 목록 */}
          {files.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto bg-[#F1F5F9] rounded-lg p-4">
              {files.map((uploadFile) => (
                <FileItem
                  key={uploadFile.id}
                  uploadFile={uploadFile}
                  isSubmittingToApi={isSubmittingToApi}
                />
              ))}
            </div>
          )}

          {/* 하단 정보 */}
          {files.length === 0 && (
            <div className="text-center py-2">
              <Link
                href={`https://imminent-drop-afd.notion.site/2505eb23b550801cbcbbd3355c744509?pvs=73`}
                className="text-sm text-gray-500"
                target="_blank"
              >
                파일 업로드 및 보관 정책
              </Link>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadDrawer;
