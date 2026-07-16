import { Cell } from "./cell";
import { Tetromino } from "./tetromino/tetromino";

export class Board {
  private element = document.createElement("div");
  private currentTetromino = Tetromino.create();
  private gameLoop?: number;

  constructor() {
    this.render();
    this.bindEvents();
    this.run();
  }

  private createBoard = () => {
    this.element.className = "board";
  };

  private bindEvents = () => {
    document.addEventListener("keydown", (event) => this.onKeyDown(event));
  };

  private renderCells = () => {
    this.element.innerHTML = "";

    for (let t of this.currentTetromino.create()) {
      this.element.appendChild(t.getCell());
    }
  };

  private render = () => {
    this.createBoard();
    this.renderCells();
    document.body.appendChild(this.element);
  };

  private onKeyDown = (event: KeyboardEvent) => {
    switch (event.code) {
      case "ArrowUp":
        event.preventDefault();

        this.currentTetromino.rotate();
        this.renderCells();
        break;
      case "ArrowLeft":
        event.preventDefault();

        this.currentTetromino.move("left");
        this.renderCells();
        break;
      case "ArrowRight":
        event.preventDefault();

        this.currentTetromino.move("right");
        this.renderCells();
        break;
      case "ArrowDown":
        event.preventDefault();

        this.currentTetromino.move("down");
        this.renderCells();
    }
  };

  private run = () => {
    this.gameLoop = window.setInterval(() => {
      this.currentTetromino.move("down");
      this.renderCells();
    }, 1000);
  };
}
