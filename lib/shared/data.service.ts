import qs from "qs";
import type { SeoModel } from "./model";
import { getStrapiData } from "./strapi.api";
import { seoAdapter } from "./data.adapter";
import { getDataBySlug } from "./query";

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
