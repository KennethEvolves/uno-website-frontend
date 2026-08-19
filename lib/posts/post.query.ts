import qs from "qs";
import { query_image } from "../shared/query";

export const getPostsQuery = (page: number = 1, pageSize: number = 6) => {
  const currentDate = new Date().toISOString();

  return qs.stringify(
    {
      sort: ["publishDate:desc"],
      pagination: {
        page,
        pageSize,
      },

      filters: {
        $or: [
          {
            type: {
              $ne: "convocatoria",
            },
          },
          {
            type: {
              $eq: "convocatoria",
            },
            callsDetails: {
              expirationDate: {
                $gte: currentDate,
              },
            },
          },
          {
            type: {
              $eq: "evento",
            },
            eventsDetails: {
              endDate: {
                $gte: currentDate,
              },
            },
          },
        ],
      },
      populate: {
        coverImage: query_image,
        newsDetails: {
          populate: {
            gallery: query_image,
          },
        },
        callsDetails: {
          populate: {
            attachedFile: query_image,
            steps: { populate: "*" },
          },
        },
        eventsDetails: {
          populate: "*",
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
