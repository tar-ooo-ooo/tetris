// ▓▓ ▓▓
//    ▓▓ ▓▓

import { Cell } from "../cell";

export class ClevelandZ {
  public static create = () => {
    const cells: Cell[] = [];

    const locations = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];

    locations.map((l) => cells.push(new Cell(l.x, l.y)));

    return cells;
  };
}
