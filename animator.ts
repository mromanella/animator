export class Animator {

	canvasEl: any;
	ctx: CanvasRenderingContext2D;
	canvasHeight: number;
	canvasWidth: number;
	private lastDraw: any;
	private paused: boolean;
	private callback: any;
	private fps: number;
	private args: any[];

	/**
     * @description Creates an animator class.
     * @param canvasId The HTML ID for the canvas element.
     * @param callbackFunc The function to perform on every draw. Accepts 2dCanvasContext as a param.
     * @param FPS The FPS rate. Pass in an int - 30 for 30 FPS.
     */
	constructor(canvasId: string, fps: number, callback: any, startPaused: boolean = false, ...args: any[]) {
		this.canvasEl = document.getElementById(canvasId);
		this.ctx = this.canvasEl.getContext('2d');
		this.canvasHeight = this.canvasEl.height;
		this.canvasWidth = this.canvasEl.width;
		this.lastDraw = false;
		this.paused = startPaused;
		this.callback = callback;
		this.fps = this.setFPS(fps);
		this.args = args;
		this.animate();
	}

	/**
     * @description Draws.
     * @param runningTime precise time
     */
	private animate = (runningTime: number = 0) => {
		if (!this.paused) {
			if (!this.lastDraw) {
				this.lastDraw = runningTime;
			}
			let diff = runningTime - this.lastDraw;

			if (diff / this.fps > 1) {
				// Clear before redraw
				this.ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height);

				// Run the callback function to draw
				this.callback(this.ctx, this, ...this.args);
				this.lastDraw = runningTime;
			}
			requestAnimationFrame(this.animate);
		}
	}

	pause = () => {
		this.paused = true;
	}

	resume = () => {
		this.paused = false;
		this.animate();
	}

	isPaused = () => {
		return this.paused;
	}

	getFPS = () => {
		return 1000 / this.fps;
	}

	setFPS = (fps: number) => {
		this.fps = 1000 / fps;
		return this.fps;
	}
}

export class Point {

	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	copy = (): Point => {
		return new Point(this.x, this.y);
	}

	distance = (other: Point): number => {
		return Math.sqrt(Math.pow(this.x - other.x, 2) + Math.pow(this.y - other.y, 2));
	}

	magnitude = (): number => {
		return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
	}

	direction = (): Point => {
		let magnitude = this.magnitude();
		return this.divide(magnitude);
	}

	diff = (other: number | Point): Point => {
		if (typeof other == 'number') {
			return new Point(this.x - other, this.y - other);
		}
		if (other instanceof Point) {
			return new Point(this.x - other.x, this.y - other.y);
		}

	}

	add = (other: number | Point): Point => {
		if (typeof other == 'number') {
			return new Point(this.x + other, this.y + other);
		}
		if (other instanceof Point) {
			return new Point(this.x + other.x, this.y + other.y);
		}
	}

	multiply = (other: number | Point): Point => {
		if (typeof other == 'number') {
			return new Point(this.x * other, this.y * other);
		}
		if (other instanceof Point) {
			return new Point(this.x * other.x, this.y * other.y);
		}
	}

	divide = (other: number | Point): Point => {
		if (typeof other == 'number') {
			return new Point(this.x / other, this.y / other);
		}
		if (other instanceof Point) {
			return new Point(this.x / other.x, this.y / other.y);
		}
	}
}

export class Circle {

	location: Point;
	radius: number;
	color: string;

	constructor(location: Point, radius: number, color: string) {
		this.location = location;
		this.radius = radius;
		this.color = color;
	}

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.location.x, this.location.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
	}
}

export class Line {

	path: Point[];
	width: number;
	color: string;

	constructor(path: Point[], width: number, color: string) {
		this.path = path;
		this.width = width;
		this.color = color;
	}

	draw = (ctx: CanvasRenderingContext2D) => {
		for (let i = 0; i + 1 < this.path.length; i++) {
			let point1 = this.path[i];
			let point2 = this.path[i + 1];
			ctx.beginPath();
			ctx.moveTo(point1.x, point1.y);
			ctx.lineWidth = this.width;
			ctx.strokeStyle = this.color;
			ctx.lineTo(point2.x, point2.y);
			ctx.stroke();
		}
	}

	appendPoint = (point: Point) => {
		this.path.push(point);
	}

	popPoint = (index: number = -1): Point => {
		if (index >= 0) {
			return this.path.splice(index, 1)[0];
		} else {
			return this.path.pop();
		}
	}
}
