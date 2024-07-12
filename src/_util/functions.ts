export function shuffle<T>(arr : T[]) : T[] {
    const result = arr.slice(0);
    let currentIndex = result.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    const randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [result[currentIndex], result[randomIndex]] = [
        result[randomIndex]!, result[currentIndex]!];
  }

  return result;
}