//       ▓▓
// ▓▓ ▓▓ ▓▓

import { Cell } from "../cell";

export class OrangeRick {
  public static create = () => {
    const cells: Cell[] = [];

    const locations = [
      { x: 2, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ];

    locations.map((l) => cells.push(new Cell(l.x, l.y)));

    return cells;
  };
}
