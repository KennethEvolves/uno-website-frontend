"use client";
import { useState } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { motion, type Variants } from "motion/react";
import type { MissionVisionModel } from "@/lib/university/university.model";
import type { ImageModel } from "@/lib/shared/model";
import { Icon } from "../ui/Icon";
import { ImageModal } from "../ui/ImageModal";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 },
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
  data: MissionVisionModel;
}

export const MissionVision = ({ data }: Props) => {
  const [modalImage, setModalImage] = useState<ImageModel | null>(null);

  const { mission = "", vision = "", images } = data || {};
  const { mission: imageMission, vision: imageVision } = images || {};

  const renderBlock = (
    title: string,
    icon: string,
    content: string,
    image?: ImageModel,
  ) => {
    const { url: src, alternativeText: alt } = image || {
      url: "",
      alternativeText: "",
    };

    return (
      <article className="flex w-full flex-col items-start text-left">
        <motion.div variants={item} className="mb-6 flex items-center gap-4">
          <Icon
            iconName={icon}
            size={28}
            className="text-uno-secondary opacity-50"
          />
          <h2 className="text-xl leading-[1.1] font-extrabold tracking-tighter text-balance text-uno-secondary uppercase sm:text-2xl xl:text-3xl 2xl:text-4xl">
            {title}
          </h2>
        </motion.div>

        <motion.div
          variants={item}
          className="mb-10 max-w-4xl text-xs leading-relaxed text-gray-700 opacity-90 sm:text-sm 2xl:text-base [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-uno-secondary"
        >
          <ReactMarkdown>{content}</ReactMarkdown>
        </motion.div>

        <motion.div
          variants={imageVariants}
          onClick={() => src && setModalImage(image as ImageModel)}
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
      </article>
    );
  };

  return (
    <>
      <section className="bg-white py-16 lg:py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex flex-col gap-24 lg:gap-32"
          >
            {renderBlock("Visión", "eye", vision, imageVision)}
            {renderBlock("Misión", "flag", mission, imageMission)}
          </motion.div>
        </div>
      </section>

      {modalImage?.url && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
          src={modalImage.url}
          alt={modalImage.alternativeText || ""}
        />
      )}
    </>
  );
};
