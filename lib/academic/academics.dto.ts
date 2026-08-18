import { StrapiImageDTO, StrapiSeoDTO } from "../shared/dto";
import { ProgramsSectionDTO } from "../home/home.dto";

export interface PageHeaderDTO {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: StrapiImageDTO;
}

export interface AcademicsPageDTO {
  id: number;
  documentId: string;
  seo: StrapiSeoDTO;
  header: PageHeaderDTO;
  sections: ProgramsSectionDTO[];
}
