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
import { useState, useRef, useCallback } from "react";
import { getPresignedUrl, uploadPhotos } from "../api/photo.api";

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  url?: string;
}

const UploadDrawer = () => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadFile[] = Array.from(selectedFiles).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      status: "uploading",
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    // 각 파일 업로드 시작
    newFiles.forEach(uploadFile);
  }, []);

  const uploadFile = async (uploadFile: UploadFile) => {
    try {
      // Presigned URL 받기
      const response = await getPresignedUrl({
        mimetype: uploadFile.file.type,
        type: "event",
        extension: uploadFile.file.name.split(".").pop() || "",
        id: "1",
      });

      const presignedUrl = (response.data as any).data.url;

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

      xhr.addEventListener("load", async () => {
        if (xhr.status === 200) {
          // S3 업로드 완료, 이제 서버에 메타정보 전송
          try {
            // FormData를 사용하여 파일 전송
            const formData = new FormData();
            formData.append("eventIdx", "1");
            formData.append("files", uploadFile.file);

            // 또는 uploadPhotos API가 FormData를 받지 않는다면
            // 파일 정보만 전송하는 방식으로 변경
            await uploadPhotos({
              eventIdx: 1,
              files: [uploadFile.file], // 이 부분이 문제일 수 있음
            });

            // 모든 과정 완료
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadFile.id
                  ? { ...f, progress: 100, status: "completed" }
                  : f
              )
            );
          } catch (metaError) {
            console.error("메타정보 업로드 실패:", metaError);
            setFiles((prev) =>
              prev.map((f) =>
                f.id === uploadFile.id ? { ...f, status: "error" } : f
              )
            );
          }
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
      console.error("업로드 실패:", error);
      setFiles((prev) =>
        prev.map((f) =>
          f.id === uploadFile.id ? { ...f, status: "error" } : f
        )
      );
    }
  };

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

  const completedFiles = files.filter((f) => f.status === "completed").length;
  const totalFiles = files.length;
  const overallProgress =
    totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 0;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button>업로드</Button>
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
                  업로드 진행률 {overallProgress}%
                </span>
                <span className="text-gray-500">
                  {completedFiles}/{totalFiles}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
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
                        {uploadFile.status === "uploading" && (
                          <span>{uploadFile.progress}%</span>
                        )}
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
