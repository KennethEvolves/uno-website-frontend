"use client";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import type { GraduateProfileModel } from "@/lib/programs/program.model";
import Image from "next/image";
import { Icon } from "../ui/Icon";
import { ImageModal } from "../ui/ImageModal";

interface Props {
  data: GraduateProfileModel;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
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

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.0, ease: "easeOut" },
  },
};

export const GraduateProfile = ({ data }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToogle = (index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const {
    title = "Perfil de Egreso",
    knowledge = [],
    skills = [],
    attitudes = [],
    image,
  } = data || {};

  const { url: src, alternativeText: alt } = image || {
    url: "",
    alternativeText: "",
  };

  const accordionData = [
    { title: "Conocimientos", items: knowledge, iconName: "book" },
    { title: "Habilidades", items: skills, iconName: "tools" },
    { title: "Aptitudes", items: attitudes, iconName: "heart" },
  ];

  return (
    <div className="flex flex-col items-center">
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
        className="grid w-full grid-cols-1 overflow-hidden lg:grid-cols-[50%_50%]"
      >
        <motion.article
          variants={container}
          className="order-2 flex flex-col items-center justify-center gap-5 p-8 pb-4 text-center text-secondary lg:p-16"
        >
          <motion.div
            variants={item}
            className="flex w-full flex-col items-center justify-center gap-5 lg:items-center"
          >
            <Icon iconName="mortarboard" size={24} className="opacity-50" />
            <h2 className="max-w-xl text-lg leading-[1.1] font-extrabold tracking-tighter text-balance uppercase sm:text-xl xl:text-2xl 2xl:text-3xl">
              {title}
            </h2>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-4 hidden h-px w-1/3 bg-secondary/20 lg:block"
          ></motion.div>
        </motion.article>

        <motion.article
          variants={imageVariants}
          onClick={() => src && setIsModalOpen(true)}
          className="group relative order-1 h-110 min-h-75 w-full cursor-pointer overflow-hidden lg:order-2 lg:min-h-125 "
        >
          {src && (
            <Image
              src={src}
              alt={alt || title || "Imagen de perfil de egreso"}
              fill
              className="object-contain"
              priority
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-white via-white/5 to-transparent"></div>
        </motion.article>
      </motion.section>

      {src && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          src={src}
          alt={alt || title}
        />
      )}

      <motion.article className="flex w-full max-w-6xl flex-col gap-4 px-6 py-8">
        {accordionData.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            items={item.items}
            iconName={item.iconName}
            isOpen={activeIndex === index}
            onToggle={() => handleToogle(index)}
          />
        ))}
      </motion.article>
    </div>
  );
};

interface AccordionItemProps {
  title: string;
  items: string[];
  iconName: string;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = (accordion: AccordionItemProps) => {
  const { title, items, iconName, isOpen, onToggle } = accordion;
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && itemRef.current) {
      const timeoutId = setTimeout(() => {
        itemRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 250);
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen]);

  return (
    <div
      ref={itemRef}
      className="flex scroll-mt-22 flex-col overflow-hidden rounded-sm border border-secondary/10 bg-white shadow-xs transition-colors"
    >
      <button
        onClick={onToggle}
        className={`flex w-full cursor-pointer flex-row items-center justify-between p-6 text-left transition-colors hover:bg-secondary/5 focus:outline-none ${isOpen ? "text-primary" : "text-secondary"}`}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm">
            <Icon iconName={iconName} size={18} />
          </div>

          <h3 className="text-sm font-bold tracking-widest uppercase">
            {title}
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
            <div className="border-t border-secondary/10 p-6">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
                {items?.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -25 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Icon
                      iconName="checkicon"
                      size={14}
                      className="mt-0.5 shrink-0"
                    />
                    <span className="leading-tight">{item}</span>
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
