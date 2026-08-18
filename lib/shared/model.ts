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

export interface SeoModel {
  title: string;
  description: string;
  image: ImageModel;
}

export interface PageHeaderModel {
  subtitle: string;
  title: string;
  description: string;
  backgroundImage: ImageModel;
}

export type Params = Promise<{ slug: string }>;

export interface Props {
  params: Params;
}

export interface LabelValueModel {
  label: string;
  value: string;
  iconName: string;
}
