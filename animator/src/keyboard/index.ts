import Key from './key';
import { KeyboardController } from './keyboardController';
import * as keyNames from './keyNames';

export { Key, KeyboardController, keyNames }

let controller: KeyboardController = null;

export const lockKeys = (keys: Key[]) => {
    for (let key of keys) {
        key.setLocked(true);
    }
}

export const unlockKeys = (keys: Key[]) => {
    for (let key of keys) {
        key.setLocked(false);
    }
}

export const getKeyboardController = (keys: Key[]): KeyboardController => {
    if (!controller) {
        controller = new KeyboardController([]);
    }
    for (let key of keys) {
        controller.addKey(key);
    }
    return controller;
}