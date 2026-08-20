import type { ImageModel, PageHeaderModel } from "../shared/model";

export interface DocumentItemModel {
  name: string;
  file: ImageModel;
  url: string;
}

export interface DocumentationModel {
  title: string;
  filesList: DocumentItemModel[];
}

export interface TutorialModel {
  title: string;
  description: string;
  videoTutorial: ImageModel;
}

export interface WorkPlacementPageModel {
  header: PageHeaderModel;
  content: string;
  documentation: DocumentationModel;
  videoTutorial: TutorialModel;
  contact: string;
}
