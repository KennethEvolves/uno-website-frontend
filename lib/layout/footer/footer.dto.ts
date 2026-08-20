import { StrapiImageDTO } from "@/lib/shared";

export interface FooterLinkDTO {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
}

export interface FooterDTO {
  id: number;
  documentId: string;
  logo: StrapiImageDTO;
  mail: string;
  phone: string;
  location: string;
  copyright: string;
  aniversaryLogo: StrapiImageDTO;
  socialMedia: FooterLinkDTO[];
}
