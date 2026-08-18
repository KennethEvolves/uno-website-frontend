import { TextItemDTO } from "../programs/program.dto";
import { adaptImage } from "../shared/data.adapter";
import type { LinkDTO, PaperDTO, ResearcherDTO } from "./researcher.dto";
import type {
  LinkModel,
  PaperModel,
  ResearcherModel,
} from "./researcher.model";

const adaptTextItems = (items?: TextItemDTO[]): string[] => {
  return items?.map((i) => i.item) || [];
};

const adaptLink = (dto?: LinkDTO): LinkModel => ({
  label: dto?.label || "Consultar documento",
  url: dto?.url || "#",
  isExternal: dto?.isExternal ?? true,
});

const adaptPaper = (dto: PaperDTO): PaperModel => ({
  type: dto?.type || "Artículo",
  title: dto?.title || "",
  description: dto?.description || "",
  link: adaptLink(dto?.link),
});

export const adaptResearcher = (dto?: ResearcherDTO): ResearcherModel => {
  if (!dto) {
    return {
      slug: "",
      profession: "",
      fullName: "",
      semblance: "",
      ctaLabel: "",
      email: "",
      orcid: "",
      scholar: "",
      photo: adaptImage(undefined),
      researchLines: [],
      papers: [],
    };
  }

  return {
    slug: dto.slug || "",
    profession: dto.profession || "",
    fullName: dto.fullName || "",
    semblance: dto.semblance || "",
    ctaLabel: dto.ctaLabel || "",
    email: dto.email || "",
    orcid: dto.orcid || "",
    scholar: dto.scholar || "",
    photo: adaptImage(dto.photo),
    researchLines: adaptTextItems(dto.researchLines),
    papers: dto.papers?.map(adaptPaper) || [],
  };
};
