import { endpoints, getStrapiData } from "../shared";
import { getPostBySlugQuery, getPostsQuery } from "./post.query";
import { adaptPaginatedPosts, adaptPost } from "./post.adapter";
import type { PaginatedPostsModel, PostModel } from "./post.model";

export const getPosts = async (
  page: number = 1,
  pageSize: number = 9,
): Promise<PaginatedPostsModel> => {
  try {
    const query = getPostsQuery(page, pageSize);

    const endpoint = endpoints.posts || "posts";

    const response = await getStrapiData(`/api/${endpoint}?${query}`);

    if (!response) {
      console.warn(
        `[Post Service] No se recibieron datos para la página ${page}`,
      );
      return adaptPaginatedPosts(undefined);
    }

    return adaptPaginatedPosts(response);
  } catch (error) {
    console.error(`[Post Service] Error al obtener posts paginados:`, error);
    return adaptPaginatedPosts(undefined);
  }
};

export const getPostBySlug = async (
  slug: string,
): Promise<PostModel | undefined> => {
  try {
    const query = getPostBySlugQuery(slug);
    const endpoint = endpoints.posts || "posts";

    const response = await getStrapiData(`/api/${endpoint}?${query}`);

    if (!response?.data || response.data.length === 0) {
      return undefined;
    }

    return adaptPost(response.data[0]);
  } catch (error) {
    console.error(
      `[Post Service] Error al obtener la publicación con slug ${slug}:`,
      error,
    );
    return undefined;
  }
};
