import { endpoints, getStrapiData } from "../shared";
import type { AboutUsModel } from "./university.model";
import { aboutUsAdapter } from "./university.adapter";
import { getAboutUsQuery } from "./university.query";

export const getAboutUs = async (): Promise<AboutUsModel> => {
  try {
    const query = getAboutUsQuery();
    const endpoint = endpoints.about;

    const response = await getStrapiData(`/api/${endpoint}?${query}`);
    const dto = response?.data;

    if (!dto) {
      console.warn("[About Us Service] No se encontraron datos en Strapi.");
      return aboutUsAdapter(undefined);
    }

    return aboutUsAdapter(dto);
  } catch (error) {
    console.error(
      "[About Us Service] Error crítico al obtener la página:",
      error,
    );

    return aboutUsAdapter(undefined);
  }
};
