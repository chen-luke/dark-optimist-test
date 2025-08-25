"use client";
import AudioPlayerWrapper from "@/components/ui/AudioPlayerWrapper";
import LikeAndShare from "@/components/ui/LikeAndShare";
import MotionWrapper from "@/components/ui/FadeUpAnimationWraper";
import ScrollTranscript from "@/components/ui/ScrollTranscript";
import ShareModal from "@/components/ui/ShareModal";
import contentFetcher from "@/sanity/lib/contentFetcher";
import { PortableText, SanityDocument } from "next-sanity";
import { FaChevronDown } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";
import myPortableTextComponents from "@/components/ui/PortableTextComponentStyling";

export default function Podcast({
  podcast,
  isInitiallyExpanded = false,
}: {
  podcast: SanityDocument;
  isInitiallyExpanded?: boolean;
}) {
  const postImageUrl =
    podcast?.coverArt && contentFetcher.urlFor(podcast.coverArt)?.url();

  const [showModal, setShowModal] = useState(false);

  const [showPodcast, setShowPodcast] = useState(isInitiallyExpanded);

  const togglePodcast = () => {
    setShowPodcast((prev) => !prev);
  };

  return (
    <MotionWrapper>
      <div
        id={podcast._id}
        className="flex flex-col gap-15 py-5 border-b-2 border-b-foreground/10 scroll-mt-50"
      >
        <div
          className="flex items-center h-auto justify-between hover:text-optimist-red transition-colors duration-300 ease-in-out cursor-pointer h-16"
          onClick={togglePodcast}
        >
          <h2 className="text-lg md:text-xl font-bold cursor-pointer">
            {podcast.title}
          </h2>
          <FaChevronDown className="min-w-12 cursor-pointer" />
        </div>
        {showPodcast && (
          <div className="flex flex-col lg:flex-row gap-15">
            <div className="flex flex-col lg:w-1/2 gap-5 items-center">
              <div className="flex flex-col items-center gap-2 mb-5">
                <Image
                  src={postImageUrl}
                  width={300}
                  height={300}
                  className="max-w-xs"
                  alt={podcast.coverArt?.alt || "Podcast Cover Art"}
                />
                <figcaption className="text-gray-500 text-sm">
                  {podcast.coverArt?.alt || ""}
                </figcaption>
              </div>
              <p className="font-bold text-lg self-start">{podcast.studio}</p>
              {podcast.summary && (
                <PortableText
                  value={podcast.summary}
                  components={myPortableTextComponents}
                />
              )}
            </div>
            <div className="lg:w-1/2">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-4">
                  <AudioPlayerWrapper src={podcast.audioUrl} />
                </div>
                <div className="flex justify-end">
                  <div className="flex w-full justify-end"></div>
                </div>
              </div>
              <div className="flex flex-col text-foreground/80 gap-5 mt-10">
                <h3 className="text-lg pb-5 border-b-2 border-b-foreground/30">
                  Transcript:
                </h3>
              </div>
              <ScrollTranscript
                transcript={podcast.podcastAudio?.transcription}
              />
              <LikeAndShare
                postId={podcast._id}
                initialLikes={podcast.likeCounter ?? 0}
                openShareModal={() => setShowModal(true)}
              />
              <ShareModal
                isOpen={showModal}
                shareId={podcast._id}
                onClose={() => setShowModal(false)}
              />{" "}
            </div>
          </div>
        )}
      </div>
    </MotionWrapper>
  );
}
