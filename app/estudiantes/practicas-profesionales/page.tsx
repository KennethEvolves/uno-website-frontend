import type { Metadata } from "next";
import { getSeo, endpoints, query_seo } from "@/lib/shared";
import { notFound } from "next/navigation";
import { getWorkPlacementPage } from "@/lib/workplacement-page/workplacement.service";
import { PageHeader } from "@/components/ui/PageHeader";
import { TutorialSection } from "@/components/workplacement-page/TutorialSection";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { DocumentationSection } from "@/components/socialservice-page/DocumentationSection";

export async function generateMetadata(): Promise<Metadata> {
  const args = {
    endpoint: endpoints.workplacement,
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

const PostsPage = async () => {
  const data = await getWorkPlacementPage();

  if (!data) {
    notFound();
  }

  return (
    <main className="flex flex-col w-full pb-20 bg-white">
      <PageHeader data={data.header} />
      <div className="container mx-auto max-w-6xl px-6 pt-16">
        {data.content && (
          <div className="mb-12">
            <MarkdownRenderer content={data.content} />
          </div>
        )}
        <DocumentationSection data={data.documentation} />
        <TutorialSection data={data.videoTutorial} />
        {data.contact && (
          <div className=" rounded- bg-gray-50 p-8 lg:p-12">
            <MarkdownRenderer content={data.contact} />
          </div>
        )}
      </div>
    </main>
  );
};

export default PostsPage;
