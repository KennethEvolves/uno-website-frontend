import { adaptImage } from "../shared/data.adapter";
import { AcademicProgramDTO, TextItemDTO } from "./program.dto";
import { AcademicProgramModel } from "./program.model";

const adaptTextItems = (items: TextItemDTO[]): string[] => {
  if (!items) return [];
  return items.map((i) => i.item);
};

export const adaptAcademicProgram = (
  dto: AcademicProgramDTO,
): AcademicProgramModel => {
  return {
    slug: dto.slug,
    name: dto.name,
    description: dto.description,
    level: dto.type,
    programKey: dto.key?.toString() || "N/A",
    ctaLabel: dto.ctaLabel,
    imageCover: adaptImage(dto.imageCover),

    details: {
      modality: dto.details?.modality || { label: "", value: "", iconName: "" },
      duration: dto.details?.duration || { label: "", value: "", iconName: "" },
      cycle: dto.details?.cycle || { label: "", value: "", iconName: "" },
      location: dto.details?.location || { label: "", value: "", iconName: "" },
      imageHero: adaptImage(dto.details?.imageHero),
    },

    objective: {
      iconName: dto.objective?.iconName || "",
      title: dto.objective?.title || "",
      description: dto.objective?.description || "",
      image: adaptImage(dto.objective?.image),
    },

    graduateProfile: {
      title: dto.graduateProfile?.title || "",
      summary: dto.graduateProfile?.summary || "",
      knowledge: adaptTextItems(dto.graduateProfile?.knowledge),
      skills: adaptTextItems(dto.graduateProfile?.skills),
      attitudes: adaptTextItems(dto.graduateProfile?.attitudes),
      image: adaptImage(dto.graduateProfile?.image),
    },

    workField: {
      title: dto.workField?.title || "",
      summary: dto.workField?.summary || "",
      employmentAreas: adaptTextItems(dto.workField?.employmentAreas),
      image: adaptImage(dto.workField?.image),
    },
  };
};
