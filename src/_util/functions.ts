export function shuffle<T>(arr: T[]): T[] {
  const result = arr.slice(0);
  let currentIndex = result.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex]!,
      result[currentIndex]!,
    ];
  }

  return result;
}

export function dealHands(gameSize: number) {
  const deck = newShuffledDeck(gameSize);
  const handSize = gameSize === 5 ? 9 : 10; //we have 10 card hands in the 3 or 4 player games, 9 in the 5p game.
  //2-player games not currently handled!
  return Array.from({length: 5}, (v, i) => deck.slice(i * handSize, i * handSize + handSize))
}

function newShuffledDeck(gameSize: number) {
  const cards = [1, 2, 3, 4, 5, 6];
  switch (gameSize) {
    case 3:
      //in a 3 player game, we use 1-6, five times each
      return shuffle([...cards, ...cards, ...cards, ...cards, ...cards]);
    case 4:
      //in a 4 player game, we use 1-8, five times each
      cards.push(7);
      cards.push(8);
      return shuffle([...cards, ...cards, ...cards, ...cards, ...cards]);
    case 5:
      //in a 5 player game we use 1-9, five times each
      cards.push(7);
      cards.push(8);
      cards.push(9);
      return shuffle([...cards, ...cards, ...cards, ...cards, ...cards]);
    default:
      throw new Error("invalid game size when making a deck");
  }
}
