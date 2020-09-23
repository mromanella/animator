export class Animator {

	canvasEl: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	canvasHeight: number;
	canvasWidth: number;
	private lastDraw: any;
	private paused: boolean;
	private callback: any;
	private fps: number;
	private args: any[];
	private handle: number;

	/**
	 * @description Creates an animator class.
	 * @param canvasId The HTML ID for the canvas element.
	 * @param callbackFunc The function to perform on every draw. Accepts 2dCanvasContext as a param.
	 * @param FPS The FPS rate. Pass in an int - 30 for 30 FPS.
	 */
	constructor(canvasId: string, fps: number, callback: any, startPaused: boolean = false, ...args: any[]) {
		this.canvasEl = document.querySelector(`#${canvasId}`);
		this.ctx = this.canvasEl.getContext('2d');
		this.canvasHeight = this.canvasEl.height;
		this.canvasWidth = this.canvasEl.width;
		this.lastDraw = false;
		this.paused = startPaused;
		this.callback = callback;
		this.fps = this.setFPS(fps);
		this.args = args;

		this.animate = this.animate.bind(this);
		this.animate();
	}

	/**
	 * @description Draws.
	 * @param runningTime precise time
	 */
	private animate(runningTime: number = 0) {
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
			this.handle = requestAnimationFrame(this.animate);
		}
	}

	pause() {
		this.paused = true;
	}

	resume() {
		this.paused = false;
		this.animate();
	}

	isPaused() {
		return this.paused;
	}

	stop() {
		cancelAnimationFrame(this.handle);
		this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
	}

	getFPS() {
		return 1000 / this.fps;
	}

	setFPS(fps: number) {
		this.fps = 1000 / fps;
		return this.fps;
	}
}