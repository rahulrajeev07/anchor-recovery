// Web Audio API ambient drone and Web Speech API Text-To-Speech helper

let audioCtx: AudioContext | null = null;
let activeOsc1: OscillatorNode | null = null;
let activeOsc2: OscillatorNode | null = null;
let activeGain: GainNode | null = null;

export function playCalmSynthTone(frequency = 174, durationMs = 4000) {
  try {
    if (typeof window === 'undefined') return;

    if (!audioCtx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
      }
    }

    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    if (!audioCtx) return;

    // Stop existing
    stopCalmSynth();

    const now = audioCtx.currentTime;
    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    // Warm, soothing frequencies (174Hz Solfeggio / 432Hz harmonic)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(frequency, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 1.5, now); // Warm fifth interval

    // Soft envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 1.2); // Soft attack
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (durationMs / 1000)); // Gentle decay

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + (durationMs / 1000));
    osc2.stop(now + (durationMs / 1000));

    activeOsc1 = osc1;
    activeOsc2 = osc2;
    activeGain = gain;
  } catch (e) {
    console.warn("Audio Context playback unavailable:", e);
  }
}

export function stopCalmSynth() {
  if (activeGain && audioCtx) {
    try {
      activeGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);
      setTimeout(() => {
        if (activeOsc1) { activeOsc1.stop(); activeOsc1 = null; }
        if (activeOsc2) { activeOsc2.stop(); activeOsc2 = null; }
      }, 350);
    } catch {
      // ignore
    }
  }
}

export function speakGroundingPrompt(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd();
    return;
  }

  window.speechSynthesis.cancel(); // Stop any active speech

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.82; // Slow, reassuring pace
  utterance.pitch = 0.92; // Slightly deeper, calming tone
  utterance.volume = 1.0;

  // Try to find a warm English voice
  const voices = window.speechSynthesis.getVoices();
  const calmVoice = voices.find(
    v => (v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen')))
  ) || voices.find(v => v.lang.startsWith('en'));

  if (calmVoice) {
    utterance.voice = calmVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  stopCalmSynth();
}
