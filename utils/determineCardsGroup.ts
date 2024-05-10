export const determineCardsGroup = (
  cards: any[]
): { left: any[]; right: any[] } => {
  const cardsGroup = cards.reduce(
    (acc, card, index) => {
      if (index % 2 === 0) {
        acc.left.push(card);
      } else {
        acc.right.push(card);
      }
      return acc;
    },
    { left: [], right: [] }
  );

  return cardsGroup;
};
