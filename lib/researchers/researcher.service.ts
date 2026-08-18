import { getStrapiData } from "../shared";
import { getResearcherBySlugQuery } from "./researcher.query";
import { adaptResearcher } from "./researcher.adapter";
import type { ResearcherModel } from "./researcher.model";

export const getResearcherBySlug = async (
  slug: string,
): Promise<ResearcherModel | null> => {
  try {
    const query = getResearcherBySlugQuery(slug);

    const response = await getStrapiData(`/api/researchers?${query}`);

    const dto = response?.data?.[0];

    if (!dto) {
      console.warn(
        `[Researcher Service] Investigador no encontrado para el slug: ${slug}`,
      );
      return null;
    }

    return adaptResearcher(dto);
  } catch (error) {
    console.error(
      `[Researcher Service] Error al obtener el investigador ${slug}:`,
      error,
    );
    return null;
  }
};
