"use client";

import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

// This client is used to PATCH the data
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
  apiVersion: "2024-01-01",
  ignoreBrowserTokenWarning: true,
});

// Helper function to get liked items from localStorage
const getLikedFromStorage = (): string[] => {
  const liked = localStorage.getItem("likedContent");
  return liked ? JSON.parse(liked) : [];
};

// Helper function to save a new liked item
const saveLikedToStorage = (postId: string) => {
  const liked = getLikedFromStorage();
  if (!liked.includes(postId)) {
    localStorage.setItem("likedContent", JSON.stringify([...liked, postId]));
  }
};

export function OptimisticLikeCounter({
  initialLikes,
  postId,
}: {
  initialLikes: number;
  postId: string;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiking, setIsLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const likedPosts = getLikedFromStorage();
    if (likedPosts.includes(postId)) {
      setIsLiked(true);
    }
  }, [postId]);

  const handleLike = async () => {
    if (isLiked) return;

    setIsLiking(true);
    setIsLiked(true);
    // 1. Optimistically update the UI instantly
    setLikes((currentLikes) => currentLikes + 1);

    try {
      // 2. Send the actual request to the server
      await writeClient
        .patch(postId)
        .setIfMissing({ likeCounter: 0 })
        .inc({ likeCounter: 1 })
        .commit();

      saveLikedToStorage(postId);
    } catch (error) {
      // 3. If it fails, roll back the change and log the error
      console.error("Failed to like post:", error);
      setLikes((currentLikes) => currentLikes - 1);
      setIsLiked(false);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex items-center gap-2 justify-end disabled:opacity-50">
      <button
        aria-label="like post"
        className="cursor-pointer"
        onClick={handleLike}
        disabled={isLiking || isLiked}
      >
        {isLiked ? <FaHeart color="red" /> : <FaRegHeart />}
      </button>
      <p className="font-semibold">
        <strong>{likes}</strong>
      </p>
    </div>
  );
}
