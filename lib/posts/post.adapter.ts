import { adaptImage } from "../shared/data.adapter";
import type {
  PostDTO,
  PostResponseDTO,
  StepDTO,
  CallDetailsDTO,
  EventDetailsDTO,
  NewsDetailsDTO,
} from "./post.dto";
import type {
  PostModel,
  PaginatedPostsModel,
  StepModel,
  CallDetailsModel,
  EventDetailsModel,
  NewsDetailsModel,
} from "./post.model";

const adaptStep = (dto: StepDTO): StepModel => ({
  title: dto?.title || "",
  description: dto?.description || "",
});

const adaptCallDetails = (
  dto?: CallDetailsDTO,
): CallDetailsModel | undefined => {
  if (!dto) return undefined;
  return {
    expirationDate: dto.expirationDate || "",
    attachedFile: adaptImage(dto.attachedFile),
    steps: dto.steps?.map(adaptStep) || [],
  };
};

const adaptEventDetails = (dto?: EventDetailsDTO): EventDetailsModel => ({
  startDate: dto?.startDate || "",
  endDate: dto?.endDate || "",
  location: dto?.location || "Por definir",
  isVirtual: dto?.isVirtual ?? false,
});

const adaptNewsDetails = (
  dto?: NewsDetailsDTO,
): NewsDetailsModel | undefined => {
  if (!dto) return undefined;
  return {
    gallery: dto.gallery?.map(adaptImage) || [],
  };
};

export const adaptPost = (dto: PostDTO): PostModel => ({
  title: dto?.title || "",
  slug: dto?.slug || "",
  type: dto?.type || "noticia",
  excerpt: dto?.excerpt || "",
  content: dto?.content || "",
  coverImage: adaptImage(dto?.coverImage),
  publishDate: dto?.publishDate || "",
  autor: dto?.autor || "",
  ctaLabel: dto?.ctaLabel || "Leer más",
  newsDetails: adaptNewsDetails(dto?.newsDetails),
  callsDetails: adaptCallDetails(dto?.callsDetails),
  eventsDetails: dto?.eventsDetails?.map(adaptEventDetails),
});

export const adaptPaginatedPosts = (
  response?: PostResponseDTO,
): PaginatedPostsModel => {
  if (!response?.data) {
    return { data: [], meta: { page: 1, pageCount: 0, total: 0 } };
  }

  return {
    data: response.data.map(adaptPost),
    meta: {
      page: response.meta?.pagination?.page || 1,
      pageCount: response.meta?.pagination?.pageCount || 0,
      total: response.meta?.pagination?.total || 0,
    },
  };
};
