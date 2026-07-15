import { BlueRick } from "./blueRick";
import { ClevelandZ } from "./clevelandZ";
import { Hero } from "./hero";
import { OrangeRick } from "./orangeRick";
import { RhodeIslandZ } from "./rhodeIslandZ";
import { SmashBoy } from "./smashBoy";
import { Teewee } from "./teewee";

export class Tetromino {
  public static create = () => {
    const index: Number = Math.floor(Math.random() * 7);

    switch (index) {
      case 0:
        return new BlueRick();
      case 1:
        return new ClevelandZ();
      case 0:
        return new Hero();
      case 0:
        return new OrangeRick();
      case 0:
        return new RhodeIslandZ();
      case 0:
        return new SmashBoy();
      case 0:
        return new Teewee();
    }
  };
}
