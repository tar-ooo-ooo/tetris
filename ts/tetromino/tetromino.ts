import { Cell } from "../cell";
import { BlueRick } from "./blueRick";
import { ClevelandZ } from "./clevelandZ";
import { Hero } from "./hero";
import { OrangeRick } from "./orangeRick";
import { RhodeIslandZ } from "./rhodeIslandZ";
import { SmashBoy } from "./smashBoy";
import { Teewee } from "./teewee";

export class Tetromino {
  public static create = (): HTMLDivElement[] => {
    const index: Number = Math.floor(Math.random() * 7);

    switch (index) {
      case 0:
        return BlueRick.create();
      case 1:
        return ClevelandZ.create();
      case 2:
        return Hero.create();
      case 3:
        return OrangeRick.create();
      case 4:
        return RhodeIslandZ.create();
      case 5:
        return SmashBoy.create();
      case 6:
        return Teewee.create();
      default:
        throw new Error("Invalid tetromino index");
    }
  };
}
