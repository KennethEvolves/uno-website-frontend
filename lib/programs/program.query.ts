import { query_image } from "../shared/query";

export const getProgramQuery = () => {
  return {
    populate: {
      imageCover: query_image,
      details: {
        populate: {
          modality: { populate: "*" },
          duration: { populate: "*" },
          cycle: { populate: "*" },
          location: { populate: "*" },
          imageHero: query_image,
        },
      },
      objective: {
        populate: {
          image: query_image,
        },
      },
      graduateProfile: {
        populate: {
          knowledge: { populate: "*" },
          skills: { populate: "*" },
          attitudes: { populate: "*" },
          image: query_image,
        },
      },
      workField: {
        populate: {
          employmentAreas: { populate: "*" },
          image: query_image,
        },
      },
    },
  };
};
