import { FaShare } from "react-icons/fa";
import React from "react";

type ShareButtonProps = {
  onClick?: () => void;
};

export default function ShareButton({ onClick }: ShareButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cursor-pointer"
      aria-label="share post"
    >
      <FaShare />
    </button>
  );
} 
