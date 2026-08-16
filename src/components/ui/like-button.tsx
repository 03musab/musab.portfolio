"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface LikeButtonProps {
  className?: string;
  initialCount?: number;
}

export function LikeButton({ className, initialCount = 42 }: LikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setCount((prev) => prev + 1);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      onClick={handleLike}
      className={cn(
        "relative inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 font-mono text-xs transition-colors cursor-pointer select-none",
        liked ? "border-rose-500/40 bg-rose-500/10 text-rose-400" : "text-foreground/80 hover:text-foreground",
        className
      )}
    >
      <div className="relative flex items-center justify-center">
        <motion.span
          animate={{ scale: liked ? [1, 1.4, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            size={15}
            className={cn(
              "transition-colors duration-300",
              liked ? "fill-rose-500 text-rose-500" : "text-foreground/50"
            )}
          />
        </motion.span>

        {/* Heart particle burst effect */}
        <AnimatePresence>
          {liked && (
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 2.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute size-4 rounded-full border border-rose-500"
            />
          )}
        </AnimatePresence>
      </div>

      <span className="font-semibold">{count}</span>
    </motion.button>
  );
}
