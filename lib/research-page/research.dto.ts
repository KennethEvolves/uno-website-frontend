import { PageHeaderDTO } from "../academic/academics.dto";
import { StrapiImageDTO } from "../shared/dto";

export interface ResearcherCardDTO {
  id: number;
  slug: string;
  fullName: string;
  semblance: string;
  ctaLabel: string;
  photo: StrapiImageDTO;
}

export interface ResearchSectionDTO {
  id: number;
  __component: string;
  title: string;
  researchers: ResearcherCardDTO[];
}

export interface ResearchPageDTO {
  id: number;
  documentId: string;
  header: PageHeaderDTO;
  sections: ResearchSectionDTO[];
}
