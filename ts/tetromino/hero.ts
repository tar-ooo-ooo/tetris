// ▓▓ ▓▓ ▓▓ ▓▓

import { ILocation } from "../interface/ILocations";
import { BaseTetromino } from "./baseTetromino";

export class Hero extends BaseTetromino {
  protected readonly rotations: ILocation[][] = [
    // 0°
    [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 4, y: 1 },
    ],

    // 90°
    [
      { x: 3, y: 0 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 3, y: 3 },
    ],

    // 180°
    [
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
    ],

    // 270°
    [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
    ],
  ];
}
