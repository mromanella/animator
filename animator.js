class Animator {
	/**
     * @description Creates an animator class.
     * @param canvasId The HTML ID for the canvas element.
     * @param callbackFunc The function to perform on every draw. Accepts 2dCanvasContext as a param.
     * @param FPS The FPS rate. Pass in an int - 30 for 30 FPS.
     */
	constructor(canvasId, fps, callback, ...args) {
		this.canvasEl = document.getElementById(canvasId);
		this.ctx = this.canvasEl.getContext('2d');
		this.canvasHeight = this.canvasEl.height;
		this.canvasWidth = this.canvasEl.width;
		this.lastDraw = false;
		this.stopped = false;
		this.callback = callback;
		this.fps = 1000 / fps;
		this.args = args;
	}

	/**
     * @description Draws.
     * @param runningTime precise time
     */
	animate(runningTime) {
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

	stopAnimating() {
		this.stopped = true;
	}

	resumeAnimating() {
		this.stopped = false;
	}

  isStopped() {
    return this.stopped;
  }
}

class Point {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

class Circle extends Point {
	constructor(x, y, radius, color) {
		super(x, y);
		this.radius = radius;
		this.color = color;
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
		ctx.fill();
	}
}

class Line {
	constructor(path, width, color) {
		this.path = path;
		this.width = width;
		this.color = color;
	}

	draw(ctx) {
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

	appendPoint(point) {
		this.path.push(point);
	}
}
