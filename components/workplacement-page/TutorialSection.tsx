"use client";

import ReactMarkdown from "react-markdown";
import { motion, type Variants } from "motion/react";
import { Icon } from "../ui/Icon";
import { TutorialModel } from "@/lib/workplacement-page/workplacement.model";

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

const videoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

interface Props {
  data: TutorialModel;
}

export const TutorialSection = ({ data }: Props) => {
  if (!data?.title) return null;

  const { title, description, videoTutorial } = data;
  const { url: src } = videoTutorial || { url: "" };

  return (
    <section className="w-full py-12 lg:py-16">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-col items-start text-left"
      >
        <motion.div variants={item} className="mb-6 flex items-center gap-4">
          <h3 className="text-2xl font-bold tracking-tight text-secondary ">
            {title}
          </h3>
        </motion.div>

        {description && (
          <motion.div
            variants={item}
            className="mb-10 max-w-4xl text-xs leading-relaxed text-gray-700 opacity-90 sm:text-sm 2xl:text-base [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-uno-secondary"
          >
            <ReactMarkdown>{description}</ReactMarkdown>
          </motion.div>
        )}

        {src && (
          <motion.div
            variants={videoVariants}
            className="relative aspect-video w-full overflow-hidden bg-black shadow-sm md:aspect-21/9 lg:w-4/5"
          >
            <video
              src={src}
              controls
              preload="metadata"
              className="h-full w-full object-cover"
            />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};
