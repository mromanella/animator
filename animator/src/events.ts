class GameEvent {

    obj: any;
    callbacks: Function[] = [];

    constructor(obj: any) {
        this.obj = obj;
    }

    add(callback: Function) {
        this.callbacks.push(callback);
    }

    trigger() {
        for (let callback of this.callbacks) {
            callback(this.obj);
        }
    }

    clear() {
        this.callbacks = [];
    }

}

export default GameEvent;