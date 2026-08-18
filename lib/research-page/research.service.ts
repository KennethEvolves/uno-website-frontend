import { endpoints, getStrapiData } from "../shared";
import { getResearchPageQuery } from "./research.query";
import { adaptResearchPage } from "./research.adapter";
import type { ResearchPageModel } from "./research.model";

export const getResearchPage = async (): Promise<ResearchPageModel> => {
  try {
    const query = getResearchPageQuery();
    const endpoint = endpoints.research;

    const response = await getStrapiData(`/api/${endpoint}?${query}`);
    const dto = response?.data;

    if (!dto) {
      console.warn("[Research Service] No se encontraron datos en Strapi.");
      return adaptResearchPage(undefined);
    }

    return adaptResearchPage(dto);
  } catch (error) {
    console.error(
      "[Research Service] Error crítico al obtener la página de investigación:",
      error,
    );
    return adaptResearchPage(undefined);
  }
};
