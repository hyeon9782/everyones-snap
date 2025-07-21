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
      <PhotoGalleryGrid photos={photos} />
    </div>
  );
};

export default GalleryPage;
