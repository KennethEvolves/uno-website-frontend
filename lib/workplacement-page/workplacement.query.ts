import qs from "qs";
import { query_image, query_page_header } from "../shared/query";

export const getWorkPlacementPageQuery = () => {
  return qs.stringify(
    {
      populate: {
        header: query_page_header || {
          populate: {
            backgroundImage: query_image,
          },
        },
        documentation: {
          populate: {
            filesList: {
              populate: {
                file: query_image,
              },
            },
          },
        },
        videoTutorial: {
          populate: {
            videoTutorial: query_image,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
