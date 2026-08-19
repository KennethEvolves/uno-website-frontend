import { endpoints, getStrapiData } from "../shared";
import { getPostsPageQuery } from "./posts-page.query";
import { adaptPostsPage } from "./posts-page.adapter";
import type { PostsPageModel } from "./posts-page.model";

export const getPostsPage = async (): Promise<PostsPageModel> => {
  try {
    const query = getPostsPageQuery();
    const endpoint = endpoints.postspage || "posts-page";

    const response = await getStrapiData(`/api/${endpoint}?${query}`);
    const dto = response?.data;

    if (!dto) {
      console.warn(
        "[Posts Page Service] No se encontraron datos para el cascarón de Novedades.",
      );
      return adaptPostsPage(undefined);
    }

    return adaptPostsPage(dto);
  } catch (error) {
    console.error(
      "[Posts Page Service] Error crítico al obtener el Single Type Posts Page:",
      error,
    );
    return adaptPostsPage(undefined);
  }
};
