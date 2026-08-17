import { ImageModel, LinkModel } from "@/lib/shared";

export interface NavItemModel {
  label: string;
  url: string;
  subItems?: LinkModel[];
}

export interface NavbarModel {
  mainMenu: NavItemModel[];
  mainLogo: ImageModel;
  governmentLogo: ImageModel;
}
