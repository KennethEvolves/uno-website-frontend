import qs from "qs";

export const getAcademicsPageQuery = () => {
  return qs.stringify(
    {
      populate: {
        header: {
          populate: {
            backgroundImage: {
              fields: ["url", "alternativeText", "width", "height"],
            },
          },
        },
        sections: {
          on: {
            "home.programs": {
              populate: {
                academic_programs: {
                  fields: ["slug", "name", "description", "type", "ctaLabel"],
                  populate: {
                    imageCover: {
                      fields: ["url", "alternativeText"],
                    },
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
