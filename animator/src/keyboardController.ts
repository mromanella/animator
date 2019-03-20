
export class KeyNames {
    static w = 'w';
    static a = 'a';
    static s = 's';
    static d = 'd'
    static control = 'Control';
    static shift = 'Shift';
    static space = ' ';
}


export class Key {
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

    togglePressed = () => {
        this.isPressed = !this.isPressed;
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
}

export class KeyboardController {
    keyboardKeys: Key[] = [];

    constructor(keyboardKeys: Key[]) {
        this.keyboardKeys = keyboardKeys;
        this.clearAllPresses();
    }

    addKey = (key: Key) => {
        let found = this.getKey(key.keyName);
        if (found) {
            this.removeKey(key.keyName);
        }
        this.keyboardKeys.push(key);
    }

    removeKey = (keyName: string): Key => {
        let key = this.getKey(keyName);
        if (key) {
            let index = this.keyboardKeys.indexOf(key);
            return this.keyboardKeys.splice(index, 1)[0];
        }
        return null;
    }

    getKey = (keyName: string): Key => {
        for (let key of this.keyboardKeys) {
            if (key.keyName == keyName) {
                return key;
            }
        }
        return null;
    }

    keyCapture = (keyEvent: KeyboardEvent) => {
        keyEvent.preventDefault();
        keyEvent.stopImmediatePropagation();
        let keyName = keyEvent.key;
        let keyObj = this.getKey(keyName);
        if (keyObj) {
            if (keyEvent.type == 'keypress' || keyEvent.type == 'keydown') {
                keyObj.isPressed = true;
                keyObj.runOnKeyPress();
            } else {
                // Assumes keyup
                keyObj.isPressed = false;
                keyObj.runOnKeyRelease();
            }
        }
    }

    getPressedKeys = (): Key[] => {
        let pressed = [];
        for (let key of this.keyboardKeys) {
            if (key.isPressed) {
                pressed.push(key);
            }
        }
        return pressed;
    }

    getPressedKeysNames = (): string[] => {
        let pressed = [];
        for (let key of this.getPressedKeys()) {
            pressed.push(key.keyName);
        }
        return pressed;
    }

    clearAllPresses = () => {
        for (let key of this.keyboardKeys) {
            key.isPressed = false;
        }
    }
}

let playerKbController: KeyboardController = null;
export const getPlayerKeyboardController = (keyboardKeys: Key[]): KeyboardController => {
    if (!playerKbController) {
        playerKbController = new KeyboardController(keyboardKeys);

        addEventListener('keydown', playerKbController.keyCapture, true);
        addEventListener('keypress', playerKbController.keyCapture, true);
        addEventListener('keyup', playerKbController.keyCapture, true);
    }
    return playerKbController;
}

export const updatePressCounts = (kbController: KeyboardController, keyPressCounts: any) => {
    for (let key of kbController.keyboardKeys) {
        if (key.isPressed) {
            keyPressCounts[key.keyName]++;
        } else {
            if (keyPressCounts[key.keyName] > 0) {
                keyPressCounts[key.keyName]--;
            } else if (keyPressCounts[key.keyName] < 0) {
                keyPressCounts[key.keyName] = 0;
            }
        }
    }
}
