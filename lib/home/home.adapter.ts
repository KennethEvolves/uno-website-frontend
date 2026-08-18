import { CardModel } from "../shared";
import { adaptImage } from "../shared/data.adapter";
import { AcademicProgramDTO, HomeDTO, ProgramsSectionDTO } from "./home.dto";
import { HomeModel, ProgramSectionModel } from "./home.model";

const adaptProgramCard = (programDto: AcademicProgramDTO): CardModel => {
  return {
    href: programDto.slug,
    title: programDto.name,
    description: programDto.description,
    ctaLabel: programDto.ctaLabel,
    cover: adaptImage(programDto.imageCover),
  };
};

export const adaptProgramSection = (
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
