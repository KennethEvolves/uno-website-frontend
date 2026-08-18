import qs from "qs";
import { query_image } from "../shared";

export const getHomePageQuery = () => {
  return qs.stringify(
    {
      populate: {
        seo: {
          populate: ["shareImage"],
        },
        sections: {
          on: {
            "home.programs": {
              fields: ["title"],
              populate: {
                academic_programs: {
                  fields: ["slug", "name", "description", "type", "ctaLabel"],
                  populate: {
                    imageCover: query_image,
                  },
                },
              },
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
};
