import { StrapiImageDTO, StrapiSeoDTO } from "../shared";

export interface AcademicProgramDTO {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  ctaLabel: string;
  imageCover: StrapiImageDTO;
}

export interface ProgramsSectionDTO {
  id: number;
  title: string;
  __component: string;
  academic_programs: AcademicProgramDTO[];
}

export interface HomeDTO {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo: StrapiSeoDTO;
  sections: ProgramsSectionDTO[];
}
