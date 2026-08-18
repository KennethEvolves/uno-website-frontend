import type { Metadata } from "next";
import { getSeo, endpoints, query_seo } from "@/lib/shared";
import { getAboutUs } from "@/lib/university/university.service";
import { PageHeader } from "@/components/ui/PageHeader";
import {
  Directory,
  HistoricalRectors,
  History,
  InstitutionalValues,
  MissionVision,
} from "@/components/university";

export async function generateMetadata(): Promise<Metadata> {
  const args = {
    endpoint: endpoints.about,
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

const AboutUsPage = async () => {
  const { header, missionVision, values, directory, history, rectors } =
    await getAboutUs();

  return (
    <main className="flex flex-col w-full pb-20">
      <PageHeader data={header} />

      <div className="mt-4 flex flex-col gap-8 md:mt-10 md:gap-10">
        <MissionVision data={missionVision} />

        <InstitutionalValues data={values} />

        <Directory data={directory} />

        <History data={history} />

        <HistoricalRectors data={rectors} />
      </div>
    </main>
  );
};

export default AboutUsPage;
