"use client";

import { CallDetailsModel } from "@/lib/posts/post.model";
import Link from "next/link";
import { MarkdownRenderer } from "../ui/MarkdownRenderer";
import { motion } from "motion/react";

interface Props {
  data?: CallDetailsModel;
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const CallDetailsInfo = ({ data }: Props) => {
  if (!data) return null;

  return (
    <div className="my-16 w-full">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn}
        className="mb-10 flex flex-col items-center lg:items-start"
      >
        <h3 className="mb-4 text-center text-2xl font-extrabold tracking-tighter text-uno-secondary uppercase lg:text-left">
          Proceso de Participación
        </h3>

        {data.expirationDate && (
          <div className="inline-flex items-center gap-2 rounded-sm bg-red-50 px-4 py-1.5 text-sm font-semibold text-red-600 border border-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>Fecha límite: {data.expirationDate}</span>
          </div>
        )}
      </motion.div>

      {data.steps && data.steps.length > 0 && (
        <div className="flex flex-col gap-6">
          {data.steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeIn}
              className="flex flex-col sm:flex-row items-start gap-6 border border-gray-100 bg-gray-10 p-6 lg:p-8 transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-bold text-white shadow-md">
                {idx + 1}
              </div>

              <div className="w-full">
                <h4 className="mb-3 text-xl font-bold text-gray-900">
                  {step.title}
                </h4>

                <MarkdownRenderer
                  content={step.description}
                  className="prose-sm md:prose-base max-w-none! [&_p]:leading-relaxed last:[&_p]:mb-0"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {data.attachedFile?.url && (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeIn}
          className="mt-10 flex justify-center lg:justify-start"
        >
          <Link
            href={data.attachedFile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-sm bg-secondary px-8 py-4 text-sm font-bold tracking-widest text-white uppercase transition-all hover:bg-black hover:scale-105 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-1"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Descargar Bases de Convocatoria
          </Link>
        </motion.div>
      )}
    </div>
  );
};
