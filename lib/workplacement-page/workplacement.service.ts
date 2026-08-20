import { endpoints, getStrapiData } from "../shared";
import { adaptWorkPlacementPage } from "./workplacement.adapter";
import { WorkPlacementPageModel } from "./workplacement.model";
import { getWorkPlacementPageQuery } from "./workplacement.query";

export const getWorkPlacementPage =
  async (): Promise<WorkPlacementPageModel> => {
    try {
      const query = getWorkPlacementPageQuery();

      const endpoint = endpoints.workplacement;

      const response = await getStrapiData(`/api/${endpoint}?${query}`);
      const dto = response?.data;

      if (!dto) {
        console.warn(
          "[Work Placement Service] No se encontraron datos en Strapi.",
        );
        return adaptWorkPlacementPage(undefined);
      }

      return adaptWorkPlacementPage(dto);
    } catch (error) {
      console.error(
        "[Work Placement Service] Error crítico al obtener la página de prácticas profesionales:",
        error,
      );
      return adaptWorkPlacementPage(undefined);
    }
  };
