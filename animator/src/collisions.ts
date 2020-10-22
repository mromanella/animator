import { GameObject } from "./objects/index";

function _withinHorizontal(obj1: GameObject, obj2: GameObject): boolean {
    const obj1Bounds = obj1.getBoundingBox();
    const obj2Bounds = obj2.getBoundingBox();

    if (obj2Bounds.xMin <= obj1Bounds.xMax && obj2Bounds.xMin >= obj1Bounds.xMin) {
        return true;
    }
    return false;
}

function _withinVertical(obj1: GameObject, obj2: GameObject): boolean {
    const obj1Bounds = obj1.getBoundingBox();
    const obj2Bounds = obj2.getBoundingBox();

    if (obj2Bounds.yMin <= obj1Bounds.yMax && obj2Bounds.yMin >= obj1Bounds.yMin) {
        return true;
    }
    return false;
}

function withinHorizontal(obj1: GameObject, obj2: GameObject): boolean {
    return _withinHorizontal(obj1, obj2) || _withinHorizontal(obj2, obj1);
}

function withinVertical(obj1: GameObject, obj2: GameObject) {
    return _withinVertical(obj1, obj2) || _withinVertical(obj2, obj1);
}

function checkCollision(obj1: GameObject, obj2: GameObject): boolean {

    const horiz = withinHorizontal(obj1, obj2) || withinHorizontal(obj2, obj1);
    const vert = withinVertical(obj1, obj2) || withinVertical(obj2, obj1);

    return horiz && vert;
}

export {
    checkCollision, withinHorizontal, withinVertical
}
