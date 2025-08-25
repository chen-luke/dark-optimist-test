// src/components/ui/motion-wrapper.tsx
"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

// Define animation variants
const animationVariants = {
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  hidden: { opacity: 0, y: 50 },
};

// Correctly type the props to match Framer Motion's API
type FadeUpAnimationWraperProps = {
  children: ReactNode;
  // This prop now correctly accepts a number (ratio) or the specific
  // strings "some" or "all".
  triggerAmount?: number | "some" | "all";
};

export default function FadeUpAnimationWraper({
  children,
  triggerAmount = 0.2, // Default to 20% visibility
}: FadeUpAnimationWraperProps) {
  const ref = useRef(null);

  const isInView = useInView(ref, { once: true, amount: triggerAmount });

  return (
    <motion.div
      ref={ref}
      variants={animationVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}
