import { getStrapiData } from "../shared/strapi.api";
import { getAcademicsPageQuery } from "./academics.query";
import { adaptAcademicsPage } from "./academics.adapter";
import { AcademicsPageModel } from "./academics.model";
import { endpoints } from "../shared";

export const getAcademicsPage = async (): Promise<AcademicsPageModel> => {
  try {
    const query = getAcademicsPageQuery();
    const endpoint = endpoints.academics;
    const response = await getStrapiData(`/api/${endpoint}?${query}`);
    const dto = response?.data;

    if (!dto) {
      console.warn("[Academics Service] Datos no encontrados en Strapi.");
      return {
        header: {
          subtitle: "",
          title: "",
          description: "",
          backgroundImage: {
            url: "",
            alternativeText: "",
            width: 0,
            height: 0,
          },
        },
        sections: [],
      };
    }

    return adaptAcademicsPage(dto);
  } catch (error) {
    console.error("[Academics Service] Error crítico:", error);
    return {
      header: {
        subtitle: "",
        title: "",
        description: "",
        backgroundImage: { url: "", alternativeText: "", width: 0, height: 0 },
      },
      sections: [],
    };
  }
};
