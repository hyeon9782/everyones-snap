import PhotoGalleryGrid from "@/widgets/photo-gallery-grid";
import GridTypeTabs from "@/features/photo-viewer/ui/grid-type-tabs";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { getPhotos } from "@/features/photo-viewer/api/api";
import UploadDrawer from "@/features/photo-upload/ui/upload-drawer";
import GalleryFilterDrawer from "@/features/photo-viewer/ui/gallery-filter-drawer";
import FileInfoDrawer from "@/features/photo-viewer/ui/file-info-drawer";

const GalleryPage = async ({
  params,
}: {
  params: Promise<{ qrToken: string }>;
}) => {
  const { qrToken } = await params;

  const response = await getPhotos(qrToken);

  console.log("response", response);

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-5">
        <div className="">
          {true ? (
            <span className="text-[20px] font-semibold">갤러리</span>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[20px] font-semibold">1개 선택</span>
              <Button
                size="icon"
                className="w-[36px] h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
              >
                <Image
                  src="/images/download.svg"
                  alt="download"
                  width={13.33}
                  height={13.33}
                />
              </Button>
            </div>
          )}
        </div>
        <UploadDrawer />
        {true ? (
          <div className="flex items-center gap-2">
            <GridTypeTabs />
            <GalleryFilterDrawer />
            <FileInfoDrawer />
            <Button
              size="icon"
              className="w-[36px] h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
            >
              <Image
                src="/images/ads_click.svg"
                alt="ads_click"
                width={16.69}
                height={16.69}
              />
            </Button>
          </div>
        ) : (
          <Button
            size="icon"
            className="w-[36px] h-[36px] rounded-full shadow-none "
          >
            <Image
              src="/images/close.svg"
              alt="close"
              width={10.96}
              height={10.96}
            />
          </Button>
        )}
      </div>
      <PhotoGalleryGrid photos={response.files} />
    </div>
  );
};

export default GalleryPage;
