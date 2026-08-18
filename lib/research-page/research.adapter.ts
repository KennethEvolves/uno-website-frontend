import { adaptPageHeader } from "../academic/academics.adapter";
import { adaptImage } from "../shared/data.adapter";

import type {
  ResearchPageDTO,
  ResearchSectionDTO,
  ResearcherCardDTO,
} from "./research.dto";
import type {
  ResearchPageModel,
  ResearchSectionModel,
  ResearcherCardModel,
} from "./research.model";

const adaptResearcherCard = (dto: ResearcherCardDTO): ResearcherCardModel => ({
  slug: dto?.slug || "",
  fullName: dto?.fullName || "",
  semblance: dto?.semblance || "",
  ctaLabel: dto?.ctaLabel || "",
  photo: adaptImage(dto?.photo),
});

const adaptResearchSection = (
  dto: ResearchSectionDTO,
): ResearchSectionModel => ({
  title: dto?.title || "",
  researchers: dto?.researchers?.map(adaptResearcherCard) || [],
});

export const adaptResearchPage = (dto?: ResearchPageDTO): ResearchPageModel => {
  if (!dto) {
    return {
      header: {
        subtitle: "",
        title: "",
        description: "",
        backgroundImage: adaptImage(undefined),
      },
      sections: [],
    };
  }

  const validSections =
    dto.sections?.filter((section) => section.researchers !== undefined) || [];

  return {
    header: adaptPageHeader(dto.header),
    sections: validSections.map(adaptResearchSection),
  };
};
