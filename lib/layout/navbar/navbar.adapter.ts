import { LinkModel, StrapiLinkDTO } from "@/lib/shared";
import { NavbarDTO, StrapiNavItemDTO } from "./navbar.dto";
import { NavbarModel, NavItemModel } from "./navbar.model";
import { adaptImage } from "@/lib/shared/data.adapter";

export const adaptNavbar = (dto: NavbarDTO): NavbarModel => {
  const { mainMenu } = dto;

  const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

  const adaptSubItems = (items?: StrapiLinkDTO[]): LinkModel[] => {
    if (!Array.isArray(items)) return [];

    return items.map((it) => ({
      label: it?.label || "Enlace",
      url: it?.url || "#",
      isExternal: it?.isExternal || false,
    }));
  };

  const adaptMenu = (menuItems?: StrapiNavItemDTO[]): NavItemModel[] => {
    if (!Array.isArray(menuItems)) return [];

    return menuItems.map((item) => ({
      id: String(item?.id || Math.random()),
      label: item?.label || "Enlace",
      url: item?.url || "#",
      subItems: adaptSubItems(item?.subItems),
    }));
  };

  return {
    mainMenu: adaptMenu(mainMenu),
    governmentLogo: adaptImage(dto?.governmentLogo),
    mainLogo: adaptImage(dto?.mainLogo),
  };
};
