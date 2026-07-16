//    ▓▓ ▓▓
// ▓▓ ▓▓

import { Cell } from "../cell";

export class RhodeIslandZ {
  public static create = () => {
    const cells: HTMLDivElement[] = [];

    const locations = [
      { x: 1, y: 0 },
      { x: 2, y: 1 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ];

    for (let l of locations) {
      cells.push(new Cell(l.x, l.y).getCell());
    }

    return cells;
  };
}
