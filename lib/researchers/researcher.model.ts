import { ImageModel } from "../shared/model";

export interface LinkModel {
  label: string;
  url: string;
  isExternal: boolean;
}

export interface PaperModel {
  type: string;
  title: string;
  description: string;
  link: LinkModel;
}

export interface ResearcherModel {
  slug: string;
  profession: string;
  fullName: string;
  semblance: string;
  ctaLabel: string;
  email: string;
  orcid: string;
  scholar: string;
  photo: ImageModel;
  researchLines: string[];
  papers: PaperModel[];
}
