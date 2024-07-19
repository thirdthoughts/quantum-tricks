import { type ResearchBoardType } from "./validation";

export const minPlayers = 3;
export const maxPlayers = 5;

export const flavors = [
  "Up",
  "Down",
  "Charm",
  "Strange",
  "Bottom",
  "Top",
] as const;

export const cardColors = ["Red", "Yellow", "Blue", "Green"] as const;

export function PlayerBoard(gameSize: number) {
  switch (gameSize) {
    case 2:
    case 3:
      return TwoOrThreePlayerBoard();
    case 4:
    case 5:
      return FourOrFivePlayerBoard();
    default:
      throw new Error("Invalid game size when creating player board");
  }
}

export function FourOrFivePlayerBoard() {
  return {
    red: "",
    blue: "",
    green: "",
    yellow: "",
    allowedBids: [1, 2, 3],
    currentBid: null,
  };
}

export function TwoOrThreePlayerBoard() {
  return {
    red: "",
    blue: "",
    green: "",
    yellow: "",
    allowedBids: [1, 3, 4],
    currentBid: null,
  };
}

export function ResearchBoard(playerCount: number): ResearchBoardType {
  switch (playerCount) {
    case 3:
      return {
        red: [1, 2, 3, 4, 5, 6],
        green: [1, 2, 3, 4, 5, 6],
        blue: [1, 2, 3, 4, 5, 6],
        yellow: [1, 2, 3, 4, 5, 6],
      };
    case 4:
      return {
        red: [1, 2, 3, 4, 5, 6, 7, 8],
        green: [1, 2, 3, 4, 5, 6, 7, 8],
        blue: [1, 2, 3, 4, 5, 6, 7, 8],
        yellow: [1, 2, 3, 4, 5, 6, 7, 8],
      };
    case 5:
      return {
        red: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        green: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        blue: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        yellow: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      };
    default:
      throw new Error("invalid game size generating research board");
  }
}
