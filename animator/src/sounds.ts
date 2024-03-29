class SoundController extends Map<string, HTMLAudioElement> {

    mute: boolean = false;
    private _volumeMax: number = 1;


    public get volumeMax(): number {
        return this._volumeMax;
    }


    public set volumeMax(max: number) {
        this._volumeMax = max;
        for (let audio of this.values()) {
            if (audio.volume > this._volumeMax) {
                audio.volume = this._volumeMax;
            }
        }
    }

    add(name: string, src: string): SoundController {
        const audio = new Audio(src);
        if (audio.volume > this._volumeMax) {
            audio.volume = this._volumeMax;
        }
        this.set(name, audio);
        return this;
    }

    remove(name: string): SoundController {
        this.get(name);
        this.delete(name);
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

    playBackRate(name: string, rate: number = 1): SoundController {
        const audio = this.get(name);
        if (audio) {
            audio.playbackRate = rate;
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
