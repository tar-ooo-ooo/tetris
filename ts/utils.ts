import { ILocation } from "./interface/ILocations";

export const getBoundary = (
  boundLocations: ILocation,
  locations: ILocation[],
  valueType: "min" | "max",
  direction: "x" | "y",
) => {
  if (valueType === "min") {
    return (
      Math.min(...locations.map((location) => location[direction])) +
      boundLocations[direction]
    );
  } else {
    return (
      Math.max(...locations.map((location) => location[direction])) +
      boundLocations[direction]
    );
  }
};

export const isInsideBoard = (
  boundLocations: ILocation,
  locations: ILocation[],
): boolean => {
  const minX = getBoundary(boundLocations, locations, "min", "x");
  const maxX = getBoundary(boundLocations, locations, "max", "x");
  const minY = getBoundary(boundLocations, locations, "min", "y");
  const maxY = getBoundary(boundLocations, locations, "max", "y");

  return minX >= 0 && maxX <= 9 && minY >= 0 && maxY <= 19;
};
