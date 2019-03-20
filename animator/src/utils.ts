import { Point, BoundingBox } from "./models";

export const randomIndex = (lowerBound: number = 0, upperBound: number = 1): number => {
    return Math.floor(Math.random() * upperBound) + lowerBound;
}

export const randomChoice = (items: any[]): any => {
    let lowerBound = 0;
    let upperBound = items.length;
    return items[randomIndex(lowerBound, upperBound)];
}

export const randomPoint = (bounds: BoundingBox, offset: number = 0): Point => {
    let randX = randomIndex(bounds.xMin + offset, bounds.xMax - offset);
    let randY = randomIndex(bounds.yMin + offset, bounds.yMax - offset);
    return new Point(randX, randY);
}
