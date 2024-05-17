import Card, { CardProps } from "@/components/Card";

export const renderCard = (card: CardProps) => (
  <Card
    key={card.id}
    {...card}
    date={card.updated_at}
    title={card.title?.trim() ? card.title : card.bodyText?.slice(0, 20)}
  />
);
