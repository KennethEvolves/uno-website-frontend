import qs from "qs";
import { query_image, query_page_header } from "../shared/query";

export const getSocialServicePageQuery = () => {
  return qs.stringify(
    {
      populate: {
        header: query_page_header || {
          populate: {
            backgroundImage: query_image,
          },
        },
        calendar: {
          populate: {
            filesList: {
              populate: {
                file: query_image,
              },
            },
          },
        },
        formats: {
          populate: {
            filesList: {
              populate: {
                file: query_image,
              },
            },
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
