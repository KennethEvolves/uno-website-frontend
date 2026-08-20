import { PageHeaderDTO } from "../academic/academics.dto";

export interface StrapiImageDTO {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface StrapiLinkDTO {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
}

export interface StrapiSeoDTO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  shareImage: StrapiImageDTO;
}
export interface CardDTO {
  id: number;
  title: string;
  ctaLabel?: string;
  description?: string;
  backgroundImage?: StrapiImageDTO;
  url?: string;
}

export interface GenericPageDTO {
  id: number;
  documentId: string;
  header: PageHeaderDTO;
  cards: CardDTO[];
}
