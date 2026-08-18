"use client";
import { PageHeaderModel } from "@/lib/shared";
import Image from "next/image";
import { motion, type Variants } from "motion/react";

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
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

interface Props {
  data: PageHeaderModel;
}

export const PageHeader = ({ data }: Props) => {
  const { subtitle, title, description, backgroundImage } = data;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex h-[60vh] min-h-125 w-full items-center justify-center overflow-hidden xl:h-[70vh]"
    >
      <motion.div variants={image} className="absolute inset-0 z-0">
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alternativeText || title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/50 bg-linear-to-t from-uno-secondary/90 via-black/40 to-transparent" />
      </motion.div>

      <motion.div
        variants={container}
        className="relative z-10 flex w-full max-w-7xl flex-col gap-4 px-6 text-white md:px-12 lg:px-24"
      >
        <motion.div variants={item} className="flex items-center gap-4">
          <div className="h-0.5 w-8 bg-white" />
          <span className="text-sm font-bold tracking-[0.2em] uppercase md:text-base">
            {subtitle}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-2xl text-base font-light leading-relaxed text-gray-200 md:text-lg lg:text-xl"
        >
          {description}
        </motion.p>
      </motion.div>
    </motion.section>
  );
};
