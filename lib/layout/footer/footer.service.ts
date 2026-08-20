import { endpoints, getStrapiData } from "@/lib/shared";
import { adaptFooter } from "./footer.adapter";
import type { FooterModel } from "./footer.model";
import { getFooterQuery } from "./footer.query";

export const getFooter = async (): Promise<FooterModel | null> => {
  try {
    const query = getFooterQuery();

    const endpoint = endpoints.footer || "footer";

    const response = await getStrapiData(`/api/${endpoint}?${query}`);
    const dto = response?.data;

    if (!dto) {
      console.warn(
        `[Footer Service] Datos no encontrados o no publicados en Strapi.`,
      );
      return null;
    }

    return adaptFooter(dto);
  } catch (error) {
    console.error(
      `[Footer Service] Error crítico al obtener el Footer:`,
      error,
    );
    return null;
  }
};
