import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSeo, endpoints, query_seo } from "@/lib/shared";
import { getGenericPage } from "@/lib/shared/data.service";
import { PageHeader } from "@/components/ui/PageHeader";
import { CardsGrid } from "@/components/ui/GenericCardsGrid";

export async function generateMetadata(): Promise<Metadata> {
  const args = {
    endpoint: endpoints.servicespage,
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

const ServicesPage = async () => {
  const data = await getGenericPage(endpoints.servicespage);

  if (!data) {
    notFound();
  }

  return (
    <main className="flex w-full flex-col bg-white pb-24">
      <PageHeader data={data.header} />
      <section className="container mx-auto max-w-8xl px-6 lg:px-8 mt-16 md:mt-24">
        <CardsGrid cards={data.cards} />
      </section>
    </main>
  );
};

export default ServicesPage;
