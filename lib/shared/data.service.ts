import qs from "qs";
import type { GenericPageModel, SeoModel } from "./model";
import { getStrapiData } from "./strapi.api";
import { adaptGenericPage, seoAdapter } from "./data.adapter";
import { getDataBySlug, getGenericPageQuery } from "./query";

interface Params {
  slug?: string;
  endpoint: string;
  query: object;
}

export const getSeo = async (params: Params): Promise<SeoModel> => {
  try {
    const { slug, endpoint, query: q } = params;

    if (slug) {
      const query = getDataBySlug(slug, q);
      const response = await getStrapiData(`/api/${endpoint}?${query}`);

      const pageData = response?.data?.[0];
      return seoAdapter(pageData?.seo);
    }

    const query = qs.stringify(q);
    const response = await getStrapiData(`/api/${endpoint}?${query}`);

    const pageData = response?.data;
    return seoAdapter(pageData?.seo);
  } catch (error) {
    console.error(
      `[SEO Service] Error obteniendo SEO para ${params.endpoint}:`,
      error,
    );
    return seoAdapter(undefined);
  }
};

export const getGenericPage = async (
  endpoint: string,
): Promise<GenericPageModel> => {
  try {
    const query = getGenericPageQuery();

    const response = await getStrapiData(`/api/${endpoint}?${query}`);
    const dto = response?.data;

    if (!dto) {
      console.warn(
        `[Generic Page Service] No se encontraron datos para el endpoint: ${endpoint}`,
      );
      return adaptGenericPage(undefined);
    }

    return adaptGenericPage(dto);
  } catch (error) {
    console.error(
      `[Generic Page Service] Error crítico al obtener la página ${endpoint}:`,
      error,
    );
    return adaptGenericPage(undefined);
  }
};
