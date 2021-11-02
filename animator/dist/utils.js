import { Point } from "./objects/index";
function randomBetween(lowerBound = 0, upperBound = 1) {
    return Math.floor(Math.random() * (upperBound - lowerBound + 1) + lowerBound);
}
function randomChoice(items) {
    let lowerBound = 0;
    let upperBound = items.length;
    return items[randomBetween(lowerBound, upperBound)];
}
function randomPointBetween(bounds, offset = 0) {
    let randX = randomBetween(bounds.xMin + offset, bounds.xMax - offset);
    let randY = randomBetween(bounds.yMin + offset, bounds.yMax - offset);
    return new Point(randX, randY);
}
export { randomBetween, randomChoice, randomPointBetween };
