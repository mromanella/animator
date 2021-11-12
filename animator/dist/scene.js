import { getSoundController } from "./sounds";
import { getEventController } from "./events";
import { getKeyboardController } from "./keyboard/index";
/** @description A Scene to draw. Has access to the sound, event and keyboard controllers.
 * Must implement the update and draw methods im subclass.
 *
 * @param anim The Animator object this scene belongs to.
 * @param updateSpeed How fast the scene should update. For fine grained control implement an objects
 * updates on your own.

*/
class Scene {
    constructor(anim, updateSpeed = null) {
        this.soundController = getSoundController();
        this.eventController = getEventController();
        this.keyboardController = getKeyboardController();
        this.updateInterval = null;
        this.keys = [];
        this.anim = anim;
        this.updateSpeed = updateSpeed;
        this.draw = this.draw.bind(this);
        this.update = this.update.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }
    update() {
    }
    draw() {
    }
    start() {
        for (let key of this.keys) {
            this.keyboardController.addKey(key);
        }
        this.keyboardController.listen();
        this.anim.setCallback(this.draw);
        this.anim.resume();
        if (this.updateSpeed !== null) {
            this.updateInterval = setInterval(this.update, this.updateSpeed);
        }
    }
    resume() {
        this.anim.resume();
        if (this.updateSpeed !== null) {
            this.updateInterval = setInterval(this.update, this.updateSpeed);
        }
    }
    pause() {
        clearInterval(this.updateInterval);
        this.anim.pause();
    }
    stop() {
        this.anim.stop();
        clearInterval(this.updateInterval);
        this.keyboardController.stopListening();
        for (let key of this.keys) {
            this.keyboardController.removeKey(key.keyName);
        }
    }
}
export default Scene;
