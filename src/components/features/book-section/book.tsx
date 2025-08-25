import Image from "next/image";
import Link from "next/link";
import MotionWrapper from "@/components/ui/FadeUpAnimationWraper";
import contentFetcher from "@/sanity/lib/contentFetcher";
import AudioPlayerWrapper from "@/components/ui/AudioPlayerWrapper";
import ScrollTranscript from "@/components/ui/ScrollTranscript";
import SectionTitle from "@/components/ui/SectionTitle";

export default async function Book() {
  const post = await contentFetcher.getBookContent();

  if (!post) {
    return (
      <section id="book-section" className="container mx-auto p-10">
        <div>Book content not found.</div>
      </section>
    );
  }

  const postImageUrl = post?.image
    ? contentFetcher.urlFor(post.image)?.url()
    : "/book-photo.png";

  return (
    <MotionWrapper>
      <section
        id="book-section"
        className="container flex bg-black flex-col p-10 gap-10 mx-auto scroll-mt-25"
      >
        <div className="flex items-center gap-4">
          <SectionTitle
            marginBottom={"5"}
            color={"white"}
            title={"Read The Book"}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-15 justify-center justify-between lg:items-stretch justify-between">
          {postImageUrl && (
            <div className="flex flex-col lg:w-1/2">
              <Image
                src={postImageUrl}
                width={400}
                height={600}
                className="w-full h-auto"
                alt={post.image?.alt || "Book cover image"}
              />
              <figcaption className="text-gray-500 text-sm self-center md:self-start mt-2">
                {post.image.alt || ""}
              </figcaption>
            </div>
          )}

          <div className="flex flex-col justify-between gap-20 lg:w-1/2">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl mb-5">{post.articleTitle || ""} </h2>
              <div className="flex justify-between">
                <AudioPlayerWrapper src={post.audioUrl} />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg pb-5 border-b-2 border-b-foreground/30">
                Transcript:
              </h3>
              <ScrollTranscript transcript={post.body} />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex w-full justify-end mt-4">
            <Link
              href={
                "https://www.amazon.com/We-Have-Nothing-Lose-Optimists/dp/163735326X?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=ATVPDKIKX0DER"
              }
            >
              <button
                aria-label="buy the book"
                className="cursor-pointer bg-optimist-red ahover:bg-red-300 text-white py-2 px-5 rounded-md shadow-md transition-colors duration-200"
              >
                {" "}
                Buy The Book
              </button>
            </Link>
          </div>
        </div>
      </section>
    </MotionWrapper>
  );
}
