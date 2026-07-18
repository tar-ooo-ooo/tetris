import { Cell } from "../cell";
import { ILocation } from "../interface/ILocations";
import { ITetromino } from "../interface/ITetromino";
import { getBoundary, isInsideBoard } from "../utils";

export abstract class BaseTetromino implements ITetromino {
  protected boundLocations: ILocation = {
    x: Math.floor(Math.random() * 2 + 2),
    y: 0,
  };

  protected rotationIndex = 0;
  protected abstract readonly rotations: ILocation[][];
  protected get locations(): ILocation[] {
    return this.rotations[this.rotationIndex];
  }
  protected get minY() {
    return getBoundary(this.boundLocations, this.locations, "min", "y");
  }

  protected get localMinY(): number {
    return Math.min(...this.locations.map((location) => location.y));
  }

  public create(): Cell[] {
    return this.locations.map(
      (location) =>
        new Cell(
          this.boundLocations.x + location.x,
          this.boundLocations.y + location.y,
        ),
    );
  }

  public move(direction: "left" | "right" | "down"): boolean {
    const nextBoundLocation: ILocation = {
      x: this.boundLocations.x,
      y: this.boundLocations.y,
    };

    if (direction === "left") {
      nextBoundLocation.x--;
    } else if (direction === "right") {
      nextBoundLocation.x++;
    } else {
      nextBoundLocation.y++;
    }

    if (!isInsideBoard(nextBoundLocation, this.locations)) {
      return false;
    }
    this.boundLocations = nextBoundLocation;
    return true;
  }

  public rotate(): void {
    const nextRotationIndex = (this.rotationIndex + 1) % this.rotations.length;

    const nextRotation = this.rotations[nextRotationIndex];

    if (isInsideBoard(this.boundLocations, nextRotation)) {
      this.rotationIndex = nextRotationIndex;
      return;
    }

    const nextMinX = getBoundary(this.boundLocations, nextRotation, "min", "x");
    const nextMaxX = getBoundary(this.boundLocations, nextRotation, "max", "x");
    const nextMaxY = getBoundary(this.boundLocations, nextRotation, "max", "y");

    let correctedBoundLocation: ILocation | null = null;

    if (nextMinX < 0) {
      correctedBoundLocation = {
        x: this.boundLocations.x + Math.abs(nextMinX),
        y: this.boundLocations.y,
      };
    } else if (nextMaxX > 9) {
      correctedBoundLocation = {
        x: this.boundLocations.x - (nextMaxX - 9),
        y: this.boundLocations.y,
      };
    } else if (nextMaxY > 19) {
      correctedBoundLocation = {
        x: this.boundLocations.x,
        y: this.boundLocations.y - (nextMaxY - 19),
      };
    }

    if (
      correctedBoundLocation &&
      isInsideBoard(correctedBoundLocation, nextRotation)
    ) {
      this.boundLocations = correctedBoundLocation;
      this.rotationIndex = nextRotationIndex;
    }
  }
}
