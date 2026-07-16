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
