"use client";

import { motion, type Variants } from "motion/react";
import type { PostModel } from "@/lib/posts/post.model";
import { DynamicCard } from "@/components/ui/DynamicCard";
import Link from "next/link";
import { Icon } from "../ui/Icon";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.9,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

interface Props {
  data: PostModel[];
}

export const HomeLatestNewsSection = ({ data }: Props) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="flex flex-col items-center bg-white">
      <h1 className="w-full py-16 text-center text-3xl font-extrabold tracking-tight text-uno-secondary uppercase">
        Publicaciones Recientes
      </h1>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid w-full grid-cols-1 gap-x-6 gap-y-16 px-6 lg:grid-cols-2 xl:grid-cols-3 2xl:px-36"
      >
        {data.map((post) => (
          <motion.div key={post.slug} variants={item} className="h-full w-full">
            <DynamicCard
              title={post.title}
              description={post.excerpt}
              href={`/noticias/${post.slug}`}
              ctaLabel={post.ctaLabel || "Leer más"}
              cover={post.coverImage}
              subtitle={post.publishDate}
              badge={post.type}
            />
          </motion.div>
        ))}

        <motion.div
          variants={item}
          className="flex h-full min-h-62.5 w-full items-center justify-center lg:min-h-full"
        >
          <Link
            href="/noticias"
            className="group flex items-center gap-4 text-sm font-bold tracking-wider text-black uppercase"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white">
              <Icon iconName="arrowupr" size={24} />
            </div>

            <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
              Ver más novedades
            </span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
