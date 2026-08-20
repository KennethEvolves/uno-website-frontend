import qs from "qs";

export const query_image = {
  fields: ["url", "alternativeText", "width", "height"],
};

export const query_link = {
  fields: ["label", "url", "isExternal"],
};

export const query_page_header = {
  populate: {
    backgroundImage: {
      fields: ["url", "alternativeText", "width", "height"],
    },
  },
};

export const query_seo = {
  populate: {
    seo: {
      fields: ["metaTitle", "metaDescription"],
      populate: {
        shareImage: query_image,
      },
    },
  },
};

export const getDataBySlug = (slug: string, query: object): string => {
  const data = qs.stringify(
    {
      ...query,
      filters: {
        slug: {
          $eq: slug,
        },
      },
    },
    { encodeValuesOnly: true },
  );

  return data;
};

export const getGenericPageQuery = () => {
  return qs.stringify(
    {
      populate: {
        header: query_page_header || {
          populate: {
            backgroundImage: query_image,
          },
        },
        cards: {
          populate: {
            backgroundImage: query_image,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
