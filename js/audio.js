/**
 * FOOTBALL GUESS — Web Audio API Sound Synthesizer
 * 100% self-contained audio effects (no external MP3/WAV files required)
 */

class SoundSystem {
  constructor() {
    this.ctx = null;
    this.enabled = typeof Storage !== "undefined" ? Storage.getSoundEnabled() : true;
  }

  _initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setEnabled(val) {
    this.enabled = !!val;
    if (typeof Storage !== "undefined") {
      Storage.setSoundEnabled(this.enabled);
    }
  }

  toggle() {
    this.setEnabled(!this.enabled);
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this._initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(600, t);
    osc.frequency.exponentialRampToValueAtTime(300, t + 0.05);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.06);
  }

  playCorrect() {
    if (!this.enabled) return;
    this._initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Pleasant ascending chord: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = t + idx * 0.07;
      const dur = 0.22;

      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.2, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + dur);
    });
  }

  playWrong() {
    if (!this.enabled) return;
    this._initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Low, gentle buzzer: descending pair
    const tones = [220, 164.81]; // A3 -> E3
    tones.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = t + idx * 0.1;
      const dur = 0.18;

      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, start);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.12, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + dur);
    });
  }

  playNext() {
    if (!this.enabled) return;
    this._initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const t = this.ctx.currentTime;

    osc.type = "sine";
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(800, t + 0.12);

    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.12, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.13);
  }

  playFanfare() {
    if (!this.enabled) return;
    this._initContext();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    // Energetic triumphant fanfare
    const chords = [
      { start: 0.0, freqs: [523.25, 659.25], dur: 0.15 },
      { start: 0.18, freqs: [587.33, 698.46], dur: 0.15 },
      { start: 0.36, freqs: [659.25, 783.99], dur: 0.18 },
      { start: 0.58, freqs: [783.99, 1046.50], dur: 0.45 }
    ];

    chords.forEach(c => {
      c.freqs.forEach(freq => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = t + c.start;

        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.001, start);
        gain.gain.linearRampToValueAtTime(0.18, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + c.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + c.dur);
      });
    });
  }
}

const Sound = new SoundSystem();

if (typeof module !== "undefined" && module.exports) {
  module.exports = { SoundSystem, Sound };
}
