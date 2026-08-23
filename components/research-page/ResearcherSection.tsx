"use client";
import { motion, type Variants } from "motion/react";
import { DynamicCard } from "../ui/DynamicCard";
import { ResearchSectionModel } from "@/lib/research-page/research.model";

interface Props {
  data: ResearchSectionModel;
  basePath: string;
}

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

export const ResearcherSection = ({ data, basePath }: Props) => {
  if (!data) return null;
  const { title, researchers } = data;

  if (!researchers || researchers.length === 0) return null;

  return (
    <section className="flex flex-col items-center">
      <h1 className="w-full py-16 text-center text-3xl font-extrabold tracking-tight text-secondary uppercase">
        {title}
      </h1>

      <motion.article
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid w-full grid-cols-1 gap-x-6 gap-y-16 px-6 lg:grid-cols-2 xl:grid-cols-3 2xl:px-36"
      >
        {researchers.map((researcher) => (
          <DynamicCard
            key={researcher.slug}
            title={researcher.fullName}
            description={researcher.semblance}
            href={`${basePath}/${researcher.slug}`}
            ctaLabel={researcher.ctaLabel}
            cover={researcher.photo}
          />
        ))}
      </motion.article>
    </section>
  );
};
