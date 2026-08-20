import { AcademicProgramDTO, ProgramsSectionDTO } from "../home/home.dto";
import { ProgramSectionModel } from "../home/home.model";
import { CardModel, PageHeaderModel } from "../shared";
import { adaptImage } from "../shared/data.adapter";
import { AcademicsPageDTO, PageHeaderDTO } from "./academics.dto";
import { AcademicsPageModel } from "./academics.model";

export const adaptPageHeader = (dto: PageHeaderDTO): PageHeaderModel => {
  return {
    subtitle: dto.subtitle,
    title: dto.title,
    description: dto.description,
    backgroundImage: adaptImage(dto.backgroundImage),
  };
};

export const adaptAcademicsPage = (
  dto: AcademicsPageDTO,
): AcademicsPageModel => {
  const programSections =
    dto.sections?.filter(
      (section) => section.__component === "home.programs",
    ) || [];

  return {
    header: adaptPageHeader(dto.header),
    sections: programSections.map(adaptProgramSection),
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

export const adaptProgramSection = (
  sectionDto: ProgramsSectionDTO,
): ProgramSectionModel => {
  return {
    title: sectionDto.title,
    programCards: sectionDto.academic_programs.map(adaptProgramCard),
  };
};
