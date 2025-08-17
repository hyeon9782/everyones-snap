import { CheckCircle, Play, Video, Loader2 } from "lucide-react";
import { UplaodStatus } from "../model/types";
import Image from "next/image";
import { useState, useEffect } from "react";

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: UplaodStatus;
  url?: string;
}

interface Props {
  uploadFile: UploadFile;
  isSubmittingToApi: boolean;
}

const FileItem = ({ uploadFile }: Props) => {
  const [videoThumbnail, setVideoThumbnail] = useState<string | null>(null);
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  const isVideo = uploadFile.file.type.startsWith("video/");
  const isImage = uploadFile.file.type.startsWith("image/");

  // 영상 파일의 첫 프레임을 캡처하여 썸네일 생성
  useEffect(() => {
    if (isVideo && uploadFile.file && !videoThumbnail && !thumbnailError) {
      setIsGeneratingThumbnail(true);

      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.playsInline = true;

      video.onloadeddata = () => {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = 32;
          canvas.height = 32;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            ctx.drawImage(video, 0, 0, 32, 32);
            const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.8);
            setVideoThumbnail(thumbnailUrl);
            setIsGeneratingThumbnail(false);
          }
        } catch (error) {
          console.log("영상 썸네일 생성 실패:", error);
          setThumbnailError(true);
          setIsGeneratingThumbnail(false);
        }
      };

      video.onerror = () => {
        console.log("영상 로드 실패");
        setThumbnailError(true);
        setIsGeneratingThumbnail(false);
      };

      // 타임아웃 설정 (5초 후 실패로 처리)
      const timeout = setTimeout(() => {
        if (isGeneratingThumbnail) {
          setThumbnailError(true);
          setIsGeneratingThumbnail(false);
        }
      }, 5000);

      video.src = URL.createObjectURL(uploadFile.file);

      return () => {
        clearTimeout(timeout);
        URL.revokeObjectURL(video.src);
      };
    }
  }, [
    isVideo,
    uploadFile.file,
    videoThumbnail,
    thumbnailError,
    isGeneratingThumbnail,
  ]);

  return (
    <div className="rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 relative rounded-sm overflow-hidden bg-gray-100 flex items-center justify-center">
          {isImage && uploadFile.url ? (
            // 이미지 파일인 경우 썸네일 표시
            <Image
              src={uploadFile.url}
              alt="file"
              fill
              className="object-cover rounded-sm"
            />
          ) : isVideo && videoThumbnail ? (
            // 영상 파일인 경우 생성된 썸네일 표시
            <Image
              src={videoThumbnail}
              alt="video thumbnail"
              fill
              className="object-cover rounded-sm"
            />
          ) : isVideo && isGeneratingThumbnail ? (
            // 영상 썸네일 생성 중
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
            </div>
          ) : isVideo ? (
            // 영상 파일인 경우 기본 아이콘 표시
            <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
              <Video className="w-4 h-4 text-blue-600" />
              <Play className="w-2.5 h-2.5 text-white absolute" />
            </div>
          ) : (
            // 기타 파일인 경우 기본 아이콘
            <div className="w-5 h-5 text-gray-500">
              <Video className="w-full h-full" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-[12px] font-medium truncate text-[#344054]">
                {uploadFile.file.name}
              </p>
              <span className="text-[#667085] text-[12px] font-medium">
                {formatFileSize(uploadFile.file.size)}
              </span>
            </div>
            <div>
              {uploadFile.status === "completed" && (
                <CheckCircle className="w-[16.67px] h-[16.67px] text-green-500" />
              )}
            </div>
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
  );
};

export default FileItem;
