import Image from "next/image";

interface Props {
  isSubmittingToApi: boolean;
  overallProgress: number;
  s3Progress: number;
  s3CompletedFiles: number;
  totalFiles: number;
  completedFiles: number;
}

const UploadController = ({
  isSubmittingToApi,
  overallProgress,
  s3Progress,
  s3CompletedFiles,
  totalFiles,
  completedFiles,
}: Props) => {
  return (
    <div className="space-y-3 bg-[#F1F5F9] rounded-lg p-4">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <div className="w-[20px] h-[20px] flex items-center justify-center">
            <Image
              src="/images/arrow_upload_progress.svg"
              alt="upload"
              width={16.49}
              height={16.31}
            />
          </div>
          <span className="font-semibold text-[#344054] text-[16px]">
            {isSubmittingToApi
              ? "서버 전송 중..."
              : `업로드 진행률 ${overallProgress}%`}
          </span>
        </div>
        <span className="text-gray-500">
          {completedFiles}/{totalFiles}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1">
        <div
          className={`h-1 rounded-full transition-all duration-300 ${
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
  );
};

export default UploadController;
