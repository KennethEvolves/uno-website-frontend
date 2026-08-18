import { notFound } from "next/navigation";
import { endpoints, getSeo, Props, query_seo } from "@/lib/shared";
import { getProgramBySlug } from "@/lib/programs/program.service";
import {
  GraduateProfile,
  Hero,
  ProgramObjective,
  WorkField,
} from "@/components/programs";
import { Metadata } from "next";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const args = {
    slug,
    endpoint: endpoints.programs,
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

const AcademicProgramPage = async ({ params }: Props) => {
  const { slug } = await params;

  const program = await getProgramBySlug(slug);
  if (!program) {
    notFound();
  }

  return (
    <main className="mt-20">
      <Hero
        name={program.name}
        description={program.description}
        level={program.level}
        details={program.details}
        programKey={program.programKey}
        imageHero={program.details.imageHero}
      />
      <ProgramObjective data={program.objective} />
      <GraduateProfile data={program.graduateProfile} />
      <WorkField data={program.workField} />
    </main>
  );
};

export default AcademicProgramPage;
