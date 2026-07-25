import { describe, it, expect, vi, beforeEach } from 'vitest';
import { playCalmSynthTone, stopCalmSynth, speakGroundingPrompt, stopSpeech } from './audioSynth';

describe('audioSynth module', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('handles playCalmSynthTone without crashing when AudioContext is missing or present', () => {
    expect(() => playCalmSynthTone(174, 1000)).not.toThrow();
  });

  it('handles stopCalmSynth cleanly', () => {
    expect(() => stopCalmSynth()).not.toThrow();
  });

  it('handles speakGroundingPrompt safely when window.speechSynthesis is stubbed', () => {
    const mockSpeak = vi.fn();
    const mockCancel = vi.fn();
    const mockGetVoices = vi.fn().mockReturnValue([]);

    const mockSpeechSynthesis = {
      speak: mockSpeak,
      cancel: mockCancel,
      getVoices: mockGetVoices,
    };

    vi.stubGlobal('window', {
      speechSynthesis: mockSpeechSynthesis
    });

    vi.stubGlobal('SpeechSynthesisUtterance', class {
      text: string;
      rate = 1;
      pitch = 1;
      volume = 1;
      voice = null;
      constructor(text: string) {
        this.text = text;
      }
    });

    speakGroundingPrompt('Take a deep breath and stay calm');
    expect(mockCancel).toHaveBeenCalled();
    expect(mockSpeak).toHaveBeenCalled();
  });

  it('handles stopSpeech gracefully', () => {
    const mockCancel = vi.fn();
    vi.stubGlobal('window', {
      speechSynthesis: { cancel: mockCancel }
    });
    expect(() => stopSpeech()).not.toThrow();
    expect(mockCancel).toHaveBeenCalled();
  });
});
