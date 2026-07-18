import { Cell } from "../cell";
import { ILocation } from "./ILocations";

export interface ITetromino {
  create(): Cell[];
  rotate(occupiedLocations: ILocation[]): void;
  move(direction: "left" | "right" | "down"): void;
  getNextLocations(direction: "left" | "right" | "down"): ILocation[];
}
