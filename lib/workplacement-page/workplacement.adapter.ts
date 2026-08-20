import { adaptPageHeader } from "../academic/academics.adapter";
import { adaptImage } from "../shared/data.adapter";
import {
  DocumentationDTO,
  DocumentItemDTO,
  TutorialDTO,
  WorkPlacementPageDTO,
} from "./workplacement.dto";
import {
  DocumentationModel,
  DocumentItemModel,
  TutorialModel,
  WorkPlacementPageModel,
} from "./workplacement.model";

const adaptDocumentItem = (dto: DocumentItemDTO): DocumentItemModel => ({
  name: dto?.name || "",
  file: adaptImage(dto?.file),
  url: dto?.url || "",
});

const adaptDocumentation = (dto?: DocumentationDTO): DocumentationModel => ({
  title: dto?.title || "",
  filesList: dto?.filesList?.map(adaptDocumentItem) || [],
});

const adaptTutorial = (dto?: TutorialDTO): TutorialModel => ({
  title: dto?.title || "",
  description: dto?.description || "",
  videoTutorial: adaptImage(dto?.videoTutorial),
});

export const adaptWorkPlacementPage = (
  dto?: WorkPlacementPageDTO,
): WorkPlacementPageModel => {
  if (!dto) {
    return {
      header: {
        subtitle: "",
        title: "",
        description: "",
        backgroundImage: adaptImage(undefined),
      },
      content: "",
      documentation: {
        title: "",
        filesList: [],
      },
      videoTutorial: {
        title: "",
        description: "",
        videoTutorial: adaptImage(undefined),
      },
      contact: "",
    };
  }

  return {
    header: adaptPageHeader(dto.header),
    content: dto.content || "",
    documentation: adaptDocumentation(dto.documentation),
    videoTutorial: adaptTutorial(dto.videoTutorial),
    contact: dto.contact || "",
  };
};
