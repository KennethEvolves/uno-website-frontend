"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import type { InstitutionalValuesModel } from "@/lib/university/university.model";
import { Icon } from "../ui/Icon";
import { ImageModal } from "../ui/ImageModal";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};
const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

interface Props {
  data: InstitutionalValuesModel;
}

export const InstitutionalValues = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { title = "", description = "", values = [], image } = data || {};

  const { url: src, alternativeText: alt } = image || {
    url: "",
    alternativeText: "",
  };

  return (
    <>
      <section className="bg-white pb-16 lg:pb-24">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-start gap-12 text-left lg:gap-16"
          >
            <article className="flex w-full flex-col items-start">
              <motion.div
                variants={item}
                className="mb-6 flex items-center gap-4"
              >
                <Icon iconName="tiers" size={28} className="opacity-50" />
                <h2 className="text-xl leading-[1.1] font-extrabold tracking-tighter text-balance text-uno-secondary uppercase sm:text-2xl xl:text-3xl 2xl:text-4xl">
                  {title}
                </h2>
              </motion.div>
              <motion.p
                variants={item}
                className="max-w-4xl text-xs leading-relaxed text-gray-700 opacity-90 sm:text-sm 2xl:text-base"
              >
                {description}
              </motion.p>
            </article>

            <motion.div
              variants={item}
              className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:w-4/5 lg:grid-cols-3"
            >
              {values?.map((value, index) => (
                <div
                  key={index}
                  className="group flex cursor-pointer items-center gap-3 border-l-2 border-l-uno-secondary/50 py-2 pl-4 text-uno-secondary transition-colors hover:border-uno-primary"
                >
                  <span className="text-sm font-bold tracking-wide uppercase group-hover:text-uno-primary 2xl:text-base">
                    {value}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              variants={imageVariants}
              onClick={() => src && setIsModalOpen(true)}
              className="group relative aspect-video w-full cursor-pointer overflow-hidden shadow-sm md:aspect-21/9 lg:w-4/5 bg-gray-50"
            >
              {src && (
                <Image
                  src={src}
                  alt={alt || title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
                <span className="rounded-sm bg-black/20 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                  Ver imagen completa
                </span>
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/10 ring-inset"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {src && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          src={src}
          alt={alt || title}
        />
      )}
    </>
  );
};
