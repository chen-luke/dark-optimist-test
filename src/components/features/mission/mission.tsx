"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import contentFetcher from "@/sanity/lib/contentFetcher";
import myPortableTextComponents from "@/components/ui/PortableTextComponentStyling";
import SectionTitle from "@/components/ui/SectionTitle";

const useIsMobileSimple = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup listener
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
};

export default function Mission() {
  const [post, setPost] = useState<SanityDocument | null>(null);
  const isMobile = useIsMobileSimple();

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await contentFetcher.getMissionContent();
      setPost(fetchedPost);
    };

    console.log("dsf");

    fetchPost();
  }, []);

  // Prepare the dynamic image URL
  const postImageUrl = post?.image
    ? contentFetcher.urlFor(post.image)?.width(800).height(600).url()
    : null;

  if (!post) {
    return (
      <section id="mission-section" className="container mx-auto p-10">
        <div>Loading mission...</div>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: isMobile ? 0.1 : 0.5 }}
      transition={{ duration: 0.8 }}
      id="mission-section"
      className="container flex flex-col p-10 bg-white mx-auto scroll-mt-25"
    >
      <SectionTitle marginBottom={"0"} color={"black"} title={"Mission"} />

      <div className="pt-10">
        {postImageUrl && (
          <div className="flex flex-col float-left w-full md:w-1/2 mr-6 lg:mr-10 mb-4">
            <Image
              src={postImageUrl || ""}
              width={800}
              height={600}
              className="object-cover"
              alt={post.image.alt || "Mission section image"}
            />
            <figcaption className="mb-4 mt-2 text-sm text-gray-500 self-center md:self-start">
              {post.image.alt || ""}
            </figcaption>
          </div>
        )}

        <article className="prose prose-lg max-w-none text-black">
          {post.body && (
            <PortableText
              value={post.body}
              components={myPortableTextComponents}
            />
          )}
        </article>
      </div>
    </motion.section>
  );
}
