import { BoundingBox } from "./objects/index";
export default class Animator {
    /**
     * @description Creates an animator class.
     * @param canvasId The HTML ID for the canvas element.
     * @param callbackFunc The function to perform on every draw. Accepts 2dCanvasContext as a param.
     * @param FPS The FPS rate. Pass in an int - 30 for 30 FPS.
     */
    constructor(canvasSelector, fps, callback = null, ...args) {
        this.paused = true;
        this.canvasEl = document.querySelector(`${canvasSelector}`);
        this.ctx = this.canvasEl.getContext('2d');
        this.lastDraw = false;
        this.callback = callback;
        this.setFPS(fps);
        this.args = args;
        this.animate = this.animate.bind(this);
        this.animate();
    }
    /**
     * @description Draws.
     * @param runningTime precise time
     */
    animate(runningTime = 0) {
        if (!this.paused) {
            if (!this.lastDraw) {
                this.lastDraw = runningTime;
            }
            let diff = runningTime - this.lastDraw;
            if (diff / this.fps > 1) {
                // Clear before redraw
                this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
                // Run the callback function to draw
                if (this.callback) {
                    this.callback(this, ...this.args);
                    this.lastDraw = runningTime;
                }
            }
            this.handle = requestAnimationFrame(this.animate);
        }
    }
    setCallback(callback, ...args) {
        this.callback = callback;
        this.args = args;
        return this;
    }
    pause() {
        this.paused = true;
        return this;
    }
    resume() {
        this.paused = false;
        this.animate();
        return this;
    }
    isPaused() {
        return this.paused;
    }
    stop() {
        cancelAnimationFrame(this.handle);
        this.ctx.clearRect(0, 0, this.getWidth(), this.getHeight());
        return this;
    }
    getFPS() {
        return 1000 / this.fps;
    }
    setFPS(fps) {
        this.fps = 1000 / fps;
        return this;
    }
    setHeight(height) {
        this.canvasEl.height = height;
        return this;
    }
    setWidth(width) {
        this.canvasEl.width = width;
        return this;
    }
    setDimensions(width, height) {
        this.setWidth(width);
        this.setHeight(height);
        return this;
    }
    getHeight() {
        return this.canvasEl.height;
    }
    getWidth() {
        return this.canvasEl.width;
    }
    getDimensions() {
        return [this.getWidth(), this.getHeight()];
    }
    noContextMenu() {
        this.canvasEl.oncontextmenu = () => { return false; };
    }
    contextMenu() {
        this.canvasEl.oncontextmenu = () => { return true; };
    }
    gameBounds() {
        return new BoundingBox(0, 0, this.getWidth(), this.getHeight());
    }
}
