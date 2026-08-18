import { CardModel, ImageModel, StrapiImageDTO } from "../shared";
import { AcademicProgramDTO, HomeDTO, ProgramsSectionDTO } from "./home.dto";
import { HomeModel, ProgramSectionModel } from "./home.model";

const adaptImage = (imageDto: StrapiImageDTO): ImageModel => {
  if (!imageDto) {
    return { url: "", alternativeText: "", width: 0, height: 0 };
  }

  return {
    url: imageDto.url,
    alternativeText: imageDto.alternativeText || "",
    width: imageDto.width || 0,
    height: imageDto.height || 0,
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
    title: sectionDto.title,
    programCards: sectionDto.academic_programs.map(adaptProgramCard),
  };
};

export const adaptHome = (dto: HomeDTO): HomeModel => {
  const programSections = dto.sections.filter(
    (section) => section.__component === "home.programs",
  );

  return {
    sections: programSections.map(adaptProgramSection),
  };
};
