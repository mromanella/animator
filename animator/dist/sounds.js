class SoundController {
    constructor() {
        this.mute = false;
        this._volumeMax = 1;
        this.sounds = new Map();
    }
    get volumeMax() {
        return this._volumeMax;
    }
    set volumeMax(max) {
        this._volumeMax = max;
        for (let audio of this.sounds.values()) {
            if (audio.volume > this._volumeMax) {
                audio.volume = this._volumeMax;
            }
        }
    }
    get(name) {
        return this.sounds.get(name);
    }
    add(name, src) {
        const audio = new Audio(src);
        if (audio.volume > this._volumeMax) {
            audio.volume = this._volumeMax;
        }
        this.sounds.set(name, audio);
        return this;
    }
    remove(name) {
        const audio = this.get(name);
        this.sounds.delete(name);
        return this;
    }
    play(name) {
        const audio = this.get(name);
        if (!this.mute && audio) {
            audio.play();
        }
        return this;
    }
    pause(name) {
        const audio = this.get(name);
        if (audio) {
            audio.pause();
        }
        return this;
    }
    stop(name) {
        const audio = this.get(name);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        return this;
    }
    scrub(name, time = 0) {
        const audio = this.get(name);
        if (audio) {
            audio.currentTime = time;
        }
        return this;
    }
    volume(name, level = 1) {
        const audio = this.get(name);
        if (audio) {
            audio.volume = level;
        }
        return this;
    }
    loop(name, on = true) {
        const audio = this.get(name);
        if (audio) {
            audio.loop = on;
        }
        return this;
    }
    playBackRate(name, rate = 1) {
        const audio = this.get(name);
        if (audio) {
            audio.playbackRate = rate;
        }
        return this;
    }
}
let soundController = null;
function getSoundController() {
    if (!soundController) {
        soundController = new SoundController();
    }
    return soundController;
}
export { getSoundController, SoundController };
