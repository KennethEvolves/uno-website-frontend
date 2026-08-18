import { StrapiImageDTO, StrapiSeoDTO } from "./dto";
import { ImageModel, SeoModel } from "./model";

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
