import Image from "next/image";
import type { ImageModel } from "@/lib/shared/model";

interface Props {
  title: string;
  type: string;
  publishDate: string;
  autor?: string;
  coverImage?: ImageModel;
}

export const PostHeader = ({
  title,
  type,
  publishDate,
  autor,
  coverImage,
}: Props) => {
  const getBadgeStyles = (postType: string) => {
    switch (postType?.toLowerCase()) {
      case "convocatoria":
        return "bg-[#c4a366] text-white border-[#c4a366]/20";
      case "evento":
        return "bg-green-100 text-green-700 border-green-200";
      case "noticia":
        return "bg-[#94251e] text-white border-primary/20";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <header className="mb-10 w-full">
      <span
        className={`mb-6 inline-flex  border px-4 py-1.5 text-xs font-bold tracking-widest uppercase ${getBadgeStyles(
          type,
        )}`}
      >
        {type}
      </span>

      <h1 className="mb-6 text-2xl font-extrabold uppercase text-gray-900 md:text-3xl lg:text-4xl leading-tight">
        {title}
      </h1>

      <div className="mb-8 flex flex-col items-start gap-2 text-sm text-gray-500">
        <p>
          <strong className="font-semibold text-gray-700">Publicado:</strong>{" "}
          {publishDate}
        </p>
        {autor && (
          <p>
            <strong className="font-semibold text-gray-700">Autor:</strong>{" "}
            {autor}
          </p>
        )}
      </div>

      {coverImage?.url && (
        <div className="relative w-full overflow-hidden  bg-gray-100 shadow-sm aspect-video border border-gray-200">
          <Image
            src={coverImage.url}
            alt={coverImage.alternativeText || title}
            fill
            sizes="(max-width: 1024px) 100vw, 896px"
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
      )}
    </header>
  );
};
