import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeo, endpoints, query_seo } from "@/lib/shared";
import { getSocialServicePage } from "@/lib/socialservice-page/social-service.service";
import { PageHeader } from "@/components/ui/PageHeader";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { DocumentationSection } from "@/components/socialservice-page/DocumentationSection";

export async function generateMetadata(): Promise<Metadata> {
  const args = {
    endpoint: endpoints.socialservicepage,
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

const SocialServicePage = async () => {
  const data = await getSocialServicePage();

  if (!data) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full pb-20 bg-white">
      <PageHeader data={data.header} />

      <section className="container mx-auto max-w-5xl px-6 pt-16">
        <MarkdownRenderer content={data.content} />
        <DocumentationSection data={data.calendar} />
        <DocumentationSection data={data.formats} />
      </section>
    </main>
  );
};

export default SocialServicePage;
