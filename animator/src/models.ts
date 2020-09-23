export interface GameObject {

	getBoundingBox: Function

}

export class BoundingBox {
	xMin: number;
	yMin: number;
	xMax: number;
	yMax: number;

	constructor(xMin: number, yMin: number, xMax: number, yMax: number) {
		this.xMin = xMin;
		this.yMin = yMin;
		this.xMax = xMax;
		this.yMax = yMax;
	}
}

export class Point {

	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	copy(): Point {
		return new Point(this.x, this.y);
	}

	equals(other: Point): boolean {
		return (this.x === other.x && this.y === other.y);
	}

	midpoint(other: Point): Point {
		return new Point((this.x + other.x) / 2, (this.y + other.y) / 2);
	}

	distance(other: Point): number {
		return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
	}

	magnitude(): number {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	direction(): Point {
		let magnitude = this.magnitude();
		return this.divide(magnitude);
	}

	diff(other: number | Point): Point {
		if (typeof other == 'number') {
			return new Point(this.x - other, this.y - other);
		}
		if (other instanceof Point) {
			return new Point(this.x - other.x, this.y - other.y);
		}

	}

	add(other: number | Point): Point {
		if (typeof other == 'number') {
			return new Point(this.x + other, this.y + other);
		}
		if (other instanceof Point) {
			return new Point(this.x + other.x, this.y + other.y);
		}
	}

	multiply(other: number | Point): Point {
		if (typeof other == 'number') {
			return new Point(this.x * other, this.y * other);
		}
		if (other instanceof Point) {
			return new Point(this.x * other.x, this.y * other.y);
		}
	}

	divide(other: number | Point): Point {
		if (typeof other == 'number') {
			return new Point(this.x / other, this.y / other);
		}
		if (other instanceof Point) {
			return new Point(this.x / other.x, this.y / other.y);
		}
	}
}

export class Circle extends Point implements GameObject {

	x: number;
	y: number;
	radius: number;
	color: string;

	/**
	 * Initializes a Circle
	 * @param radius Radious
	 * @param color Color
	 */
	constructor(x: number, y: number, radius: number, color: string) {
		super(x, y);
		this.radius = radius;
		this.color = color;
	}

	equals(other: Circle): boolean {
		return super.equals(other) && (this.radius === other.radius);
	}

	draw(ctx: CanvasRenderingContext2D, fill: boolean = false, drawBB: boolean = false) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		if (fill) {
			ctx.fillStyle = this.color;
			ctx.fill();
		} else {
			ctx.strokeStyle = this.color;
			ctx.stroke();
		}

		if (drawBB) {
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			let bb = this.getBoundingBox();
			let diameter = this.getDiameter()
			ctx.strokeRect(bb.xMin, bb.yMin, diameter, diameter);
		}
	}

	getBoundingBox(): BoundingBox {
		let xMin = this.x - this.radius;
		let yMin = this.y - this.radius;
		let xMax = this.x + this.radius;
		let yMax = this.y + this.radius;
		return new BoundingBox(xMin, yMin, xMax, yMax);
	}

	getDiameter() {
		return this.radius * 2;
	}
}

export class Line implements GameObject {

	path: Point[];
	width: number;
	color: string;

	/**
	 * Creates a Line
	 * @param path List of points to initialize the line.
	 * @param width Width of the line.
	 * @param color Color of the line.
	 */
	constructor(path: Point[], width: number, color: string) {
		this.path = path;
		this.width = width;
		this.color = color;
	}

	draw(ctx: CanvasRenderingContext2D, drawBB: boolean = false) {
		ctx.beginPath();
		let point1 = this.path[0];
		ctx.moveTo(point1.x, point1.y);
		for (let i = 1; i < this.path.length; i++) {
			let point2 = this.path[i];
			ctx.lineTo(point2.x, point2.y);
		}

		ctx.lineWidth = this.width;
		ctx.strokeStyle = this.color;
		ctx.stroke();

		if (drawBB) {
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			let bb = this.getBoundingBox();
			ctx.strokeRect(bb.xMin, bb.yMin, this.width / 2, this.width / 2);
		}
	}

	getBoundingBox() {
		let pt = this.path[0];
		let pt1 = pt.diff(this.width / 2);
		let pt2 = pt.add(this.width / 2);
		return new BoundingBox(pt1.x, pt1.y, pt2.x, pt2.y);
	}

	getMidpoint(pos1: number, pos2: number): Point {
		let ptA = this.path[pos1];
		let ptB = this.path[pos2];
		return ptA.midpoint(ptB);
	}

	appendPoint(point: Point) {
		this.path.push(point);
	}

	popPoint(index: number = -1): Point {
		if (index >= 0) {
			return this.path.splice(index, 1)[0];
		} else {
			return this.path.pop();
		}
	}
}

export class Triangle extends Line {
	/**
	 * Not yet working
	 * @param path
	 * @param width
	 * @param color
	 */

	constructor(path: Point[], width: number, color: string) {
		super(path, width, color);
	}

	draw(ctx: CanvasRenderingContext2D, fill: boolean = false, drawBB: boolean = false) {
		ctx.beginPath();
		let point1 = this.path[0];
		ctx.moveTo(point1.x, point1.y);
		for (let i = 1; i < this.path.length; i++) {
			let point2 = this.path[i];
			ctx.lineTo(point2.x, point2.y);
		}

		ctx.lineWidth = this.width;
		ctx.closePath();
		if (fill) {
			ctx.fillStyle = this.color;
			ctx.fill();
		} else {
			ctx.strokeStyle = this.color;
			ctx.stroke();
		}

		if (drawBB) {
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			let bb = this.getBoundingBox();
			ctx.strokeRect(bb.xMin, bb.yMin, this.width / 2, this.width / 2);
		}
	}
}

export class Rectangle extends Point implements GameObject {

	x: number;
	y: number;
	width: number;
	height: number;
	color: string;

	constructor(x: number, y: number, width: number, height: number, color: string) {
		super(x, y);
		this.width = width;
		this.height = height;
		this.color = color;
	}

	equals(other: Rectangle): boolean {
		return super.equals(other) && (this.width === other.width && this.height === other.height);
	}

	draw(ctx: CanvasRenderingContext2D, fill: boolean = false, drawBB: boolean = false) {
		ctx.beginPath();
		if (fill) {
			ctx.fillStyle = this.color;
			ctx.fillRect(this.x, this.y, this.width, this.height);
		} else {
			ctx.strokeStyle = this.color;
			ctx.strokeRect(this.x, this.y, this.width, this.height);
		}

		if (drawBB) {
			ctx.beginPath();
			ctx.strokeStyle = 'red';
			let bb = this.getBoundingBox();
			ctx.strokeRect(bb.xMin, bb.yMin, this.width, this.height);
		}
	}

	getBoundingBox(): BoundingBox {
		let xMin = this.x;
		let yMin = this.y;
		let xMax = this.x + this.width;
		let yMax = this.y + this.height;
		return new BoundingBox(xMin, yMin, xMax, yMax);
	}
}
