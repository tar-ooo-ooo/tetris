import { Cell } from "./cell";
import { ITetromino } from "./interface/ITetromino";
import { Tetromino } from "./tetromino/tetromino";

export class Board {
  private element = document.createElement("div");
  private currentTetromino = Tetromino.create();
  private gameLoop?: number;
  private lockTimer?: number;
  private lockedCells: Cell[] = [];
  private interval: number = 1000;

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

    const cells: Cell[] = [
      ...this.currentTetromino.create(),
      ...this.lockedCells,
    ];

    for (const cell of cells) {
      this.element.appendChild(cell.getCell());
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
        this.resetLockTimer();
        this.renderCells();
        break;
      case "ArrowLeft":
        event.preventDefault();

        this.currentTetromino.move("left");
        this.resetLockTimer();
        this.renderCells();
        break;
      case "ArrowRight":
        event.preventDefault();

        this.currentTetromino.move("right");
        this.resetLockTimer();
        this.renderCells();
        break;
      case "ArrowDown":
        event.preventDefault();

        this.currentTetromino.move("down");
        this.resetLockTimer();
        this.renderCells();
        break;
      case "Space":
        event.preventDefault();

        this.currentTetromino.move("drop");
        this.lockCurrentCells();

        if (this.lockTimer) {
          clearTimeout(this.lockTimer);
          this.lockTimer = undefined;
        }

        this.generateTetromino();
        break;
    }
  };

  private run = () => {
    this.gameLoop = setInterval(() => {
      const moved = this.currentTetromino.move("down");
      if (!moved && !this.lockTimer) {
        this.startLockTimer();
      }
      this.renderCells();
    }, this.interval);
  };

  private lockCurrentCells = (): void => {
    this.lockedCells.push(...this.currentTetromino.create());
  };

  private startLockTimer = () => {
    if (this.lockTimer) return;

    this.lockTimer = setTimeout(() => {
      this.lockCurrentCells();
      this.currentTetromino = Tetromino.create();
      this.lockTimer = undefined;
      this.renderCells();
    }, this.interval);
  };

  private resetLockTimer = () => {
    if (!this.lockTimer) {
      return;
    }

    clearTimeout(this.lockTimer);

    this.lockTimer = setTimeout(() => {
      this.lockCurrentCells();
      this.currentTetromino = Tetromino.create();
      this.lockTimer = undefined;
      this.renderCells();
    }, this.interval);
  };

  private generateTetromino = () => {
    this.currentTetromino = Tetromino.create();
    this.renderCells();
  };
}
