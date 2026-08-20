import type { PageHeaderDTO } from "../academic/academics.dto";
import type { StrapiImageDTO } from "../shared/dto";

export interface DocumentItemDTO {
  id: number;
  name: string;
  file?: StrapiImageDTO;
  url?: string;
}

export interface DocumentationDTO {
  id: number;
  title: string;
  filesList: DocumentItemDTO[];
}

export interface TutorialDTO {
  id: number;
  title: string;
  description: string;
  videoTutorial?: StrapiImageDTO;
}

export interface WorkPlacementPageDTO {
  id: number;
  documentId: string;
  header: PageHeaderDTO;
  content: string;
  documentation: DocumentationDTO;
  videoTutorial: TutorialDTO;
  contact: string;
}
