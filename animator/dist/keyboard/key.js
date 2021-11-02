export default class Key {
    constructor(keyName, onKeyPress = [], onKeyRelease = []) {
        this.onKeyPress = [];
        this.onKeyRelease = [];
        this.pressed = false;
        this.locked = false;
        this.keyName = keyName;
        this.onKeyPress = onKeyPress;
        this.onKeyRelease = onKeyRelease;
    }
    runOnKeyPress() {
        for (let func of this.onKeyPress) {
            func(this);
        }
    }
    runOnKeyRelease() {
        for (let func of this.onKeyRelease) {
            func(this);
        }
    }
    addKeyPress(func) {
        this.onKeyPress.push(func);
    }
    addKeyRelease(func) {
        this.onKeyRelease.push(func);
    }
    run() {
        if (!this.isLocked()) {
            if (this.pressed) {
                this.runOnKeyPress();
            }
            else {
                this.runOnKeyRelease();
            }
        }
    }
    togglePressed() {
        this.pressed = !this.pressed;
        this.run();
        return this.isPressed();
    }
    setPressed(isPressed) {
        this.pressed = isPressed;
        this.run();
    }
    isPressed() {
        return this.pressed;
    }
    setLocked(isLocked) {
        this.locked = isLocked;
    }
    isLocked() {
        return this.locked;
    }
}
