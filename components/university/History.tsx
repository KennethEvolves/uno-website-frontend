"use client";
import ReactMarkdown from "react-markdown";
import { motion, type Variants } from "motion/react";
import type { HistoryModel } from "@/lib/university/university.model";
import { Icon } from "../ui/Icon";

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
  data: HistoryModel;
}

export const History = ({ data }: Props) => {
  const { title = "", content = "" } = data || {};

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-start text-left"
        >
          <motion.div variants={item} className="mb-8 flex items-center gap-4">
            <Icon
              iconName="book"
              size={28}
              className="text-uno-secondary opacity-50"
            />
            <h2 className="text-xl leading-[1.1] font-extrabold tracking-tighter text-balance text-uno-secondary uppercase sm:text-2xl xl:text-3xl 2xl:text-4xl">
              {title}
            </h2>
          </motion.div>

          <motion.div
            variants={item}
            className="max-w-4xl text-xs leading-relaxed text-gray-700 opacity-90 sm:text-sm 2xl:text-base [&_h3]:mt-8 [&_h3]:mb-4 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-uno-secondary sm:[&_h3]:text-lg [&_li]:mb-2 [&_p]:mb-5 [&_strong]:font-bold [&_strong]:text-uno-secondary [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-5"
          >
            <ReactMarkdown>{content}</ReactMarkdown>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
