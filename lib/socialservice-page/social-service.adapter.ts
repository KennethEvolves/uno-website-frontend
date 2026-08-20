import { adaptPageHeader } from "../academic/academics.adapter";
import { adaptImage } from "../shared/data.adapter";

import type {
  SocialServicePageDTO,
  DocumentationDTO,
  DocumentItemDTO,
} from "./social-service.dto";
import type {
  SocialServicePageModel,
  DocumentationModel,
  DocumentItemModel,
} from "./social-service.model";

const adaptDocumentItem = (dto: DocumentItemDTO): DocumentItemModel => ({
  name: dto?.name || "",
  file: adaptImage(dto?.file),
  url: dto?.url || "",
});

const adaptDocumentation = (dto?: DocumentationDTO): DocumentationModel => ({
  title: dto?.title || "",
  filesList: dto?.filesList?.map(adaptDocumentItem) || [],
});

export const adaptSocialServicePage = (
  dto?: SocialServicePageDTO,
): SocialServicePageModel => {
  if (!dto) {
    return {
      header: {
        subtitle: "",
        title: "",
        description: "",
        backgroundImage: adaptImage(undefined),
      },
      content: "",
      calendar: {
        title: "",
        filesList: [],
      },
      formats: {
        title: "",
        filesList: [],
      },
    };
  }

  return {
    header: adaptPageHeader(dto.header),
    content: dto.content || "",
    calendar: adaptDocumentation(dto.calendar),
    formats: adaptDocumentation(dto.formats),
  };
};
