import { endpoints, getStrapiData } from "../shared";
import { adaptHome } from "./home.adapter";
import type { HomeModel } from "./home.model";
import { getHomePageQuery } from "./home.query";

export const getHome = async (): Promise<HomeModel> => {
  try {
    const query = getHomePageQuery();
    const endpoint = endpoints.home;
    const response = await getStrapiData(`/api/${endpoint}?${query}`);
    const dto = response?.data;

    if (!dto) {
      console.warn(
        `[Home Service] Datos no encontrados o no publicados en Strapi.`,
      );
      return { sections: [] };
    }

    const home = adaptHome(dto);
    return home;
  } catch (error) {
    console.error(`[Home Service] Error crítico al obtener el Home:`, error);
    return { sections: [] };
  }
};
