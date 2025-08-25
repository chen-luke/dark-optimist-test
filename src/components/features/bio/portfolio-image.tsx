// /components/ui/ProfileImageWithAnimation.js
"use client";

import { useRef } from "react";
import Image from "next/image";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import { motion } from "framer-motion";
import clockAnimation from "./clock-animation.json";

export default function ProfileImageWithAnimation({
  imageUrl,
  altText = "Profile picture of the author",
}: {
  imageUrl: string | undefined;
  altText?: string;
}) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  return (
    <motion.div
      className="relative flex-shrink-0"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        lottieRef.current?.play();
      }}
    >
      <div className="flex flex-col items-center">
        <Image
          src={imageUrl ? imageUrl : "/profile-pic.png"}
          width={250}
          height={250}
          className="rounded object-cover"
          alt={altText}
          priority
        />
        <figcaption className="mt-2 text-sm text-gray-500">
          {altText}
        </figcaption>
      </div>

      <Lottie
        lottieRef={lottieRef}
        autoplay={false}
        animationData={clockAnimation}
        loop={false}
        className="absolute inset-0 h-[190px] -left-45 -top-15 md:h-[190px] md:w-[190px] rounded object-cover md:-left-10 md:-top-15 md:-left-15 lg:-left-15 "
      />
    </motion.div>
  );
}
