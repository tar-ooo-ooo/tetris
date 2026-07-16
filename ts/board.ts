import { Cell } from "./cell";
import { Tetromino } from "./tetromino/tetromino";

export class Board {
  private element = document.createElement("div");

  constructor() {
    this.render();
  }

  private createBoard = () => {
    this.element.className = "board";
  };

  private appendCell = () => {
    for (let t of Tetromino.create()!) {
      this.element.appendChild(t);
    }
  };

  private render = () => {
    this.createBoard();
    this.appendCell();
    document.body.appendChild(this.element);
  };
}
