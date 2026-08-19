import qs from "qs";
import { query_image, query_page_header } from "../shared/query";

export const getPostsPageQuery = () => {
  return qs.stringify(
    {
      populate: {
        header: query_page_header || {
          populate: {
            backgroundImage: query_image,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
