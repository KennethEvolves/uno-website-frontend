"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import type { HomeHeaderModel } from "@/lib/home/home.model";

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
  data: HomeHeaderModel;
}

export const HomeHeader = ({ data }: Props) => {
  const { title, description, link, backgroundImage } = data;

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative flex h-[70vh] min-h-125 w-full items-center justify-center overflow-hidden xl:h-[85vh]"
    >
      <motion.div
        variants={image}
        className="absolute inset-0 z-0 bg-uno-secondary"
      >
        {backgroundImage?.url && (
          <Image
            src={backgroundImage.url}
            alt={backgroundImage.alternativeText || title}
            fill
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/40 bg-linear-to-t from-uno-secondary/90 via-black/40 to-transparent" />
      </motion.div>

      <motion.div
        variants={container}
        className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-6 text-center text-white md:px-12 lg:px-24"
      >
        <motion.h1
          variants={item}
          className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white drop-shadow-md   xl:text-6xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={item}
            className="text-balance max-w-3xl text-base font-light text-white/90 drop-shadow-sm sm:text-lg md:text-xl"
          >
            {description}
          </motion.p>
        )}

        {link?.url && link?.label && (
          <motion.div variants={item} className="mt-4">
            <Link
              href={link.url}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="group relative inline-flex"
            >
              <span className="rounded-sm bg-black/20 px-6 py-3 text-xs font-bold tracking-widest text-white uppercase backdrop-blur-md transition-all duration-300 hover:bg-black/40 hover:shadow-lg">
                {link.label}
              </span>
            </Link>
          </motion.div>
        )}
      </motion.div>
    </motion.section>
  );
};
