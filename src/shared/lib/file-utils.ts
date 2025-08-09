// 파일 관련 유틸리티 함수들

/**
 * 단일 파일 다운로드
 */
export const downloadFile = (url: string, filename: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // 약간의 지연 후 완료로 처리
      setTimeout(resolve, 100);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * 다운로드 진행 상황 콜백 타입
 */
export type DownloadProgressCallback = (
  current: number,
  total: number,
  filename: string
) => void;

/**
 * 여러 파일을 순차적으로 다운로드 (진행 상황 추적 포함)
 */
export const downloadMultipleFiles = async (
  urls: string[],
  baseFilename: string = "download",
  onProgress?: DownloadProgressCallback
) => {
  const total = urls.length;

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    const extension = getFileExtension(url);
    const filename = `${baseFilename}_${i + 1}${extension}`;

    try {
      // 진행 상황 알림
      if (onProgress) {
        onProgress(i + 1, total, filename);
      }

      await downloadFile(url, filename);

      // 다운로드 간 약간의 지연 (브라우저 제한 방지)
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error(`Failed to download file ${i + 1}:`, error);
      throw error;
    }
  }

  // 완료 알림
  if (onProgress) {
    onProgress(total, total, "완료");
  }
};

/**
 * ZIP 파일로 다운로드 (단일 파일인 경우)
 */
export const downloadAsZip = (
  url: string,
  filename: string = "download.zip"
) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.target = "_blank";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

/**
 * URL에서 파일 확장자 추출
 */
export const getFileExtension = (url: string): string => {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const lastDotIndex = pathname.lastIndexOf(".");

    if (lastDotIndex !== -1) {
      return pathname.substring(lastDotIndex);
    }

    // 확장자를 찾을 수 없는 경우 기본값
    return ".jpg";
  } catch {
    return ".jpg";
  }
};

/**
 * 파일 크기 포맷팅
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export function bytesToGB(
  bytes: number,
  decimals: number = 2,
  binary: boolean = true
): number {
  if (bytes === 0) return 0;

  const divisor = binary ? 1024 : 1000;
  const gbInBytes = Math.pow(divisor, 3); // 1024³ 또는 1000³

  const gb = bytes / gbInBytes;

  return Number(gb.toFixed(decimals));
}
