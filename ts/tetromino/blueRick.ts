// ▓▓
// ▓▓ ▓▓ ▓▓

import { Cell } from "../cell";
import { ILocation } from "../interface/ILocations";
import { ITetromino } from "../interface/ITetromino";
import { getBoundary, isInsideBoard } from "../utils";

export class BlueRick implements ITetromino {
  private boundLocations: ILocation = {
    x: Math.floor(Math.random() * 2 + 2),
    y: 0,
  };

  private rotationIndex = 0;
  private readonly rotations: ILocation[][] = [
    // 0°
    [
      { x: 1, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
    ],
    // 90°
    [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ],
    // 180°
    [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 },
    ],
    // 270°
    [
      { x: 2, y: 0 },
      { x: 3, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
    ],
  ];

  private get minX(): number {
    return getBoundary(this.boundLocations, this.locations, "min", "x");
  }

  private get maxX(): number {
    return getBoundary(this.boundLocations, this.locations, "max", "x");
  }

  private get locations(): ILocation[] {
    return this.rotations[this.rotationIndex];
  }

  public create = (): Cell[] => {
    return this.createCells(this.locations);
  };

  public rotate = () => {
    const nextRotationIndex = (this.rotationIndex + 1) % 4;
    const nextRotation = this.rotations[nextRotationIndex];

    const nextMinX = getBoundary(this.boundLocations, nextRotation, "min", "x");
    const nextMaxX = getBoundary(this.boundLocations, nextRotation, "max", "x");

    if (nextMinX < 0) {
      const correctedBoundLocation = {
        x: this.boundLocations.x + Math.abs(nextMinX),
        y: this.boundLocations.y,
      };

      if (isInsideBoard(correctedBoundLocation, nextRotation)) {
        this.boundLocations = correctedBoundLocation;
        this.rotationIndex = nextRotationIndex;
      }
    }

    if (nextMaxX > 9) {
      const correctedBoundLocation = {
        x: this.boundLocations.x - Math.abs(nextMaxX - 9),
        y: this.boundLocations.y,
      };

      if (isInsideBoard(correctedBoundLocation, nextRotation)) {
        this.boundLocations = correctedBoundLocation;
        this.rotationIndex = nextRotationIndex;
      }
    }

    this.rotationIndex = nextRotationIndex;
    return;
  };

  public move = (direction: "left" | "right") => {
    if (direction === "left" && this.minX > 0) {
      this.boundLocations.x--;
    } else if (direction === "right" && this.maxX < 9) {
      this.boundLocations.x++;
    } else {
      return;
    }
  };

  private createCells = (locations: ILocation[]): Cell[] => {
    return locations.map(
      (location) =>
        new Cell(
          this.boundLocations.x + location.x,
          this.boundLocations.y + location.y,
        ),
    );
  };
}
