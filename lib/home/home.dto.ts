import { StrapiImageDTO, StrapiSeoDTO } from "../shared";

export interface LinkDTO {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
}

export interface HomeHeaderDTO {
  id: number;
  __component: "home.home-header";
  title: string;
  description: string;
  link?: LinkDTO;
  backgroundImage?: StrapiImageDTO;
}

export interface BannerDTO {
  id: number;
  __component: "shared.banner";
  title: string;
  description: string;
  link?: LinkDTO;
  backgroundImage?: StrapiImageDTO;
}

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
  __component: "home.programs";
  title: string;
  academic_programs: AcademicProgramDTO[];
}

export interface HomeDTO {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  seo: StrapiSeoDTO;
  sections: (ProgramsSectionDTO | HomeHeaderDTO | BannerDTO)[];
}
