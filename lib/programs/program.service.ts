import { getStrapiData } from "../shared/strapi.api";
import { getDataBySlug } from "../shared/query";
import { getProgramQuery } from "./program.query";
import { adaptAcademicProgram } from "./program.adapter";
import { AcademicProgramModel } from "./program.model";

export const getProgramBySlug = async (
  slug: string,
): Promise<AcademicProgramModel | null> => {
  try {
    const q = getProgramQuery();
    const query = getDataBySlug(slug, q);

    const response = await getStrapiData(`/api/academic-programs?${query}`);
    const dto = response?.data?.[0];

    if (!dto) {
      console.warn(
        `[Program Service] Programa no encontrado para el slug: ${slug}`,
      );
      return null;
    }

    return adaptAcademicProgram(dto);
  } catch (error) {
    console.error(
      `[Program Service] Error al obtener el programa ${slug}:`,
      error,
    );
    return null;
  }
};
