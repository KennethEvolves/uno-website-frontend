import { query_image } from "@/lib/shared";
import qs from "qs";

export const getFooterQuery = () => {
  return qs.stringify(
    {
      populate: {
        logo: query_image,
        aniversaryLogo: query_image,
        socialMedia: {
          populate: "*",
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
};
