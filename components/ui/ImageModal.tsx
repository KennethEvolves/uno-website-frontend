"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@primer/octicons-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const ImageModal = ({
  isOpen,
  onClose,
  src,
  alt,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: Props) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowRight" && onNext && hasNext) onNext();
        if (e.key === "ArrowLeft" && onPrev && hasPrev) onPrev();
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen, onClose, onNext, onPrev, hasNext, hasPrev]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-sm"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-6 right-6 z-50 cursor-pointer rounded-full bg-black/50 p-3 text-white transition-colors hover:bg-white/20"
            onClick={onClose}
          >
            <XIcon size={24} />
          </motion.button>
          {hasPrev && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-4 z-50 cursor-pointer rounded-full bg-black/50 p-4 text-white transition-colors hover:bg-white/20 md:left-8"
              onClick={(e) => {
                e.stopPropagation();
                if (onPrev) onPrev();
              }}
            >
              <ChevronLeftIcon size={32} />
            </motion.button>
          )}

          <motion.div
            key={src}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative h-full max-h-[85vh] w-full max-w-6xl"
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 95vw, 1200px"
            />
          </motion.div>
          {hasNext && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute right-4 z-50 cursor-pointer rounded-full bg-black/50 p-4 text-white transition-colors hover:bg-white/20 md:right-8"
              onClick={(e) => {
                e.stopPropagation();
                if (onNext) onNext();
              }}
            >
              <ChevronRightIcon size={32} />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
