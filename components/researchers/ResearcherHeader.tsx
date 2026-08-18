"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@primer/octicons-react";
import { ResearcherModel } from "@/lib/researchers/researcher.model";

interface Props {
  data: ResearcherModel;
}

export const ResearcherHeader = ({ data }: Props) => {
  const {
    profession,
    fullName,
    semblance,
    photo,
    researchLines,
    orcid,
    scholar,
  } = data;

  const { url: src, alternativeText: alt } = photo || {
    url: "",
    alternativeText: "",
  };

  return (
    <header className="relative overflow-hidden border-b border-gray-100 bg-white py-16 shadow-sm lg:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10 flex items-center gap-2">
          <Link
            href="/universidad/investigacion/"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-uno-secondary"
          >
            <ArrowLeftIcon size={16} />
            Volver a Investigación
          </Link>
        </div>

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col">
            <span className="mb-4 text-sm font-bold tracking-widest text-uno-secondary uppercase">
              {profession}
            </span>

            <h1 className="mb-6 text-4xl font-extrabold tracking-tighter text-gray-900 md:text-5xl lg:text-6xl">
              {fullName}
            </h1>

            <p className="mb-10 max-w-xl text-base leading-relaxed text-gray-600 lg:text-lg">
              {semblance}
            </p>

            {researchLines && researchLines.length > 0 && (
              <div className="mb-12">
                <h3 className="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Líneas de Investigación
                </h3>
                <div className="flex flex-wrap gap-2">
                  {researchLines.map((line, idx) => (
                    <span
                      key={idx}
                      className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-xs font-medium text-gray-700 transition-colors hover:border-uno-secondary/30 hover:bg-uno-secondary/5 lg:text-sm"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-4">
              {orcid && (
                <Link
                  href={orcid}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition-all hover:border-[#A6CE39] hover:text-[#A6CE39]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-4.484 17.653H4.76V7.217h2.756v10.436zM6.138 6.075c-.881 0-1.597-.714-1.597-1.594s.716-1.594 1.597-1.594 1.597.714 1.597 1.594-.716 1.594-1.597 1.594zm13.111 11.578h-2.755v-5.26c0-1.254-.025-2.868-1.748-2.868-1.749 0-2.016 1.366-2.016 2.776v5.352H9.975V7.217h2.645v1.425h.038c.368-.696 1.266-1.428 2.602-1.428 2.784 0 3.297 1.832 3.297 4.215v6.224z" />
                  </svg>
                  ORCID
                </Link>
              )}

              {scholar && (
                <Link
                  href={scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border-2 border-gray-200 bg-white px-6 py-3 text-sm font-bold text-gray-700 transition-all hover:border-[#4285F4] hover:text-[#4285F4]"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 24a12 12 0 1 0 0-24 12 12 0 0 0 0 24zm4.184-15.548c-1.393-.578-2.222-1.272-2.222-2.18 0-1.045.908-1.666 2.018-1.666 1.205 0 2.213.621 2.213 1.666h2.15c0-2.138-1.89-3.642-4.363-3.642-2.483 0-4.148 1.488-4.148 3.513 0 1.942 1.503 3.013 3.515 3.738 1.487.535 2.158 1.155 2.158 1.964 0 .973-.878 1.705-2.223 1.705-1.464 0-2.493-.815-2.493-1.92h-2.15c0 2.18 1.847 3.868 4.643 3.868 2.743 0 4.383-1.468 4.383-3.57 0-1.96-1.423-3.003-3.48-3.832z" />
                  </svg>
                  Google Scholar
                </Link>
              )}
            </div>
          </div>

          {src && (
            <div className="relative mx-auto aspect-4/5 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 bg-linear-to-tr from-[#1e1e1e] via-[#3a1114] to-[#1e1e1e] shadow-2xl lg:mx-0">
              <Image
                src={src}
                alt={alt || fullName}
                fill
                priority
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
