import { StrapiImageDTO, StrapiLinkDTO } from "@/lib/shared";

export interface StrapiNavItemDTO {
  id: number;
  label: string;
  url: string;
  subItems?: StrapiLinkDTO[];
}

export interface NavbarDTO {
  id: number;
  documentId: string;
  mainMenu: StrapiNavItemDTO[];
  mainLogo: StrapiImageDTO;
  governmentLogo: StrapiImageDTO;
}
