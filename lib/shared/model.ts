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

export interface CardModel {
  href: string;
  title: string;
  description: string;
  ctaLabel: string;
  cover: ImageModel;
}
