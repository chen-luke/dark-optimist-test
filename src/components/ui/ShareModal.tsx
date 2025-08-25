"use client";

import React from "react";
import { FaTimes } from "react-icons/fa"; // You may need to install react-icons: npm i react-icons

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  shareId: string;
};

export default function ShareModal({
  isOpen,
  onClose,
  shareId,
}: ShareModalProps) {
  // Don't render the modal if it's not open
  if (!isOpen) {
    return null;
  }

  // Get the current URL to be shared
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}#${shareId}`
      : "";

  return (
    // Overlay: covers the entire screen and closes the modal on click
    <div
      aria-modal="true"
      className="fixed inset-0 bg-foreground/30 z-50 flex justify-center items-center p-4 aria-modal"
      onClick={onClose}
    >
      {/* Modal Panel: Prevents closing when clicking inside the modal content */}
      <div
        className="relative bg-background text-foreground p-6 rounded-xl shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-foreground/70 hover:text-foreground transition-colors cursor-pointer"
          aria-label="Close share link modal"
        >
          <FaTimes size={20} />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">Share</h3>
          <p className="text-foreground/80">
            Copy the link below to share this content with others.
          </p>
          <input
            type="text"
            readOnly
            value={shareUrl}
            className="w-full p-2 mt-2 border border-foreground/20 rounded bg-foreground/10 text-foreground"
            onFocus={(e) => e.target.select()} // Automatically select text on focus
          />
        </div>
      </div>
    </div>
  );
}
