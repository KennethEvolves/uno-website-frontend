import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getResearcherBySlug } from "@/lib/researchers/researcher.service";
import { ResearcherPapers } from "@/components/researchers/ResearcherPapers";
import { ResearcherHeader } from "@/components/researchers/ResearcherHeader";
import { getSeo, Params, endpoints } from "@/lib/shared";
import { query_seo } from "../../../../lib/shared/query";

interface Props {
  params: Params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const args = {
    slug,
    endpoint: endpoints.researchers,
    query: query_seo,
  };
  const researcher = await getSeo(args);

  if (!researcher) {
    return { title: "Investigador no encontrado" };
  }

  return {
    title: `${researcher.title}`,
    description: researcher.description,
    openGraph: {
      images: researcher.image.url ? [researcher.image.url] : [],
    },
  };
}

export default async function ResearcherProfilePage({ params }: Props) {
  const { slug } = await params;

  const researcher = await getResearcherBySlug(slug);

  if (!researcher) {
    notFound();
  }

  return (
    <main className="mt-22">
      <ResearcherHeader data={researcher} />

      {researcher.papers && researcher.papers.length > 0 && (
        <div className="mt-16 md:mt-24">
          <ResearcherPapers papers={researcher.papers} />
        </div>
      )}
    </main>
  );
}
