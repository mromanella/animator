class BoundingBox {
    constructor(xMin, yMin, xMax, yMax) {
        this.xMin = xMin;
        this.yMin = yMin;
        this.xMax = xMax;
        this.yMax = yMax;
    }
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Point(this.x, this.y);
    }
    equals(other) {
        return (this.x === other.x && this.y === other.y);
    }
    midpoint(other) {
        return new Point((this.x + other.x) / 2, (this.y + other.y) / 2);
    }
    distance(other) {
        return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
    }
    magnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
    direction() {
        let magnitude = this.magnitude();
        return this.divide(magnitude);
    }
    diff(other) {
        if (typeof other == 'number') {
            return new Point(this.x - other, this.y - other);
        }
        if (other instanceof Point) {
            return new Point(this.x - other.x, this.y - other.y);
        }
    }
    add(other) {
        if (typeof other == 'number') {
            return new Point(this.x + other, this.y + other);
        }
        if (other instanceof Point) {
            return new Point(this.x + other.x, this.y + other.y);
        }
    }
    multiply(other) {
        if (typeof other == 'number') {
            return new Point(this.x * other, this.y * other);
        }
        if (other instanceof Point) {
            return new Point(this.x * other.x, this.y * other.y);
        }
    }
    divide(other) {
        if (typeof other == 'number') {
            return new Point(this.x / other, this.y / other);
        }
        if (other instanceof Point) {
            return new Point(this.x / other.x, this.y / other.y);
        }
    }
}
class GameObject {
    constructor(ctx, x, y, updateSpeed = null) {
        this.shouldDraw = true;
        this.shouldUpdate = true;
        this.updateInterval = null;
        this.ctx = ctx;
        this.location = new Point(x, y);
        this.updateSpeed = updateSpeed;
        this.update = this.update.bind(this);
        this.draw = this.draw.bind(this);
    }
    update() {
    }
    draw() {
    }
    getBoundingBox() {
        return null;
    }
    setUpdateInterval() {
        this.clearUpdateInterval();
        if (this.updateSpeed !== null) {
            this.updateInterval = setInterval(this.update, this.updateSpeed);
        }
    }
    clearUpdateInterval() {
        clearInterval(this.updateInterval);
    }
}
export { BoundingBox, Point, GameObject };
