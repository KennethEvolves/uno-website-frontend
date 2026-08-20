"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRightIcon } from "@primer/octicons-react";
import { motion, Variants } from "motion/react";
import { ImageModel } from "@/lib/shared";

export interface CardProps {
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  cover: ImageModel;
}

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const Card = ({
  title,
  description,
  href,
  ctaLabel,
  cover,
}: CardProps) => {
  return (
    <motion.div
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative z-10 h-125 w-full py-8 will-change-transform hover:z-20 lg:hover:shadow-2xl bg-linear-to-tr from-[#1e1e1e] via-[#3a1114] to-[#1e1e1e]"
    >
      <Link href={href}>
        <div className="absolute inset-0 transition-transform duration-500 lg:group-hover:-translate-y-7 lg:group-hover:scale-110">
          <Image
            src={cover.url}
            alt={cover.alternativeText || title}
            fill
            className="object-contain"
          />
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent transition-opacity duration-500 lg:group-hover:opacity-90" />

        <div className="absolute bottom-0 z-30 flex w-full flex-col gap-4 p-8 text-white">
          <h1 className="text-2xl leading-tight font-bold uppercase transition-transform duration-500 sm:text-3xl">
            {title}
          </h1>

          <div className="max-h-30 overflow-hidden opacity-100 transition-all duration-500 ease-in-out group-hover:max-h-40 group-hover:opacity-100 lg:max-h-0 lg:opacity-0">
            <p className="text-sm leading-relaxed font-light xl:text-lg">
              {description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
              <ArrowUpRightIcon size={20} />
            </div>
            <span>{ctaLabel}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
