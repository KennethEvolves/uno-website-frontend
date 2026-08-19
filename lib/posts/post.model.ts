import type { ImageModel } from "../shared/model";

export interface StepModel {
  title: string;
  description: string;
}

export interface CallDetailsModel {
  expirationDate: string;
  attachedFile: ImageModel;
  steps: StepModel[];
}

export interface EventDetailsModel {
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
}

export interface NewsDetailsModel {
  gallery: ImageModel[];
}

export interface PostModel {
  title: string;
  slug: string;
  type: string;
  excerpt: string;
  content: string;
  coverImage: ImageModel;
  publishDate: string;
  autor: string;
  ctaLabel: string;
  newsDetails?: NewsDetailsModel;
  callsDetails?: CallDetailsModel;
  eventsDetails?: EventDetailsModel[];
}

export interface PaginatedPostsModel {
  data: PostModel[];
  meta: {
    page: number;
    pageCount: number;
    total: number;
  };
}
