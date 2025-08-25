"use client";

import { motion } from "framer-motion";
import localFont from "next/font/local";

const digital7font = localFont({
  src: "./fonts/digital-7.ttf",
  display: "swap",
});

const CallToActionMultiLineAnimation = ({ lines }: { lines: string[] }) => {
  // Variants for the container of all lines
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        // Stagger the appearance of each line
        staggerChildren: 0.6, // Adjust time between lines here
        delayChildren: 1, // Optional: delay before the whole animation starts
      },
    },
  };

  // Variants for each line container
  const lineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        // Stagger the characters within this line
        staggerChildren: 0.03, // Adjust time between characters here
      },
    },
  };

  // Variants for each individual character
  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-lg md:text-2xl lg:text-3xl font-sans" // Style your container
    >
      {lines.map((line, lineIndex) => (
        <motion.p
          key={lineIndex}
          aria-label={line}
          variants={lineVariants}
          className={`m-0 p-0 ${digital7font.className}`} // Ensure no extra margin on the paragraph tags
        >
          {Array.from(line).map((char, charIndex) => (
            <motion.span
              key={`${char}-${charIndex}`}
              variants={characterVariants}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.p>
      ))}
    </motion.div>
  );
};

export default CallToActionMultiLineAnimation;
