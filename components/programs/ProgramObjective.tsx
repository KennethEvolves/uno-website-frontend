"use client";
import { useState } from "react";
import type { ObjectiveModel } from "@/lib/programs/program.model";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Icon } from "../ui/Icon";
import { ImageModal } from "../ui/ImageModal";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
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

const image: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

interface Props {
  data: ObjectiveModel;
}

export const ProgramObjective = ({ data }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { title: label, description: value, iconName, image: cover } = data;

  const {
    url: src,
    alternativeText: alt,
    width,
    height,
  } = cover || { url: "", alternativeText: "" };

  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="grid w-full grid-cols-1 overflow-hidden lg:grid-cols-[50%_50%]"
      >
        <motion.article
          variants={container}
          className="order-2 flex flex-col items-center justify-center gap-5 p-8 text-center text-uno-secondary lg:p-16"
        >
          <motion.div
            variants={item}
            className="flex w-full flex-col items-center justify-center gap-5 lg:items-center"
          >
            <Icon iconName={iconName} size={24} className="opacity-50" />
            <h2 className="text-lg leading-[1.1] font-extrabold tracking-tighter text-balance uppercase sm:text-xl xl:text-2xl 2xl:text-3xl">
              {label}
            </h2>
          </motion.div>

          <motion.p
            variants={item}
            className="max-w-lg text-xs leading-relaxed opacity-90 sm:text-sm 2xl:text-base"
          >
            {value}
          </motion.p>
          <motion.div
            variants={item}
            className="mt-4 hidden h-px w-1/3 bg-uno-secondary/20 lg:block"
          ></motion.div>
        </motion.article>

        <motion.article
          variants={image}
          onClick={() => setIsModalOpen(true)}
          className="group relative order-1 h-full min-h-75 w-full cursor-pointer overflow-hidden lg:min-h-125"
        >
          <Image
            src={src}
            alt={alt || label}
            width={width || 800}
            height={height || 600}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/10">
            <span className="rounded-sm bg-black/20 px-4 py-2 text-xs font-bold tracking-widest text-white uppercase opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
              Ver imagen completa
            </span>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-white via-white/5 to-transparent"></div>
        </motion.article>
      </motion.section>

      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        src={src}
        alt={alt || label}
      />
    </>
  );
};
