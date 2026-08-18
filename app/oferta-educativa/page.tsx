import type { Metadata } from "next";
import { getSeo, endpoints, query_seo } from "@/lib/shared";
import { ProgramSection } from "@/components/home/ProgramSection";
import { getAcademicsPage } from "@/lib/academic/academics.service";
import { PageHeader } from "@/components/ui/PageHeader";

export async function generateMetadata(): Promise<Metadata> {
  const args = {
    endpoint: endpoints.academics,
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

const AcademicsPage = async () => {
  const { header, sections } = await getAcademicsPage();

  const ugSection = sections.find((s) => s.title === "Licenciaturas");
  const pgSection = sections.find((s) => s.title === "Posgrados");

  return (
    <main className="flex flex-col w-full pb-20">
      <PageHeader data={header} />

      <div className="mt-8 md:mt-16">
        {ugSection && (
          <ProgramSection
            data={ugSection}
            basePath="oferta-academica/licenciaturas"
          />
        )}

        {pgSection && (
          <ProgramSection
            data={pgSection}
            basePath="oferta-academica/posgrados"
          />
        )}
      </div>
    </main>
  );
};

export default AcademicsPage;
