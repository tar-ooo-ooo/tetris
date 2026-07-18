import { Cell } from "../cell";
import { ILocation } from "../interface/ILocations";
import { ITetromino } from "../interface/ITetromino";
import { canMove, getBoundary } from "../utils";

export abstract class BaseTetromino implements ITetromino {
  protected boundLocation: ILocation = {
    x: Math.floor(Math.random() * 2 + 2),
    y: 0,
  };

  protected rotationIndex = 0;
  protected abstract readonly rotations: ILocation[][];
  protected get locations(): ILocation[] {
    return this.rotations[this.rotationIndex];
  }
  protected get minY() {
    return getBoundary(this.boundLocation, this.locations, "min", "y");
  }

  protected get localMinY(): number {
    return Math.min(...this.locations.map((location) => location.y));
  }

  public create(): Cell[] {
    return this.locations.map(
      (location) =>
        new Cell(
          this.boundLocation.x + location.x,
          this.boundLocation.y + location.y,
        ),
    );
  }

  public move(direction: "left" | "right" | "down"): void {
    const nextBoundLocation: ILocation = {
      x: this.boundLocation.x,
      y: this.boundLocation.y,
    };

    switch (direction) {
      case "left":
        nextBoundLocation.x--;
        break;
      case "right":
        nextBoundLocation.x++;
        break;
      case "down":
        nextBoundLocation.y++;
        break;
    }

    this.boundLocation = nextBoundLocation;
  }

  public rotate(occupiedLocations: ILocation[]): void {
    const nextRotationIndex = (this.rotationIndex + 1) % this.rotations.length;

    const nextRotations = this.rotations[nextRotationIndex];
    const nextLocations = nextRotations.map((location) => ({
      x: this.boundLocation.x + location.x,
      y: this.boundLocation.y + location.y,
    }));

    if (canMove(nextLocations, occupiedLocations)) {
      this.rotationIndex = nextRotationIndex;
      return;
    }

    const nextMinX = getBoundary(this.boundLocation, nextRotations, "min", "x");
    const nextMaxX = getBoundary(this.boundLocation, nextRotations, "max", "x");
    const nextMaxY = getBoundary(this.boundLocation, nextRotations, "max", "y");

    let correctedBoundLocation: ILocation | null = null;

    if (nextMinX < 0) {
      correctedBoundLocation = {
        x: this.boundLocation.x + Math.abs(nextMinX),
        y: this.boundLocation.y,
      };
    } else if (nextMaxX > 9) {
      correctedBoundLocation = {
        x: this.boundLocation.x - (nextMaxX - 9),
        y: this.boundLocation.y,
      };
    } else if (nextMaxY > 19) {
      correctedBoundLocation = {
        x: this.boundLocation.x,
        y: this.boundLocation.y - (nextMaxY - 19),
      };
    }

    const correctedLocations = correctedBoundLocation
      ? nextRotations.map((location) => ({
          x: correctedBoundLocation.x + location.x,
          y: correctedBoundLocation.y + location.y,
        }))
      : [];

    if (
      correctedBoundLocation &&
      canMove(correctedLocations, occupiedLocations)
    ) {
      this.boundLocation = correctedBoundLocation;
      this.rotationIndex = nextRotationIndex;
    }
  }

  public getNextLocations(direction: "left" | "right" | "down"): ILocation[] {
    const boundX = this.boundLocation.x;
    const boundY = this.boundLocation.y;

    return this.locations.map((location) => {
      switch (direction) {
        case "left":
          return {
            x: boundX + location.x - 1,
            y: boundY + location.y,
          };
        case "right":
          return {
            x: boundX + location.x + 1,
            y: boundY + location.y,
          };
        case "down":
          return {
            x: boundX + location.x,
            y: boundY + location.y + 1,
          };
      }
    });
  }
}
