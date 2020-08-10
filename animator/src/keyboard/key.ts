
export default class Key {
    keyName: string;
    onKeyPress: Function[];
    onKeyRelease: Function[];
    isPressed: boolean;
    constructor(keyName: string, onKeyPress: Function[] = [], onKeyRelease: Function[] = []) {
        this.keyName = keyName;
        this.onKeyPress = onKeyPress;
        this.onKeyRelease = onKeyRelease;
        this.isPressed = false;
    }

    addKeyPress = (func: Function) => {
        this.onKeyPress.push(func);
    }

    addKeyRelease = (func: Function) => {
        this.onKeyRelease.push(func);
    }

    runOnKeyPress = () => {
        for (let func of this.onKeyPress) {
            func();
        }
    }

    runOnKeyRelease = () => {
        for (let func of this.onKeyRelease) {
            func();
        }
    }

    run = () => {
        if (this.isPressed) {
            this.runOnKeyPress();
        } else {
            this.runOnKeyRelease();
        }
    }

    togglePressed = () => {
        this.isPressed = !this.isPressed;
        this.run();
    }

    setPressed(isPressed: boolean) {
        this.isPressed = isPressed;
        this.run();
    }
}
