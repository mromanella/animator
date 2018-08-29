export class Animator {

	canvasEl: any;
	ctx: CanvasRenderingContext2D;
	canvasHeight: number;
	canvasWidth: number;
	lastDraw: any;
	stopped: boolean;
	callback: any;
	fps: number;
	args: any[];

	/**
     * @description Creates an animator class.
     * @param canvasId The HTML ID for the canvas element.
     * @param callbackFunc The function to perform on every draw. Accepts 2dCanvasContext as a param.
     * @param FPS The FPS rate. Pass in an int - 30 for 30 FPS.
     */
	constructor(canvasId: string, fps: number, callback: any, ...args: any[]) {
		this.canvasEl = document.getElementById(canvasId);
		this.ctx = this.canvasEl.getContext('2d');
		this.canvasHeight = this.canvasEl.height;
		this.canvasWidth = this.canvasEl.width;
		this.lastDraw = false;
		this.stopped = false;
		this.callback = callback;
		this.fps = this.setFPS(fps);
		this.args = args;
	}

	/**
     * @description Draws.
     * @param runningTime precise time
     */
	animate = (runningTime: number) => {
		if (!this.stopped) {
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
		}
		requestAnimationFrame(this.animate);
	}

	stopAnimating = () => {
		this.stopped = true;
	}

	resumeAnimating = () => {
		this.stopped = false;
	}

	isStopped = () => {
		return this.stopped;
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
}

export class Circle extends Point {

	radius: number;
	color: string;

	constructor(x: number, y: number, radius: number, color: string) {
		super(x, y);
		this.radius = radius;
		this.color = color;
	}

	draw = (ctx: CanvasRenderingContext2D) => {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
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
}
