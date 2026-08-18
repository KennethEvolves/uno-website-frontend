import { StrapiImageDTO } from "../shared/dto";

export interface LabelValueDTO {
  id: number;
  label: string;
  value: string;
  iconName: string;
}

export interface TextItemDTO {
  id: number;
  item: string;
}

export interface ProgramDetailsDTO {
  id: number;
  modality: LabelValueDTO;
  duration: LabelValueDTO;
  cycle: LabelValueDTO;
  location: LabelValueDTO;
  imageHero: StrapiImageDTO;
}

export interface ProgramObjectiveDTO {
  id: number;
  iconName: string;
  title: string;
  description: string;
  image: StrapiImageDTO;
}

export interface GraduateProfileDTO {
  id: number;
  title: string;
  summary: string;
  knowledge: TextItemDTO[];
  skills: TextItemDTO[];
  attitudes: TextItemDTO[];
  image: StrapiImageDTO;
}

export interface WorkFieldDTO {
  id: number;
  title: string;
  summary: string;
  employmentAreas: TextItemDTO[];
  image: StrapiImageDTO;
}

export interface AcademicProgramDTO {
  id: number;
  documentId: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  key: number;
  ctaLabel: string;
  imageCover: StrapiImageDTO;
  details: ProgramDetailsDTO;
  objective: ProgramObjectiveDTO;
  graduateProfile: GraduateProfileDTO;
  workField: WorkFieldDTO;
}
