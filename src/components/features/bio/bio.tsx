import ExpandingPortableText from "@/components/ui/ExpandingPortableText";
import MotionWrapper from "@/components/ui/FadeUpAnimationWraper";
import contentFetcher from "@/sanity/lib/contentFetcher";
import ProfileImageWithAnimation from "./portfolio-image";

// The component is ASYNC to fetch data on the server
export default async function Bio() {
  const post = await contentFetcher.getBioContent();

  if (!post) {
    return (
      <section id="bio-section" className="container mx-auto p-10">
        <div>Bio content not found.</div>
      </section>
    );
  }

  const postImageUrl = post?.image
    ? contentFetcher.urlFor(post.image)?.width(250).height(250).url()
    : "/profile-pic.png"; // Provide a fallback

  return (
    <MotionWrapper triggerAmount={0.5}>
      <section
        id="author-section"
        className="container flex flex-col items-center lg:flex-row lg:items-start justify-center gap-x-20 gap-y-10 p-10 mx-auto w-auto scroll-mt-40"
      >
        <ProfileImageWithAnimation
          imageUrl={postImageUrl}
          altText={post.image.alt}
        />
        <article className="flex flex-col justify-between gap-5 lg:max-w-lg">
          {post.body ? (
            <>
              <div className="flex gap-5 items-center">
                <div className="h-5 w-5 min-w-5 bg-optimist-red"></div>
                <h1 className="text-3xl">{post.title}</h1>
              </div>
              <ExpandingPortableText value={post.body} />
            </>
          ) : (
            <p>No bio content available.</p>
          )}
        </article>
      </section>
    </MotionWrapper>
  );
}
