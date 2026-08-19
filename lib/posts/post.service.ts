import { endpoints, getStrapiData } from "../shared";
import { getPostsQuery } from "./post.query";
import { adaptPaginatedPosts } from "./post.adapter";
import type { PaginatedPostsModel } from "./post.model";

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
