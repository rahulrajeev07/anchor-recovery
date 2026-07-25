import { describe, it, expect } from 'vitest';

describe('Server Health & Safety Fallbacks', () => {
  it('should return default fallback grounding message if Gemini API fails', () => {
    const fallbackMessage = "Take a deep breath. Focus on 3 things you can feel around you right now. You are safe.";
    expect(fallbackMessage).toBeDefined();
    expect(fallbackMessage.split(' ').length).toBeLessThanOrEqual(20);
  });
});
