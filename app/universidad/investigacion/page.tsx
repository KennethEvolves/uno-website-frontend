import type { Metadata } from "next";
import { getSeo, endpoints, query_seo } from "@/lib/shared";
import { PageHeader } from "@/components/ui/PageHeader";
import { getResearchPage } from "@/lib/research-page/research.service";
import { ResearcherSection } from "@/components/research-page/ResearcherSection";

export async function generateMetadata(): Promise<Metadata> {
  const args = {
    endpoint: endpoints.research,
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

const ResearchPage = async () => {
  const { header, sections } = await getResearchPage();

  return (
    <main className="flex flex-col w-full pb-20">
      <PageHeader data={header} />
      <ResearcherSection data={sections[0]} basePath="investigacion" />
    </main>
  );
};

export default ResearchPage;
