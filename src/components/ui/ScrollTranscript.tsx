"use client";

import { motion, useScroll } from "framer-motion";
import React, { useRef } from "react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import myPortableTextComponents from "./PortableTextComponentStyling"; // Needed for rich text styling

// --- 1. Update props to accept either type ---
interface ScrollTranscriptProps {
  /** The transcript content, which can be a plain string or Sanity Portable Text array. */
  transcript?: string | PortableTextBlock[];
}

/**
 * A component that displays a podcast transcript in a scrollable window
 * with a progress bar. It can render either a plain string or rich Portable Text.
 */
function ScrollTranscript({ transcript }: ScrollTranscriptProps) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ container: scrollableContainerRef });

  if (!transcript || transcript.length === 0) {
    return <p className="text-foreground/60">Transcript not available.</p>;
  }

  return (
    <div className="flex flex-col gap-4 text-foreground/80">
      {/* The global styles for the scrollbar remain the same */}
      <style jsx global>{`
        /* For Webkit browsers (Chrome, Safari, Edge) */
        .custom-scrollbar::-webkit-scrollbar {
          width: none;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ef4444; /* Red color for the scroll thumb */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #dc2626; /* Darker red on hover */
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: none;
          scrollbar-color: #ef4444 #f1f1f1;
        }
      `}</style>

      {/* The progress bar logic remains the same */}
      <motion.div
        className="sticky top-0 h-1 bg-optimist-red"
        style={{
          scaleX: scrollYProgress,
          transformOrigin: "0%",
        }}
      />

      <div
        ref={scrollableContainerRef}
        className="max-h-[500px] overflow-y-auto custom-scrollbar pr-4 -mr-4"
      >
        {/* --- 2. Use a type guard for conditional rendering --- */}
        {typeof transcript === "string" ? (
          // Case 1: The transcript is a simple string
          <p className="whitespace-pre-wrap leading-relaxed text-foreground/80">
            {transcript}
          </p>
        ) : (
          // Case 2: The transcript is a Portable Text array
          <div className="leading-relaxed">
            <PortableText
              value={transcript}
              components={myPortableTextComponents}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ScrollTranscript;
