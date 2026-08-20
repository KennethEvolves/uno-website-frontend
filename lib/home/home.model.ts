import { CardModel, ImageModel } from "../shared";

export interface LinkModel {
  label: string;
  url: string;
  isExternal: boolean;
}

export interface HomeHeaderModel {
  type: "home-header";
  title: string;
  description: string;
  link: LinkModel | null;
  backgroundImage: ImageModel | null;
}

export interface BannerModel {
  type: "banner";
  title: string;
  description: string;
  link: LinkModel | null;
  backgroundImage: ImageModel | null;
}

export interface ProgramSectionModel {
  type?: "programs";
  title: string;
  programCards: CardModel[];
}

export type HomeSectionModel =
  | ProgramSectionModel
  | HomeHeaderModel
  | BannerModel;

export interface HomeModel {
  sections: HomeSectionModel[];
}
