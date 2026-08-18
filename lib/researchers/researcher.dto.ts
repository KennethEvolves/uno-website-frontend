import { TextItemDTO } from "../programs/program.dto";
import { StrapiImageDTO } from "../shared/dto";

export interface LinkDTO {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
}

export interface PaperDTO {
  id: number;
  type: string;
  title: string;
  description: string;
  link: LinkDTO;
}

export interface ResearcherDTO {
  id: number;
  documentId: string;
  slug: string;
  profession: string;
  fullName: string;
  semblance: string;
  ctaLabel: string;
  email: string;
  orcid: string;
  scholar: string;
  photo: StrapiImageDTO;
  researchLines: TextItemDTO[];
  papers: PaperDTO[];
}
