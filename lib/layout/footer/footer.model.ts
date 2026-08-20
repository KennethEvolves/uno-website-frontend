import { ImageModel } from "@/lib/shared";

export interface FooterLinkModel {
  label: string;
  url: string;
  isExternal: boolean;
}

export interface FooterModel {
  logo: ImageModel | null;
  mail: string;
  phone: string;
  location: string;
  copyright: string;
  aniversaryLogo: ImageModel | null;
  socialMedia: FooterLinkModel[];
}
