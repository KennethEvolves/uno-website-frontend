import { PageHeaderDTO } from "../academic/academics.dto";
import { StrapiImageDTO } from "../shared/dto";

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

export interface SocialServicePageDTO {
  id: number;
  documentId: string;
  header: PageHeaderDTO;
  content: string;
  calendar: DocumentationDTO;
  formats: DocumentationDTO;
}
