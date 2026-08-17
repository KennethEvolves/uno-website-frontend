import { query_image, query_link } from "@/lib/shared";
import qs from "qs";

export const getNavbarQuery = () => {
  return qs.stringify(
    {
      populate: {
        mainLogo: query_image,
        governmentLogo: query_image,
        mainMenu: {
          populate: {
            subItems: query_link,
          },
        },
      },
    },
    { encodeValuesOnly: true },
  );
};
