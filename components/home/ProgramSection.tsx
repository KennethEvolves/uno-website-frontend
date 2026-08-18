import { Card } from "@/components/ui/Card";
import { ProgramSectionModel } from "../../lib/home/home.model";

interface Props {
  data: ProgramSectionModel;
  basePath: string;
}

export const ProgramSection = ({ data, basePath }: Props) => {
  const { title, programCards } = data;

  return (
    <section className="flex flex-col items-center">
      <h1 className="w-full py-16 text-center text-3xl font-extrabold tracking-tight text-uno-secondary uppercase">
        {title}
      </h1>

      <article className="grid w-full grid-cols-1 gap-x-6 gap-y-16 px-6 lg:grid-cols-2 xl:grid-cols-3 2xl:px-36">
        {programCards.map((card) => (
          <Card
            key={card.href}
            title={card.title}
            description={card.description}
            href={`${basePath}/${card.href}`}
            ctaLabel={card.ctaLabel}
            cover={card.cover}
          />
        ))}
      </article>
    </section>
  );
};
