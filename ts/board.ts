import { Cell } from "./cell";
import { ILocation } from "./interface/ILocations";
import { Tetromino } from "./tetromino/tetromino";
import { canMove } from "./utils";

export class Board {
  private element = document.createElement("div");
  private currentTetromino = Tetromino.create();
  private gameLoop?: number;
  private lockTimer?: number;
  private lockedCells: Cell[] = [];
  private interval: number = 1000;

  private get occupiedLocations(): ILocation[] {
    const occupiedLocations: ILocation[] = [];

    for (let cell of this.lockedCells) {
      occupiedLocations.push(cell.getLocation());
    }

    return occupiedLocations;
  }

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

        this.rotateCurrentTetromino();
        this.resetLockTimer();
        this.renderCells();
        break;
      case "ArrowLeft":
        event.preventDefault();

        this.moveCurrentTetromino("left");
        this.resetLockTimer();
        this.renderCells();
        break;
      case "ArrowRight":
        event.preventDefault();

        this.moveCurrentTetromino("right");
        this.resetLockTimer();
        this.renderCells();
        break;
      case "ArrowDown":
        event.preventDefault();

        this.moveCurrentTetromino("down");
        this.resetLockTimer();
        this.renderCells();
        break;
      case "Space":
        this.dropCurrentTetromino();
        break;
    }
  };

  private run = () => {
    this.gameLoop = setInterval(() => {
      const moved = this.moveCurrentTetromino("down");
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

  private rotateCurrentTetromino = () => {
    this.currentTetromino.rotate(this.occupiedLocations);
  };

  private moveCurrentTetromino = (
    direction: "left" | "right" | "down",
  ): boolean => {
    const nextLocations = this.currentTetromino.getNextLocations(direction);

    console.log(nextLocations);
    console.log(this.occupiedLocations);

    if (!canMove(nextLocations, this.occupiedLocations)) {
      return false;
    }

    this.currentTetromino.move(direction);
    return true;
  };

  private dropCurrentTetromino = () => {
    while (this.moveCurrentTetromino("down")) {}

    if (this.lockTimer) {
      clearTimeout(this.lockTimer);
      this.lockTimer = undefined;
    }

    this.lockCurrentCells();
    this.generateTetromino();
  };
}
