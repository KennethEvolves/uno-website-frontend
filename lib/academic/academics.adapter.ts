import { adaptProgramSection } from "../home/home.adapter";
import { PageHeaderModel } from "../shared";
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
