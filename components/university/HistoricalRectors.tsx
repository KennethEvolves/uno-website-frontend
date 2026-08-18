"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "motion/react";
import type {
  HistoricalRectorsModel,
  RectorModel,
} from "@/lib/university/university.model";
import { Icon } from "../ui/Icon";
import ReactMarkdown from "react-markdown";

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
  data: HistoricalRectorsModel;
}

export const HistoricalRectors = ({ data }: Props) => {
  const [selectedRector, setSelectedRector] = useState<RectorModel | null>(
    null,
  );

  // Defensiva
  const { title = "", description = "", rectors = [] } = data || {};

  useEffect(() => {
    if (selectedRector) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedRector]);

  return (
    <>
      <section className="pb-16 lg:pb-24">
        <div className="container mx-auto max-w-6xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="flex flex-col items-start gap-12 text-left lg:gap-16"
          >
            <article className="flex w-full flex-col items-start">
              <motion.div
                variants={item}
                className="mb-6 flex items-center gap-4"
              >
                <Icon
                  iconName="mortarboard"
                  size={28}
                  className="text-uno-secondary opacity-50"
                />
                <h2 className="text-xl leading-[1.1] font-extrabold tracking-tighter text-balance text-uno-secondary uppercase sm:text-2xl xl:text-3xl 2xl:text-4xl">
                  {title}
                </h2>
              </motion.div>
              <motion.p
                variants={item}
                className="max-w-4xl text-xs leading-relaxed text-gray-700 sm:text-sm 2xl:text-base"
              >
                {description}
              </motion.p>
            </article>

            <motion.div
              variants={item}
              className="grid w-full grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-16"
            >
              {rectors?.map((rector, index) => (
                <motion.article
                  key={index}
                  variants={item}
                  onClick={() => setSelectedRector(rector)}
                  className="group flex cursor-pointer flex-col items-center text-center text-uno-secondary/50 transition-colors duration-700 hover:text-uno-primary"
                >
                  <div className="relative mb-4 aspect-square w-full overflow-hidden shadow-sm transition-shadow duration-300 group-hover:shadow-lg bg-gray-50">
                    {/* Defensiva en la imagen del mapa */}
                    {rector.photo?.url && (
                      <Image
                        src={rector.photo.url}
                        alt={rector.photo.alternativeText || rector.fullName}
                        fill
                        className="object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-uno-secondary/0 bg-linear-to-b transition-colors duration-700 group-hover:from-uno-secondary/0 group-hover:via-uno-secondary/20 group-hover:to-uno-secondary/50"></div>
                  </div>
                  <h3 className="text-sm font-bold md:text-base">
                    {rector.fullName}
                  </h3>
                  <span className="mt-1 text-xs font-semibold tracking-widest uppercase">
                    {rector.period}
                  </span>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selectedRector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedRector(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-sm bg-white shadow-2xl lg:flex-row"
            >
              <button
                onClick={() => setSelectedRector(null)}
                className="absolute top-4 right-4 z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-uno-secondary transition-colors hover:bg-uno-secondary/10 lg:top-6 lg:right-6"
              >
                <Icon iconName="skip" size={20} />
              </button>

              <div className="relative h-64 w-full shrink-0 lg:h-auto lg:w-2/5 bg-gray-50">
                {selectedRector.photo?.url && (
                  <Image
                    src={selectedRector.photo.url}
                    alt={
                      selectedRector.photo.alternativeText ||
                      selectedRector.fullName
                    }
                    fill
                    className="object-contain"
                  />
                )}
              </div>

              <div className="flex w-full flex-col overflow-y-auto p-6 lg:p-10">
                <div className="mb-6 border-b border-uno-secondary/20 pb-6">
                  <span className="mb-2 block text-xs font-bold tracking-widest uppercase">
                    Periodo de rectorado: {selectedRector.period}
                  </span>
                  <h3 className="text-2xl font-extrabold text-uno-secondary lg:text-3xl">
                    {selectedRector.fullName}
                  </h3>
                </div>
                <div className="text-sm leading-relaxed text-gray-700 opacity-90 [&_li]:mb-1 [&_p]:mb-4 [&_strong]:font-bold [&_strong]:text-uno-secondary [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-5">
                  <ReactMarkdown>
                    {selectedRector.biography || ""}
                  </ReactMarkdown>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
