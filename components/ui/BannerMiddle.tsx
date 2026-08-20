"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "motion/react";
import type { BannerModel } from "@/lib/home/home.model";
import { Icon } from "./Icon";

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

interface Props {
  data: BannerModel;
}

export const Banner = ({ data }: Props) => {
  const { title, description, link, backgroundImage } = data;

  return (
    <section className="relative w-full overflow-hidden py-24 lg:py-32">
      {backgroundImage?.url && (
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.alternativeText || title}
          fill
          className="object-cover object-center"
        />
      )}

      <div className="absolute inset-0 z-1 bg-black/60"></div>

      <div className="relative z-2 container mx-auto max-w-4xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col items-center text-center text-white"
        >
          <motion.div variants={item} className="mb-6">
            <Icon iconName="shield" size={40} className="text-white" />
          </motion.div>

          <motion.h2
            variants={item}
            className="mb-6 text-3xl font-extrabold tracking-tighter text-white uppercase sm:text-4xl"
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              variants={item}
              className="mb-10 max-w-2xl text-lg leading-relaxed text-gray-200"
            >
              {description}
            </motion.p>
          )}

          {link?.url && link?.label && (
            <motion.div variants={item}>
              <Link
                href={link.url}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-4 text-sm font-bold tracking-wider text-white uppercase"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <Icon iconName="arrowupr" size={24} />
                </div>
                <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                  {link.label}
                </span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
