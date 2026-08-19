import type { StrapiImageDTO } from "../shared/dto";

export interface StepDTO {
  id: number;
  title: string;
  description: string;
}

export interface CallDetailsDTO {
  id: number;
  expirationDate: string;
  attachedFile: StrapiImageDTO;
  steps: StepDTO[];
}

export interface EventDetailsDTO {
  id: number;
  startDate: string;
  endDate: string;
  location: string;
  isVirtual: boolean;
}

export interface NewsDetailsDTO {
  id: number;
  gallery: StrapiImageDTO[];
}

export interface PostDTO {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  type: string;
  excerpt: string;
  content: string;
  coverImage: StrapiImageDTO;
  publishDate: string;
  autor: string;
  ctaLabel: string;
  newsDetails: NewsDetailsDTO;
  callsDetails: CallDetailsDTO;
  eventsDetails: EventDetailsDTO[];
}

export interface PostResponseDTO {
  data: PostDTO[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
