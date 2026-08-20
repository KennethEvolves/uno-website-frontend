import { adaptPageHeader } from "../academic/academics.adapter";
import { CardDTO, GenericPageDTO, StrapiImageDTO, StrapiSeoDTO } from "./dto";
import { CardModel, GenericPageModel, ImageModel, SeoModel } from "./model";

export const seoAdapter = (dto?: StrapiSeoDTO): SeoModel => {
  const { metaTitle, metaDescription, shareImage } = dto || {};

  return {
    title: metaTitle || "Universidad de Oriente",
    description: metaDescription || "",
    image: shareImage
      ? {
          url: shareImage.url,
          alternativeText: shareImage.alternativeText || "",
          width: shareImage.width || 0,
          height: shareImage.height || 0,
        }
      : { url: "", alternativeText: "", width: 0, height: 0 },
  };
};

export const adaptImage = (
  imageDto: StrapiImageDTO | undefined,
): ImageModel => {
  if (!imageDto) {
    return { url: "", alternativeText: "", width: 0, height: 0 };
  }

  return {
    url: imageDto.url,
    alternativeText: imageDto.alternativeText || "",
    width: imageDto.width || 0,
    height: imageDto.height || 0,
  };
};

const adaptCard = (dto?: CardDTO): CardModel => ({
  title: dto?.title || "",
  ctaLabel: dto?.ctaLabel || "",
  description: dto?.description || "",
  cover: adaptImage(dto?.backgroundImage),
  href: dto?.url || "",
});

export const adaptGenericPage = (dto?: GenericPageDTO): GenericPageModel => {
  if (!dto) {
    return {
      header: {
        subtitle: "",
        title: "",
        description: "",
        backgroundImage: adaptImage(undefined),
      },
      cards: [],
    };
  }

  return {
    header: adaptPageHeader(dto.header),
    cards: dto.cards?.map(adaptCard) || [],
  };
};
