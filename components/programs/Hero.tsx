"use client";
import { useState } from "react";
import type { ImageModel } from "@/lib/shared";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import { DetailsModel } from "@/lib/programs/program.model";
import { ImageModal } from "../ui/ImageModal";
import { Icon } from "../ui/Icon";

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
  name: string;
  description: string;
  level: string;
  details: DetailsModel;
  programKey: string;
  imageHero: ImageModel;
}

interface DetailProps {
  label: string;
  value?: string | number;
  iconName?: string;
}

export const Hero = (data: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { name, description, level, details, programKey, imageHero } = data;

  const {
    url: src,
    alternativeText: alt,
    width,
    height,
  } = imageHero || { url: "", alternativeText: "" };

  return (
    <>
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid w-full grid-cols-1 overflow-hidden bg-white lg:grid-cols-[50%_50%]"
      >
        <motion.article
          variants={container}
          className="order-2 flex flex-col items-center justify-center gap-3 p-8 text-center text-secondary lg:order-1 lg:items-center lg:p-5"
        >
          <motion.p
            variants={item}
            className="text-[10px] font-bold tracking-normal text-uno-primary uppercase sm:text-xs 2xl:text-sm"
          >
            {level} en:
          </motion.p>
          <motion.h1
            variants={item}
            className="text-xl leading-[1.1] font-extrabold tracking-tighter text-balance uppercase sm:text-2xl xl:text-3xl 2xl:text-4xl"
          >
            {name}
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-md text-xs leading-normal opacity-90 sm:text-sm 2xl:text-lg"
          >
            {description}
          </motion.p>

          <motion.div
            variants={item}
            className="my-4 grid w-full max-w-sm grid-cols-2 gap-y-6 rounded-sm border border-secondary/20 px-4 py-6 shadow-sm backdrop-blur-xs"
          >
            <DetailItem
              label={details.modality.label}
              value={details.modality.value}
              iconName={details.modality.iconName}
            />
            <DetailItem
              label={details.duration.label}
              value={details.duration.value}
              iconName={details.duration.iconName}
            />
            <DetailItem
              label={details.cycle.label}
              value={details.cycle.value}
              iconName={details.cycle.iconName}
            />
            <DetailItem
              label={details.location.label}
              value={details.location.value}
              iconName={details.location.iconName}
            />
          </motion.div>

          <motion.p
            variants={item}
            className="rounded-sm bg-secondary/5 px-2 py-0.5 text-[10px] font-medium tracking-normal text-secondary uppercase opacity-40"
          >
            Clave del programa: {programKey}
          </motion.p>
        </motion.article>

        <motion.article
          variants={image}
          onClick={() => setIsModalOpen(true)}
          className="group relative order-1 h-full min-h-75 w-full cursor-pointer overflow-hidden lg:order-2 lg:min-h-125"
        >
          <Image
            src={src}
            alt={alt || name}
            width={width || 1200}
            height={height || 800}
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
        alt={alt || name}
      />
    </>
  );
};

const DetailItem = ({ label, value, iconName }: DetailProps) => (
  <section className="flex h-full w-full flex-col items-center gap-2 px-4 py-1">
    <article className="flex flex-row items-center justify-center gap-2">
      <Icon iconName={iconName} size={12} className="opacity-60" />
      <span className="text-[10px] font-medium uppercase opacity-75">
        {label}
      </span>
    </article>
    <span className="text-xs leading-tight font-semibold text-secondary 2xl:text-sm">
      {value}
    </span>
  </section>
);
