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
