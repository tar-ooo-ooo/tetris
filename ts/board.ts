import { Cell } from "./cell";

export class Board {
  private element = document.createElement("div");

  constructor() {
    this.render();
  }

  private createBoard = () => {
    this.element.className = "board";
  };

  private appendCell = () => {
    this.fillBoard();
  };

  /**
   * 先填滿確定 UI
   */
  private fillBoard = () => {
    for (let x = 0; x < 10; x++) {
      for (let y = 0; y < 20; y++) {
        const cell = new Cell(x, y);
        this.element.appendChild(cell.getCell());
      }
    }
  };

  private render = () => {
    this.createBoard();
    this.appendCell();
    document.body.appendChild(this.element);
  };
}
