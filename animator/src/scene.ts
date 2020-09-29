import Animator from "./animator";
import { SoundController, getSoundController } from "./sounds";
import { EventController, getEventController } from "./events";
import { TextBox } from "./models";
import { Key, KeyboardController, getKeyboardController } from "./keyboard/index";


class Scene {

    anim: Animator;
    soundController: SoundController = getSoundController();
    eventController: EventController = getEventController();
    keyboardController: KeyboardController = getKeyboardController();
    updateSpeed: number;
    updateInterval: number = null;
    buttons: TextBox[] = [];
    keys: Key[] = [];

    constructor(anim: Animator, updateSpeed: number) {
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
        for (let btn of this.buttons) {
            btn.draw(true);
        }
    }

    start() {
        for (let key of this.keys) {
            this.keyboardController.addKey(key);
        }
        this.keyboardController.listen();
        this.anim.setCallback(this.draw);
        this.anim.resume();
        this.updateInterval = setInterval(this.update, this.updateSpeed);
    }

    stop() {
        this.anim.pause();
        clearInterval(this.updateInterval);
        this.keyboardController.stopListening();
        for (let key of this.keys) {
            this.keyboardController.removeKey(key.keyName);
        }
    }
}

export default Scene;