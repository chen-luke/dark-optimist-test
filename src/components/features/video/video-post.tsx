"use client";

import LikeAndShare from "@/components/ui/LikeAndShare";
import MotionWrapper from "@/components/ui/FadeUpAnimationWraper";
import myPortableTextComponents from "@/components/ui/PortableTextComponentStyling";
import ShareModal from "@/components/ui/ShareModal";
import getYouTubeEmbedUrl from "@/components/ui/utility/getYouTubeEmbedUrl";
import { PortableText, SanityDocument } from "next-sanity";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa6";

export default function VideoPost({
  videoContent,
  isInitiallyExpanded,
}: {
  videoContent: SanityDocument;
  isInitiallyExpanded: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const [showvideoPost, setShowvideoPost] = useState(isInitiallyExpanded);

  const toggleVideoPost = () => {
    setShowvideoPost((prev) => !prev);
  };

  if (!videoContent) {
    return <p className="text-white">No video content available.</p>;
  }

  const embedUrl = getYouTubeEmbedUrl(videoContent.url);

  return (
    <div id={videoContent._id} className="">
      <MotionWrapper>
        <div
          key={videoContent._id}
          className="flex flex-col border-b-2 gap-5 border-foreground/10 py-5"
        >
          <div
            onClick={toggleVideoPost}
            className="flex items-center h-auto justify-between hover:text-optimist-red transition-colors duration-300 ease-in-out cursor-pointer h-16"
          >
            <h2 className="text-lg md:text-xl font-bold cursor-pointer">
              {videoContent.title}
            </h2>
            <FaChevronDown
              className={`min-w-12 cursor-pointer ${showvideoPost ? "rotate-180" : ""}`}
            />
          </div>
          {showvideoPost && (
            <div
              id={videoContent._id}
              className="flex flex-col lg:flex-row gap-15 scroll-mt-50"
            >
              <figure className="lg:w-1/2">
                <iframe
                  className="w-full h-fit aspect-video"
                  src={embedUrl}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
                <figcaption className="sr-only text-white">
                  Video interview with FSM Ralph discussing various topics.
                </figcaption>{" "}
              </figure>
              <div className="lg:w-1/2 flex flex-col gap-2 md:gap-4 text-foreground/80">
                {videoContent.body && (
                  <PortableText
                    value={videoContent.body}
                    components={myPortableTextComponents}
                  />
                )}
                <LikeAndShare
                  postId={videoContent._id}
                  initialLikes={videoContent.likeCounter ?? 0}
                  openShareModal={() => setShowModal(true)}
                />
                {/* Share button and modal only visible when expanded */}
                <ShareModal
                  isOpen={showModal}
                  onClose={() => setShowModal(false)}
                  shareId={videoContent._id}
                />
              </div>
            </div>
          )}
        </div>
      </MotionWrapper>
    </div>
  );
}
