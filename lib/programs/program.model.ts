import { ImageModel, LabelValueModel } from "../shared/model";

export interface DetailsModel {
  modality: LabelValueModel;
  duration: LabelValueModel;
  cycle: LabelValueModel;
  location: LabelValueModel;
  imageHero: ImageModel;
}

export interface ObjectiveModel {
  iconName: string;
  title: string;
  description: string;
  image: ImageModel;
}

export interface GraduateProfileModel {
  title: string;
  summary: string;
  knowledge: string[];
  skills: string[];
  attitudes: string[];
  image: ImageModel;
}

export interface WorkFieldModel {
  title: string;
  summary: string;
  employmentAreas: string[];
  image: ImageModel;
}

export interface AcademicProgramModel {
  slug: string;
  name: string;
  description: string;
  level: string;
  programKey: string;
  ctaLabel: string;
  imageCover: ImageModel;
  details: DetailsModel;
  objective: ObjectiveModel;
  graduateProfile: GraduateProfileModel;
  workField: WorkFieldModel;
}
