import qs from "qs";
import { query_image } from "../shared/query";

export const getResearcherBySlugQuery = (slug: string) => {
  return qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        photo: query_image,
        researchLines: {
          populate: "*",
        },
        papers: {
          populate: {
            link: {
              populate: "*",
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
