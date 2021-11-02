class EventController {
    constructor() {
        this.registeredEvents = new Map();
    }
    register(name, callback, ...args) {
        const packed = [callback, ...args];
        const key = String(packed);
        if (!this.registeredEvents.has(name)) {
            const newRegistration = new Map();
            this.registeredEvents.set(name, newRegistration);
        }
        const registered = this.registeredEvents.get(name);
        registered.set(key, packed);
    }
    unregister(name, callback, ...args) {
        if (this.registeredEvents.has(name)) {
            const key = String([callback, ...args]);
            const registered = this.registeredEvents.get(name);
            registered.delete(key);
        }
    }
    trigger(name) {
        if (this.registeredEvents.has(name)) {
            const registered = this.registeredEvents.get(name);
            for (let [callback, ...args] of registered.values()) {
                callback(...args);
            }
        }
    }
}
let eventController = null;
function getEventController() {
    if (!eventController) {
        eventController = new EventController();
    }
    return eventController;
}
export { getEventController, EventController };
