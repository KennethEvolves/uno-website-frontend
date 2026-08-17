import { endpoints, getStrapiData } from "@/lib/shared";
import { NavbarModel } from "./navbar.model";
import { getNavbarQuery } from "./navbar.query";
import { adaptNavbar } from "./navbar.adapter";

export const getNavbar = async (): Promise<NavbarModel | null> => {
  const query = getNavbarQuery();

  const endpoint = endpoints.navbar;

  const response = await getStrapiData(`/api/${endpoint}?${query}`);

  const dto = response?.data;

  if (!dto) {
    console.warn(
      `[Navbar Service] Datos no encontrados o no publicados en Strapi.`,
    );
    return null;
  }
  const navbar = adaptNavbar(dto);

  return navbar;
};
