export interface ImageModel {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface LinkModel {
  label: string;
  url: string;
  isExternal: boolean;
}
