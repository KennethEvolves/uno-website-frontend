import type { Metadata } from "next";
import { getHome } from "@/lib/home";
import { ProgramSection } from "@/components/home/ProgramSection";
import { endpoints, getSeo, query_seo } from "@/lib/shared";

export async function generateMetadata(): Promise<Metadata> {
  const args = {
    endpoint: endpoints.home,
    query: query_seo,
  };

  const seo = await getSeo(args);

  return {
    title: seo.title,
    description: seo.description,
    openGraph: {
      images: seo.image.url ? [seo.image.url] : [],
    },
  };
}

const HomePage = async () => {
  const { sections } = await getHome();
  const ugSection = sections.find((s) => s.title === "Licenciaturas");
  const pgSection = sections.find((s) => s.title === "Posgrados");

  return (
    <>
      <div className="m-18"></div>

      {ugSection && (
        <ProgramSection data={ugSection} basePath="oferta-educativa" />
      )}

      {pgSection && (
        <ProgramSection data={pgSection} basePath="oferta-educativa" />
      )}
    </>
  );
};

export default HomePage;
