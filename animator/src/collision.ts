import { BoundingBox } from "./models";

export const withinVerticalBounds = (obj1Bounds: BoundingBox, obj2Bounds: BoundingBox): boolean => {
    if (obj1Bounds.yMin < obj2Bounds.yMax && obj1Bounds.yMax > obj2Bounds.yMin) {
        return true;
    }
    return false;
}

export const withinHorizontalBounds = (obj1Bounds: BoundingBox, obj2Bounds: BoundingBox): boolean => {
    if (obj1Bounds.xMin < obj2Bounds.xMax && obj1Bounds.xMax > obj2Bounds.xMin) {
        return true;
    }
    return false;
}

export const withinBounds = (obj1Bounds: BoundingBox, obj2Bounds: BoundingBox): boolean => {
    if (withinHorizontalBounds(obj1Bounds, obj2Bounds) && withinVerticalBounds(obj1Bounds, obj2Bounds)) {
        return true;
    }
    return false;
}

export const checkCollision = (obj1Bounds: BoundingBox, obj2Bounds: BoundingBox): boolean => {
    return withinBounds(obj1Bounds, obj2Bounds);
}
