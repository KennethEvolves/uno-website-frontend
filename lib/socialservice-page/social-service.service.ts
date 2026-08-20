import { endpoints, getStrapiData } from "../shared";
import { getSocialServicePageQuery } from "./social-service.query";
import { adaptSocialServicePage } from "./social-service.adapter";
import type { SocialServicePageModel } from "./social-service.model";

export const getSocialServicePage =
  async (): Promise<SocialServicePageModel> => {
    try {
      const query = getSocialServicePageQuery();
      const endpoint = endpoints.socialservicepage;

      const response = await getStrapiData(`/api/${endpoint}?${query}`);
      const dto = response?.data;

      if (!dto) {
        console.warn("[Social Service] No se encontraron datos en Strapi.");
        return adaptSocialServicePage(undefined);
      }

      return adaptSocialServicePage(dto);
    } catch (error) {
      console.error(
        "[Social Service] Error crítico al obtener la página de servicio social:",
        error,
      );
      return adaptSocialServicePage(undefined);
    }
  };
