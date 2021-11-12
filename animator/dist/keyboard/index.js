import Key from './key';
import { KeyboardController } from './keyboardController';
import * as keyNames from './keyNames';
export { Key, KeyboardController, keyNames };
let controller = null;
export function lockKeys(keys) {
    for (let key of keys) {
        key.setLocked(true);
    }
}
export function unlockKeys(keys) {
    for (let key of keys) {
        key.setLocked(false);
    }
}
export function getKeyboardController(keys = []) {
    if (!controller) {
        controller = new KeyboardController([]);
    }
    for (let key of keys) {
        controller.addKey(key);
    }
    return controller;
}
