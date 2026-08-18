"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "motion/react";
import type {
  DepartmentModel,
  DirectoryModel,
} from "@/lib/university/university.model";
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
  data: DirectoryModel;
}

export const Directory = ({ data }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const {
    title = "",
    description = "",
    departments = [],
    background,
  } = data || {};

  const { url: src, alternativeText: alt } = background || {
    url: "",
    alternativeText: "",
  };

  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="absolute inset-0 z-0">
          {src && (
            <Image
              src={src}
              alt={alt || title}
              fill
              className="object-cover object-center"
            />
          )}
        </div>

        <div className="absolute inset-0 bg-linear-to-b from-secondary/40 via-secondary/60 to-secondary/90"></div>

        <div className="relative z-20 container mx-auto max-w-6xl px-6">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col items-start gap-12 text-left lg:gap-16"
          >
            <article className="flex w-full flex-col items-start">
              <motion.div
                variants={item}
                className="mb-6 flex items-center gap-4"
              >
                <Icon
                  iconName="people"
                  size={28}
                  className="text-white opacity-80"
                />
                <h2 className="text-xl leading-[1.1] font-extrabold tracking-tighter text-balance text-white uppercase sm:text-2xl xl:text-3xl 2xl:text-4xl">
                  {title}
                </h2>
              </motion.div>

              <motion.p
                variants={item}
                className="max-w-4xl text-xs leading-relaxed text-white/90 sm:text-sm 2xl:text-base"
              >
                {description}
              </motion.p>
            </article>

            <motion.article
              variants={item}
              className="flex w-full flex-col gap-4 lg:w-4/5"
            >
              {departments?.map((dept, index) => (
                <DepartmentAccordion
                  key={index}
                  department={dept}
                  isOpen={activeIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              ))}
            </motion.article>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface AccordionProps {
  department: DepartmentModel;
  isOpen: boolean;
  onToggle: () => void;
}

const DepartmentAccordion = (accordion: AccordionProps) => {
  const { department, isOpen, onToggle } = accordion;
  const { name = "", staffMembers = [] } = department || {};
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && itemRef.current) {
      const timeoutId = setTimeout(() => {
        itemRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="flex scroll-mt-22 flex-col overflow-hidden rounded-sm bg-white shadow-2xl transition-colors"
    >
      <button
        onClick={onToggle}
        className={`flex w-full cursor-pointer flex-row items-center justify-between p-6 text-left transition-colors hover:bg-secondary/5 focus:outline-none ${isOpen ? "text-uno-primary" : "text-secondary"}`}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm">
            <Icon iconName="briefcase" size={18} />
          </div>
          <h3 className="text-sm font-bold tracking-widest uppercase md:text-base">
            {name}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Icon iconName="chevronDown" size={20} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-secondary/10 bg-gray-50/30 p-6">
              <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {staffMembers?.map((staff, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-center gap-4 border border-secondary/10 bg-white p-4 transition-shadow hover:shadow-xs"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm leading-tight font-bold text-secondary">
                        {staff.fullName}
                      </span>
                      <span className="mt-0.5 text-[10px] font-medium tracking-wide text-uno-primary uppercase opacity-90">
                        {staff.role}
                      </span>
                      {staff.email && (
                        <span className="mt-1 text-xs text-gray-500">
                          {staff.email}
                        </span>
                      )}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
