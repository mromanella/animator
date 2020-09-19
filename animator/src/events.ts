const registeredEvents: Map<string, Map<string, any[]>> = new Map<string, Map<string, any[]>>();

function register(name: string, callback: Function, ...args: any[]) {
    const packed = [callback, ...args];
    const key = String(packed);
    if (!registeredEvents.has(name)) {
        const newRegistration = new Map<string, any[]>();
        registeredEvents.set(name, newRegistration);
    }
    const registered = registeredEvents.get(name);
    registered.set(key, packed);
}

function unregister(name: string, callback: Function, ...args: any[]) {
    if (registeredEvents.has(name)) {
        const key = String([callback, ...args])
        const registered = registeredEvents.get(name);
        registered.delete(key);
    }
}

function trigger(name: string) {
    if (registeredEvents.has(name)) {
        const registered = registeredEvents.get(name);
        for (let [callback, ...args] of registered.values()) {
            callback(...args);
        }

    }
}

export { register, unregister, trigger };