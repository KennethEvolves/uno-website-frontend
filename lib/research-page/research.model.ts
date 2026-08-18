import { ImageModel, PageHeaderModel } from "../shared/model";

export interface ResearcherCardModel {
  slug: string;
  fullName: string;
  semblance: string;
  ctaLabel: string;
  photo: ImageModel;
}

export interface ResearchSectionModel {
  title: string;
  researchers: ResearcherCardModel[];
}

export interface ResearchPageModel {
  header: PageHeaderModel;
  sections: ResearchSectionModel[];
}
