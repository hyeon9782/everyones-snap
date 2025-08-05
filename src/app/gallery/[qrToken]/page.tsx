import PhotoGalleryGrid from "@/widgets/photo-gallery-grid";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { getPhotos } from "@/features/photo-viewer/api/api";
import UploadDrawer from "@/features/photo-upload/ui/upload-drawer";
import Link from "next/link";
import GalleryToolbar from "@/features/photo-viewer/ui/gallery-toolbar";
import { cookies } from "next/headers";

const GalleryPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ qrToken: string }>;
  searchParams: Promise<{ eventIdx: string }>;
}) => {
  const { qrToken } = await params;
  const cookieStore = await cookies();
  const userIdx = cookieStore.get("userIdx")?.value;

  const response = await getPhotos({
    qrToken,
    userIdx,
    guestIdx: 0,
    onlyMyFiles: "n",
    fileType: "all",
    sortBy: "createDt",
    bookmarked: "n",
    sortOrder: "DESC",
  });

  console.log("response", response);

  return (
    <div>
      <GalleryToolbar />
      <PhotoGalleryGrid photos={response.files} />
      <div className="fixed bottom-0 left-0 right-0 flex justify-center items-center h-[72px] w-full bg-white gap-2 px-4">
        <Button className="w-[48px] h-[48px] bg-[#F1F5F9] rounded-xl">
          <Image
            src="/images/download.svg"
            alt="download"
            width={13.33}
            height={13.33}
          />
        </Button>
        <UploadDrawer eventIdx={Number(response.event.eventIdx)} />
        <Link
          href={`/guestbook/${qrToken}`}
          className="flex-1 flex items-center justify-center gap-2 bg-[#F1F5F9] rounded-xl h-[48px] text-[16px] font-semibold text-[#344054]"
        >
          <div className="w-[24px] h-[24px] flex items-center justify-center">
            <Image
              src="/images/checkbook.svg"
              alt="guestbook"
              width={21.02}
              height={16}
            />
          </div>
          방명록
        </Link>
      </div>
    </div>
  );
};

export default GalleryPage;
