"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDownIcon } from "@primer/octicons-react";
import { NavItemModel } from "@/lib/layout/navbar";

interface DesktopMenuProps {
  items: NavItemModel[];
}

export const DesktopMenu = ({ items }: DesktopMenuProps) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  if (!items || items.length === 0) return null;

  return (
    <ul className="hidden lg:flex items-center gap-8 relative z-50">
      {items.map((item) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isActive =
          pathname === item.url ||
          (hasSubItems && item.subItems?.some((sub) => pathname === sub.url));

        return (
          <li
            key={item.url}
            className="relative py-6"
            onMouseEnter={() => setHoveredItem(item.url)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link
              href={item.url}
              className={`flex items-center gap-1 text-[16px] transition-colors duration-200 cursor-pointer
                ${isActive ? "text-primary font-semibold" : "text-gray-500 hover:text-primary"}`}
            >
              {item.label}
              {hasSubItems && (
                <ChevronDownIcon
                  size={16}
                  className={`transition-transform duration-200 ${hoveredItem === item.url ? "rotate-180" : "rotate-0"}`}
                />
              )}
            </Link>

            <AnimatePresence>
              {hasSubItems && hoveredItem === item.url && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-0 w-56 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden"
                >
                  <ul className="flex flex-col py-2">
                    {item.subItems &&
                      item.subItems.map((sub) => (
                        <li key={sub.url}>
                          <Link
                            href={sub.url}
                            target={sub.isExternal ? "_blank" : "_self"}
                            className="block px-4 py-3 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
};
