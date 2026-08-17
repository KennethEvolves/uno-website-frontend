import { LinkModel, StrapiLinkDTO } from "@/lib/shared";
import { NavbarDTO, StrapiNavItemDTO } from "./navbar.dto";
import { NavbarModel, NavItemModel } from "./navbar.model";

export const adaptNavbar = (dto: NavbarDTO): NavbarModel => {
  const { mainMenu, governmentLogo, mainLogo } = dto;

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
    governmentLogo: {
      url: `${BASE_URL}${governmentLogo.url}`,
      alternativeText: governmentLogo.alternativeText,
      width: governmentLogo.width,
      height: governmentLogo.height,
    },
    mainLogo: {
      url: `${BASE_URL}${mainLogo.url}`,
      alternativeText: mainLogo.alternativeText,
      width: mainLogo.width,
      height: mainLogo.height,
    },
  };
};
