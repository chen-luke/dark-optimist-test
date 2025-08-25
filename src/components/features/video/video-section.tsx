import contentFetcher from "@/sanity/lib/contentFetcher";
import VideoPost from "./video-post";
import { SanityDocument } from "next-sanity";
import SectionTitle from "@/components/ui/SectionTitle";

export default async function VideoSection() {
  const videoContents = await contentFetcher.getVideoContent();
  if (!videoContents) {
    return <p className="text-white">No video content available.</p>;
  }
  return (
    <section
      id="video-section"
      className="container pb-60 flex flex-col p-10 mx-auto scroll-mt-25 bg-black"
    >
      <SectionTitle
        marginBottom={"5"}
        color={"white"}
        title={"Video Interviews"}
      />

      {videoContents.map((videoContent: SanityDocument, index: number) => (
        <VideoPost
          key={videoContent._id}
          videoContent={videoContent}
          isInitiallyExpanded={index === 0}
        />
      ))}
    </section>
  );
}
