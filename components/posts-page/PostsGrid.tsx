"use client";

import { fetchMorePosts } from "@/lib/posts/post.action";
import { PaginatedPostsModel, PostModel } from "@/lib/posts/post.model";
import { useState } from "react";
import { DynamicCard } from "../ui/DynamicCard";

interface Props {
  initialData: PaginatedPostsModel;
}

export const PostsGrid = ({ initialData }: Props) => {
  const [posts, setPosts] = useState<PostModel[]>(initialData.data);
  const [page, setPage] = useState(initialData.meta.page);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = initialData.meta.pageCount;

  const handleLoadMore = async () => {
    if (page >= totalPages) return;

    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const result = await fetchMorePosts(nextPage, 6);

      if (result && result.data.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...result.data]);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Error al cargar más novedades:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!posts || posts.length === 0) {
    return (
      <div className="flex w-full items-center justify-center py-20 text-gray-500">
        No hay novedades publicadas por el momento.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <DynamicCard
            key={post.slug}
            title={post.title}
            description={post.excerpt}
            href={`/noticias/${post.slug}`}
            ctaLabel={post.ctaLabel || "Leer más"}
            cover={post.coverImage}
            subtitle={post.publishDate}
            badge={post.type}
          />
        ))}
      </div>

      {page < totalPages && (
        <button
          onClick={handleLoadMore}
          disabled={isLoading}
          className="group mt-20 flex items-center gap-4 text-sm font-bold tracking-wider cursor-pointer text-black uppercase transition-opacity duration-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-black transition-all duration-300 group-hover:scale-110 group-hover:bg-black group-hover:text-white">
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-y-1"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            )}
          </div>

          <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
            {isLoading ? "Cargando..." : "Cargar más novedades"}
          </span>
        </button>
      )}
    </div>
  );
};
