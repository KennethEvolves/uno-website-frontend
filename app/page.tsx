import type { Metadata } from "next";
import { getHome } from "@/lib/home";
import { ProgramSection } from "@/components/home/ProgramSection";
import { endpoints, getSeo, query_seo } from "@/lib/shared";
import {
  BannerModel,
  HomeHeaderModel,
  ProgramSectionModel,
} from "@/lib/home/home.model";
import { HomeHeader } from "@/components/home/HomeHeader";
import { Banner } from "@/components/ui/BannerMiddle";
import { getLatestNews } from "@/lib/posts/post.service";
import { HomeLatestNewsSection } from "@/components/home/HomeLastestNewsSection";

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
  const [homeData, latestNews] = await Promise.all([
    getHome(),
    getLatestNews(5),
  ]);

  const { sections } = homeData;

  const homeHeader = sections.find((s) => s.type === "home-header") as
    | HomeHeaderModel
    | undefined;

  const allBanners = sections.filter(
    (s) => s.type === "banner",
  ) as BannerModel[];

  const ugSection = sections.find(
    (s) => s.type === "programs" && s.title === "Licenciaturas",
  ) as ProgramSectionModel | undefined;
  const pgSection = sections.find(
    (s) => s.type === "programs" && s.title === "Posgrados",
  ) as ProgramSectionModel | undefined;

  return (
    <main className="flex flex-col w-full bg-white mt-20">
      {homeHeader && <HomeHeader data={homeHeader} />}

      {latestNews && latestNews.length > 0 && (
        <div className="mb-20">
          <HomeLatestNewsSection data={latestNews} />
        </div>
      )}

      {allBanners[0] && <Banner data={allBanners[0]} />}

      {ugSection && (
        <ProgramSection data={ugSection} basePath="oferta-educativa" />
      )}

      {allBanners[1] && <Banner data={allBanners[1]} />}

      {pgSection && (
        <ProgramSection data={pgSection} basePath="oferta-educativa" />
      )}
    </main>
  );
};

export default HomePage;
