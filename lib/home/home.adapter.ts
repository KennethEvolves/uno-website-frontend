import { CardModel } from "../shared";
import { adaptImage } from "../shared/data.adapter";
import type {
  AcademicProgramDTO,
  HomeDTO,
  ProgramsSectionDTO,
  HomeHeaderDTO,
  BannerDTO,
  LinkDTO,
} from "./home.dto";
import type {
  HomeModel,
  ProgramSectionModel,
  HomeHeaderModel,
  BannerModel,
  LinkModel,
  HomeSectionModel,
} from "./home.model";

const adaptLink = (dto?: LinkDTO): LinkModel | null => {
  if (!dto) return null;
  return {
    label: dto.label || "",
    url: dto.url || "",
    isExternal: dto.isExternal || false,
  };
};

const adaptProgramCard = (programDto: AcademicProgramDTO): CardModel => {
  return {
    href: programDto.slug,
    title: programDto.name,
    description: programDto.description,
    ctaLabel: programDto.ctaLabel,
    cover: adaptImage(programDto.imageCover),
  };
};

const adaptProgramSection = (
  sectionDto: ProgramsSectionDTO,
): ProgramSectionModel => {
  return {
    type: "programs",
    title: sectionDto.title || "",
    programCards: sectionDto.academic_programs?.map(adaptProgramCard) || [],
  };
};

const adaptHomeHeader = (sectionDto: HomeHeaderDTO): HomeHeaderModel => {
  return {
    type: "home-header",
    title: sectionDto.title || "",
    description: sectionDto.description || "",
    link: adaptLink(sectionDto.link),
    backgroundImage: adaptImage(sectionDto.backgroundImage),
  };
};

const adaptBanner = (sectionDto: BannerDTO): BannerModel => {
  return {
    type: "banner",
    title: sectionDto.title || "",
    description: sectionDto.description || "",
    link: adaptLink(sectionDto.link),
    backgroundImage: adaptImage(sectionDto.backgroundImage),
  };
};

export const adaptHome = (dto?: HomeDTO): HomeModel => {
  const adaptedSections: HomeSectionModel[] = [];

  if (!dto?.sections) {
    return { sections: [] };
  }

  dto.sections.forEach((section) => {
    switch (section.__component) {
      case "home.programs":
        adaptedSections.push(
          adaptProgramSection(section as ProgramsSectionDTO),
        );
        break;
      case "home.home-header":
        adaptedSections.push(adaptHomeHeader(section as HomeHeaderDTO));
        break;
      case "shared.banner":
        adaptedSections.push(adaptBanner(section as BannerDTO));
        break;
      default:
        console.warn(
          `[Home Adapter] Componente no reconocido o no mapeado: ${(section as any).__component}`,
        );
        break;
    }
  });

  return {
    sections: adaptedSections,
  };
};
