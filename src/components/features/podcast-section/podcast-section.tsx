import contentFetcher from "@/sanity/lib/contentFetcher";
import Podcast from "./podcast";
import { SanityDocument } from "next-sanity";
import SectionTitle from "@/components/ui/SectionTitle";

export default async function PodCasts() {
  const podcasts = await contentFetcher.getPodcastsContent();

  if (!podcasts) {
    return (
      <section
        id="podcast-section"
        className="container mx-auto p-10 scroll-mt-25"
      >
        <div>Podcast content not found.</div>
      </section>
    );
  }

  return (
    <section
      id="podcast-section"
      className="container mx-auto p-10 scroll-mt-25 bg-black"
    >
      <div className="flex items-center gap-4">
        <SectionTitle
          marginBottom={"5"}
          color={"white"}
          title={"Listen to the Podcasts"}
        />
      </div>
      {podcasts.map((podcast: SanityDocument, index: number) => (
        <Podcast
          key={podcast._id}
          podcast={podcast}
          isInitiallyExpanded={index === 0}
        />
      ))}
    </section>
  );
}
