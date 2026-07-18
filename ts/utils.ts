import { ILocation } from "./interface/ILocations";

export const getBoundary = (
  boundLocation: ILocation,
  locations: ILocation[],
  valueType: "min" | "max",
  direction: "x" | "y",
) => {
  if (valueType === "min") {
    return (
      Math.min(...locations.map((location) => location[direction])) +
      boundLocation[direction]
    );
  } else {
    return (
      Math.max(...locations.map((location) => location[direction])) +
      boundLocation[direction]
    );
  }
};

// TODO 之後會改成判斷如果碰到邊界 + 其他方塊
export const isInsideBoard = (
  boundLocation: ILocation,
  locations: ILocation[],
): boolean => {
  const minX = getBoundary(boundLocation, locations, "min", "x");
  const maxX = getBoundary(boundLocation, locations, "max", "x");
  const minY = getBoundary(boundLocation, locations, "min", "y");
  const maxY = getBoundary(boundLocation, locations, "max", "y");

  return minX >= 0 && maxX <= 9 && minY >= 0 && maxY <= 19;
};

export const canMove = (
  nextLocations: ILocation[],
  occupiedLocations: ILocation[],
): boolean => {
  return nextLocations.every((nextLocation) => {
    // 判斷是否在 board 內
    const isInsideBoard =
      nextLocation.x >= 0 &&
      nextLocation.x < 10 &&
      nextLocation.y >= 0 &&
      nextLocation.y < 20;

    if (!isInsideBoard) return false;

    const isOccupied = occupiedLocations.some(
      (occupiedLocation) =>
        occupiedLocation.x === nextLocation.x &&
        occupiedLocation.y === nextLocation.y,
    );

    if (isOccupied) {
      console.log("撞到", nextLocation);
    }

    return !isOccupied;
  });
};
