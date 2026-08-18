import qs from "qs";
import { query_image, query_page_header } from "../shared/query";

export const getResearchPageQuery = () => {
  return qs.stringify(
    {
      populate: {
        header: query_page_header || {
          populate: {
            backgroundImage: query_image,
          },
        },
        sections: {
          on: {
            "researcher.researchers": {
              populate: {
                researchers: {
                  fields: ["slug", "fullName", "semblance", "ctaLabel"],
                  populate: {
                    photo: query_image,
                  },
                },
              },
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
