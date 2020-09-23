class SoundController {

    mute: boolean = false;
    private sounds: Map<string, HTMLAudioElement> = new Map<string, HTMLAudioElement>();

    constructor() {

    }

    get(name: string): HTMLAudioElement {
        return this.sounds.get(name);
    }

    add(name: string, src: string): SoundController {
        const audio = new Audio(src);
        this.sounds.set(name, audio);
        return this;
    }

    remove(name: string): SoundController {
        const audio = this.get(name);
        this.sounds.delete(name);
        return this;
    }

    play(name: string): SoundController {
        const audio = this.get(name);
        if (!this.mute && audio) {
            audio.play();
        }
        return this;
    }

    pause(name: string): SoundController {
        const audio = this.get(name);
        if (audio) {
            audio.pause();
        }
        return this;
    }

    stop(name: string): SoundController {
        const audio = this.get(name);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        return this;
    }

    scrub(name: string, time: number = 0): SoundController {
        const audio = this.get(name);
        if (audio) {
            audio.currentTime = time;
        }
        return this;
    }

    volume(name: string, level: number = 1): SoundController {
        const audio = this.get(name);
        if (audio) {
            audio.volume = level;
        }
        return this;
    }

    loop(name: string, on: boolean = true): SoundController {
        const audio = this.get(name);
        if (audio) {
            audio.loop = on;
        }
        return this;
    }
}

let soundController: SoundController = null;

function getSoundController(): SoundController {
    if (!soundController) {
        soundController = new SoundController();
    }
    return soundController;
}

export { getSoundController, SoundController };