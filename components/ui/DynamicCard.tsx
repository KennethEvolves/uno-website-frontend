"use client";
import Image from "next/image";
import Link from "next/link";
import type { ImageModel } from "@/lib/shared/model";
import { Icon } from "./Icon";
import { Variants } from "motion";
import { motion } from "motion/react";

export interface DynamicCardProps {
  title: string;
  description?: string;
  href: string;
  ctaLabel: string;
  cover: ImageModel;
  subtitle?: string;
  badge?: string;
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

export const DynamicCard = ({
  title,
  description,
  href,
  ctaLabel,
  cover,
  subtitle,
  badge,
}: DynamicCardProps) => {
  const badgeColor =
    badge?.toLowerCase() === "noticia"
      ? "bg-[#94251e]"
      : badge?.toLowerCase() === "convocatoria"
        ? "bg-[#c4a366]"
        : "bg-green-600";

  const { url: src, alternativeText: alt } = cover || {
    url: "",
    alternativeText: "",
  };

  return (
    <motion.div
      variants={item}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="group relative z-10 h-125 w-full overflow-hidden will-change-transform hover:z-20 lg:hover:shadow-2xl"
    >
      <Link href={href}>
        <div className="absolute inset-0 transition-transform duration-500 lg:group-hover:scale-110 bg-linear-to-tr from-[#1e1e1e] via-[#3a1114] to-[#1e1e1e]">
          {src && (
            <Image
              src={src}
              alt={alt || title}
              fill
              sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 80vw, 50vw"
              quality={90}
              className="object-cover"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent transition-opacity duration-500 lg:group-hover:opacity-90" />

        {badge && (
          <div className="absolute top-8 left-8 z-30">
            <span
              className={`px-3 py-1.5 text-[10px] font-bold tracking-widest text-white uppercase shadow-sm ${badgeColor}`}
            >
              {badge}
            </span>
          </div>
        )}

        <div className="absolute bottom-0 z-30 flex w-full flex-col gap-4 p-8 text-white">
          {subtitle && (
            <span className="text-xs font-semibold tracking-widest">
              {subtitle}
            </span>
          )}

          <h3 className="text-2xl leading-tight font-bold uppercase transition-transform duration-500">
            {title}
          </h3>

          <div className="max-h-30 overflow-hidden opacity-100 transition-all duration-500 ease-in-out group-hover:max-h-52 group-hover:opacity-100 lg:max-h-0 lg:opacity-0">
            {description && (
              <p className="text-sm leading-relaxed font-light xl:text-lg">
                {description}
              </p>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm font-semibold tracking-wider uppercase">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
              <Icon iconName="arrowr" size={20} />
            </div>
            <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-white after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
              {ctaLabel}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
