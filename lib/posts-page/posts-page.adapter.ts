import { adaptPageHeader } from "../academic/academics.adapter";
import { adaptImage } from "../shared/data.adapter";
import type { PostsPageDTO } from "./posts-page.dto";
import type { PostsPageModel } from "./posts-page.model";

export const adaptPostsPage = (dto?: PostsPageDTO): PostsPageModel => {
  if (!dto) {
    return {
      header: {
        subtitle: "",
        title: "",
        description: "",
        backgroundImage: adaptImage(undefined),
      },
    };
  }

  return {
    header: adaptPageHeader(dto.header),
  };
};
