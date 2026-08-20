import { adaptImage } from "@/lib/shared/data.adapter";
import type { FooterDTO, FooterLinkDTO } from "./footer.dto";
import type { FooterModel, FooterLinkModel } from "./footer.model";

const adaptFooterLink = (dto?: FooterLinkDTO): FooterLinkModel => {
  if (!dto) return { label: "", url: "", isExternal: false };

  return {
    label: dto.label || "",
    url: dto.url || "",
    isExternal: dto.isExternal || false,
  };
};

export const adaptFooter = (dto?: FooterDTO): FooterModel => {
  return {
    logo: adaptImage(dto?.logo),
    mail: dto?.mail || "",
    phone: dto?.phone || "",
    location: dto?.location || "",
    copyright: dto?.copyright || "",
    aniversaryLogo: adaptImage(dto?.aniversaryLogo),
    socialMedia: dto?.socialMedia?.map(adaptFooterLink) || [],
  };
};
