"use client";
import Link from "next/link";
import { ArrowUpRightIcon } from "@primer/octicons-react";
import { PaperModel } from "@/lib/researchers/researcher.model";

interface Props {
  papers: PaperModel[];
}

export const ResearcherPapers = ({ papers }: Props) => {
  if (!papers || papers.length === 0) return null;

  return (
    <section className="container mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-12 flex items-center justify-between">
        <h2 className="text-2xl font-extrabold tracking-tight text-uno-secondary uppercase lg:text-3xl">
          Publicaciones Destacadas
        </h2>
        <span className="hidden rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-gray-600 sm:inline-flex">
          {papers.length}{" "}
          {papers.length === 1 ? "Publicación" : "Publicaciones"}
        </span>
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {papers.map((pub, index) => (
          <article
            key={index}
            className="group flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-8 transition-all cursor-pointer duration-500 hover:-translate-y-2 hover:border-uno-secondary/40 hover:shadow-2xl"
          >
            <div>
              <span className="mb-5 inline-block rounded-full bg-uno-secondary/5 px-3 py-1.5 text-[10px] font-bold tracking-widest text-uno-secondary uppercase">
                {pub.type}
              </span>

              <h3 className="mb-4 text-lg leading-snug font-bold text-gray-900 transition-colors duration-300 group-hover:text-uno-secondary lg:text-xl">
                {pub.title}
              </h3>

              <p className="mb-8 line-clamp-4 text-sm leading-relaxed text-gray-600">
                {pub.description}
              </p>
            </div>

            <div className="mt-auto border-t border-gray-100 pt-6">
              <Link
                href={pub.link.url}
                target={pub.link.isExternal ? "_blank" : "_self"}
                rel={pub.link.isExternal ? "noopener noreferrer" : ""}
                className="inline-flex items-center gap-3 text-xs font-bold tracking-wider text-black uppercase transition-colors group-hover:text-uno-secondary"
              >
                <span>{pub.link.label}</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition-all duration-300 group-hover:border-uno-secondary group-hover:bg-uno-secondary/10">
                  <ArrowUpRightIcon size={16} />
                </div>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
