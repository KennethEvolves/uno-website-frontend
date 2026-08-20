import { ImageModel, PageHeaderModel } from "../shared/model";

export interface DocumentItemModel {
  name: string;
  file: ImageModel;
  url: string;
}

export interface DocumentationModel {
  title: string;
  filesList: DocumentItemModel[];
}

export interface SocialServicePageModel {
  header: PageHeaderModel;
  content: string;
  calendar: DocumentationModel;
  formats: DocumentationModel;
}
