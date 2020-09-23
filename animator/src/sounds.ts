class SoundController {

    mute: boolean = false;
    sounds: Map<string, HTMLAudioElement> = new Map<string, HTMLAudioElement>();

    constructor() {

    }

    get(name: string): HTMLAudioElement {
        return this.sounds.get(name);
    }

    add(name: string, src: string): HTMLAudioElement {
        const audio = new Audio(src);
        this.sounds.set(name, audio);
        return audio;
    }

    remove(name: string) {
        const audio = this.get(name);
        this.sounds.delete(name);
        return audio;
    }

    play(name: string): HTMLAudioElement {
        const audio = this.get(name);
        if (audio) {
            audio.play();
        }
        return audio;
    }

    pause(name: string): HTMLAudioElement {
        const audio = this.get(name);
        if (audio) {
            audio.pause();
        }
        return audio;
    }

    scrub(name: string, time: number = 0) {
        const audio = this.get(name);
        if (audio) {
            audio.currentTime = time;
        }
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