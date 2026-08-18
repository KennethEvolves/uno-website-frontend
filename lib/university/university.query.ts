import qs from "qs";
import { query_image } from "../shared/query";

export const getAboutUsQuery = () => {
  return qs.stringify(
    {
      populate: {
        header: {
          populate: {
            backgroundImage: query_image,
          },
        },

        missionVision: {
          populate: {
            imageMission: query_image,
            imageVision: query_image,
          },
        },

        values: {
          populate: {
            value: {
              populate: "*",
            },
            image: query_image,
          },
        },

        directory: {
          populate: {
            departments: {
              populate: {
                staff_members: {
                  populate: "*",
                },
              },
            },
            backgroundImage: query_image,
          },
        },

        rectors: {
          populate: {
            rectors: {
              populate: {
                photo: query_image,
              },
            },
          },
        },

        history: {
          populate: "*",
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
