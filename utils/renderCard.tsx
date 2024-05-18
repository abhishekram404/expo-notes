import Card from "@/components/Card";
import { Note } from "@/lib/types/Note.type";

export const renderCard = (card: Note) => (
  <Card
    key={card.id || card.local_id}
    {...card}
    date={card.updated_at || card.local_updated_at || ""}
    title={card.title?.trim() ? card.title : card.bodyText?.slice(0, 20)}
  />
);
