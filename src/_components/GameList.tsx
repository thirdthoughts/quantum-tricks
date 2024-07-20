"use server";

import { getMyActiveGames } from "~/server/db/queries";

export default async function GameList() {
  const games = await getMyActiveGames();
  return (
    <>
      {!!games?.length && games.map((g) => (
        <div key={g.id}>Game {g.id}</div>
      ))}
    </>
  );
}
