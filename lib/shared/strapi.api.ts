export const getStrapiData = async (url: string) => {
  const BASE_URL =
    process.env.STRAPI_INTERNAL_URL || process.env.NEXT_PUBLIC_STRAPI_URL;

  try {
    const response = await fetch(`${BASE_URL}${url}`, {
      next: {
        revalidate: 3000,
      },
    });

    if (!response.ok) {
      console.warn(
        `[Strapi API] Endpoint falló: ${url} - Status: ${response.status}`,
      );
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`[Strapi Fetch Error] Falla de red en ${url}:`, error);
    return null;
  }
};
