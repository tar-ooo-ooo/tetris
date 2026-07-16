//       ▓▓
// ▓▓ ▓▓ ▓▓

import { Cell } from "../cell";

export class OrangeRick {
  public static create = () => {
    const cells: HTMLDivElement[] = [];

    const locations = [
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];

    for (let l of locations) {
      cells.push(new Cell(l.x, l.y).getCell());
    }

    return cells;
  };
}
