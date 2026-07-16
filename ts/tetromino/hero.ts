// ▓▓ ▓▓ ▓▓ ▓▓

import { Cell } from "../cell";

export class Hero {
  public static create = () => {
    const cells: HTMLDivElement[] = [];

    const locations = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];

    for (let l of locations) {
      cells.push(new Cell(l.x, l.y).getCell());
    }

    return cells;
  };
}
