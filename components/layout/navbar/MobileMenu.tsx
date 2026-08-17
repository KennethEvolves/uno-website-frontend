"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ThreeBarsIcon, XIcon } from "@primer/octicons-react";
import { NavItemModel } from "@/lib/layout/navbar/navbar.model";

interface MobileMenuProps {
  mainMenu: NavItemModel[];
}

export const MobileMenu = ({ mainMenu }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const allItems = [...mainMenu];

  return (
    <div className="block lg:hidden">
      <button
        className="text-primary focus:outline-none p-2 cursor-pointer transition-transform duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Alternar Menú Móvil"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <XIcon size={28} className="text-black" />
          ) : (
            <ThreeBarsIcon size={28} className="text-black" />
          )}
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="absolute top-full left-0 z-40 bg-white w-full border-y border-gray-200 shadow-md overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 max-h-[75vh] overflow-y-auto gap-4">
              {allItems.map((item) => (
                <div key={item.url} className="flex flex-col">
                  <Link
                    href={item.url}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg py-2 transition-colors ${
                      pathname === item.url
                        ? "text-primary font-bold"
                        : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </Link>

                  {item.subItems && item.subItems.length > 0 && (
                    <ul className="flex flex-col pl-4 border-l-2 border-gray-100 gap-2 mt-1">
                      {item.subItems.map((sub) => (
                        <li key={sub.url}>
                          <Link
                            href={sub.url}
                            onClick={() => setIsOpen(false)}
                            target={sub.isExternal ? "_blank" : "_self"}
                            className="block py-2 text-sm text-gray-500 hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
