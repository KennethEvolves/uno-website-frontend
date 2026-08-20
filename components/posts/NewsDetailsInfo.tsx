"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { ImageModal } from "../ui/ImageModal";
import { NewsDetailsModel } from "@/lib/posts/post.model";

interface Props {
  data?: NewsDetailsModel;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const NewsDetailsInfo = ({ data }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (!data?.gallery || data.gallery.length === 0) return null;

  const handleNext = () => {
    if (selectedIndex !== null && selectedIndex < data.gallery.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null && selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="my-16 w-full">
      <motion.h3
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="mb-8 text-center text-2xl font-extrabold tracking-tighter text-uno-secondary uppercase lg:text-left"
      >
        Galería Fotográfica
      </motion.h3>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6"
      >
        {data.gallery.map((img, idx) => (
          <div
            key={img.url || idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-video w-full cursor-pointer overflow-hidden  bg-gray-100 shadow-sm"
          >
            <Image
              src={img.url}
              alt={img.alternativeText || `Imagen de galería ${idx + 1}`}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 33vw"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
              <span className="rounded-full bg-white/20 p-3 text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {selectedIndex !== null && (
        <ImageModal
          isOpen={selectedIndex !== null}
          onClose={() => setSelectedIndex(null)}
          src={data.gallery[selectedIndex].url}
          alt={
            data.gallery[selectedIndex].alternativeText || "Imagen en grande"
          }
          onNext={handleNext}
          onPrev={handlePrev}
          hasNext={selectedIndex < data.gallery.length - 1}
          hasPrev={selectedIndex > 0}
        />
      )}
    </div>
  );
};
