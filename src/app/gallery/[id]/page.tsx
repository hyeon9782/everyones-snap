import PhotoGalleryGrid from "@/widgets/photo-gallery-grid";
import GridTypeTabs from "@/features/photo-viewer/ui/grid-type-tabs";
import { Button } from "@/shared/ui/button";
import Image from "next/image";

const photos = [
  {
    id: 1,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 4,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/61a7ff4a-8b43-46c5-888b-89bc0802c326.jpeg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/61a7ff4a-8b43-46c5-888b-89bc0802c326.jpeg",
  },
  {
    id: 2,
    title: "Photo 2",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/f29be00f-6783-4d15-b0d3-c6745c06f2a9.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/f29be00f-6783-4d15-b0d3-c6745c06f2a9.jpg",
  },
  {
    id: 3,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/e2d4c831-c0e3-482f-93b6-f774fe91797d.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/e2d4c831-c0e3-482f-93b6-f774fe91797d.jpg",
  },

  {
    id: 5,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/878ae466-e4d4-4f25-8331-ef6c9ae57f0f.jpeg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/878ae466-e4d4-4f25-8331-ef6c9ae57f0f.jpeg",
  },
  {
    id: 6,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/517cddae-e567-4004-a149-1804e4890d85.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/517cddae-e567-4004-a149-1804e4890d85.jpg",
  },
];

const GalleryPage = () => {
  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between px-4 pt-5">
        <div className="">
          {false ? (
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
        {false ? (
          <div className="flex items-center gap-2">
            <GridTypeTabs />
            <Button
              size="icon"
              className="w-[36px] h-[36px] rounded-full shadow-none bg-[#F2F2F7]"
            >
              <Image
                src="/images/filter_alt.svg"
                alt="filter_alt"
                width={13.375}
                height={13.33}
              />
            </Button>
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
      <PhotoGalleryGrid photos={photos} />
    </div>
  );
};

export default GalleryPage;
