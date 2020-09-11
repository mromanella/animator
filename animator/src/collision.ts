import { GameObject } from "./models";

function withinVerticalBounds(obj1: GameObject, obj2: GameObject): boolean {
    const obj1Bounds = obj1.getBoundingBox();
    const obj2Bounds = obj2.getBoundingBox();
    if (obj1Bounds.yMin < obj2Bounds.yMax && obj1Bounds.yMax > obj2Bounds.yMin) {
        return true;
    }
    return false;
}

function withinHorizontalBounds(obj1: GameObject, obj2: GameObject): boolean {
    const obj1Bounds = obj1.getBoundingBox();
    const obj2Bounds = obj2.getBoundingBox();
    if (obj1Bounds.xMin < obj2Bounds.xMax && obj1Bounds.xMax > obj2Bounds.xMin) {
        return true;
    }
    return false;
}

function withinBounds(obj1: GameObject, obj2: GameObject): boolean {
    if (withinHorizontalBounds(obj1, obj2) && withinVerticalBounds(obj1, obj2)) {
        return true;
    }
    return false;
}

function checkCollision(obj1: GameObject, obj2: GameObject): boolean {
    return withinBounds(obj1, obj2);
}

export {
    withinVerticalBounds,
    withinHorizontalBounds,
    withinBounds,
    checkCollision
}
