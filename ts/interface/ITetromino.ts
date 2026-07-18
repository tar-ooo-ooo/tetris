import { Cell } from "../cell";

export interface ITetromino {
  create(): Cell[];
  rotate(): void;
  move(direction: "left" | "right" | "down" | "drop"): boolean;
}
