//    ▓▓
// ▓▓ ▓▓ ▓▓

import { ILocation } from "../interface/ILocations";
import { BaseTetromino } from "./baseTetromino";

export class Teewee extends BaseTetromino {
  protected readonly rotations: ILocation[][] = [
    // 0°
    [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 2 },
    ],
    // 90°
    [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 2, y: 2 },
    ],
    // 180°
    [
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    // 270°
    [
      { x: 2, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
  ];
}
