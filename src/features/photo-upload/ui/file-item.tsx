import { CheckCircle } from "lucide-react";
import { UploadPhoto } from "../model/types";
import Image from "next/image";

interface Props {
  uploadFile: UploadPhoto;
}

const FileItem = ({ uploadFile }: Props) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };
  return (
    <div className="rounded-lg">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 relative rounded-sm overflow-hidden">
          <Image
            src={uploadFile.url}
            alt="file"
            fill
            className="object-cover rounded-sm"
          />
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
