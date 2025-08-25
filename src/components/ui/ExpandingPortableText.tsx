// src/components/ui/expanding-portable-text.tsx
"use client";

import React, { useState } from "react";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import myPortableTextComponents from "./PortableTextComponentStyling";

interface ExpandingPortableTextProps {
  /** The full array of Portable Text blocks from Sanity */
  value: PortableTextBlock[];
  /** The number of blocks to show in a multi-block preview. Defaults to 1. */
  blockPreviewLength?: number;
  /**
   * If there's only one block, truncate it at this character length.
   * Defaults to 400.
   */
  charPreviewLength?: number;
}

const ExpandingPortableText: React.FC<ExpandingPortableTextProps> = ({
  value,
  blockPreviewLength = 1,
  charPreviewLength = 400, // A reasonable default character limit
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  let hasMoreContent = false;
  let displayedValue = value;

  // --- NEW LOGIC ---
  // Check if we're dealing with a single, large block of text.
  if (
    value &&
    value.length === 1 &&
    value[0]._type === "block" &&
    value[0].children
  ) {
    // Calculate the total text length of the single block
    const singleBlockText = value[0].children
      .map((child) => child.text || "")
      .join("");

    if (singleBlockText.length > charPreviewLength) {
      hasMoreContent = true;

      if (!isExpanded) {
        // Create a truncated version of the block for the preview
        // We must deep-copy the object to avoid mutating the original data
        const previewBlock = JSON.parse(JSON.stringify(value[0]));

        let currentLength = 0;
        const newChildren = [];

        // Truncate children intelligently
        for (const child of previewBlock.children) {
          if (currentLength + child.text.length > charPreviewLength) {
            child.text =
              child.text.substring(0, charPreviewLength - currentLength) +
              "...";
            newChildren.push(child);
            break; // Stop after truncating
          }
          newChildren.push(child);
          currentLength += child.text.length;
        }

        previewBlock.children = newChildren;
        displayedValue = [previewBlock];
      }
    }
  } else if (value && value.length > blockPreviewLength) {
    // --- ORIGINAL LOGIC ---
    // Fallback to the original logic for multi-block content
    hasMoreContent = true;
    if (!isExpanded) {
      displayedValue = value.slice(0, blockPreviewLength);
    }
  }
  // --- END OF LOGIC ---

  const handleToggle = () => setIsExpanded(!isExpanded);

  if (!value || value.length === 0) {
    return null;
  }

  return (
    <div>
      <div
        className={
          !isExpanded && hasMoreContent
            ? "relative max-h-96 overflow-hidden" // Increased max-height for longer previews
            : ""
        }
      >
        <PortableText
          value={displayedValue}
          components={myPortableTextComponents}
        />
        {!isExpanded && hasMoreContent && (
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-background to-transparent"></div>
        )}
      </div>

      {hasMoreContent && (
        <div className="flex w-full justify-end mt-4">
          <button
            aria-label="read more"
            className="cursor-pointer bg-optimist-red hover:bg-red-600 text-white py-2 px-5 rounded-md shadow-md transition-colors duration-200"
            onClick={handleToggle}
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpandingPortableText;
