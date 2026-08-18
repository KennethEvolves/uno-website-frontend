"use client";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { XIcon } from "@primer/octicons-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export const ImageModal = ({ isOpen, onClose, src, alt }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex cursor-pointer items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-6 right-6 cursor-pointer rounded-full p-2 text-white transition-colors hover:bg-white/10"
            onClick={onClose}
          >
            <XIcon size={24} />
          </motion.button>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative h-full max-h-[85vh] w-full max-w-7xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-contain"
              quality={100}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
