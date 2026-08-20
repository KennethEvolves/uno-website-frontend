import { DocumentationModel } from "@/lib/socialservice-page/social-service.model";
import {
  LinkExternalIcon,
  DownloadIcon,
  FileIcon,
} from "@primer/octicons-react";

interface Props {
  data: DocumentationModel;
}

export const DocumentationSection = ({ data }: Props) => {
  if (!data?.filesList || data.filesList.length === 0) return null;

  return (
    <section className="my-12 w-full">
      <h3 className="mb-6 text-2xl font-bold tracking-tight text-secondary">
        {data.title}
      </h3>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.filesList.map((item, idx) => {
          const isExternal = !!item.url;
          const href = isExternal ? item.url : item.file?.url;

          if (!href) return null;
          const isPdf = href.toLowerCase().endsWith(".pdf");

          return (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              download={!isExternal && !isPdf ? true : undefined}
              className="group flex items-start gap-4 border border-gray-100 bg-white p-5 hover:shadow-md hover:shadow-secondary/5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-colors duration-300 group-hover:bg-secondary/10 group-hover:text-secondary">
                {isExternal ? (
                  <LinkExternalIcon size={20} />
                ) : isPdf ? (
                  <FileIcon size={20} className="text-red-700" />
                ) : (
                  <DownloadIcon size={20} className="text-green-800" />
                )}
              </div>

              <div className="flex flex-col justify-center pt-1">
                <span className="text-sm font-semibold leading-snug text-gray-700 transition-colors duration-300 group-hover:text-secondary">
                  {item.name}
                </span>
                <span className="mt-1 text-xs font-medium text-gray-400 transition-colors duration-300 group-hover:text-secondary/70">
                  {isExternal
                    ? "Enlace externo"
                    : isPdf
                      ? "Ver documento"
                      : "Descargar archivo"}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
