import { DynamicCard } from "../ui/DynamicCard";
import type { CardModel } from "@/lib/shared/model";

interface Props {
  cards: CardModel[];
}

export const CardsGrid = ({ cards }: Props) => {
  if (!cards || cards.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid w-full grid-cols-1 gap-x-6 gap-y-16 lg:grid-cols-2 xl:grid-cols-3">
        {cards.map((card, idx) => (
          <DynamicCard
            key={idx}
            title={card.title}
            description={card.description}
            href={card.href}
            ctaLabel={card.ctaLabel || "Ver más"}
            cover={card.cover}
          />
        ))}
      </div>
    </div>
  );
};
