import PhotoGalleryGrid from "@/widgets/photo-gallery-grid";

const photos = [
  {
    id: 1,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 2,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 3,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 4,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 5,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 6,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 7,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 8,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 9,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 10,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 11,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 12,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 13,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 14,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 15,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 16,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 17,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
  {
    id: 18,
    title: "Photo 1",
    url: "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
    thumbnailUrl:
      "https://d7aw056umshyd.cloudfront.net/mywedlog/post/original/73bc8253-f747-40aa-b5ff-021718dd6d59.jpg",
  },
];

const GalleryPage = () => {
  return (
    <div>
      <PhotoGalleryGrid photos={photos} />
    </div>
  );
};

export default GalleryPage;
