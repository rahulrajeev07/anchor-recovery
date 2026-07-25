import { describe, it, expect } from 'vitest';
import { ScriptOption, ScanResult, EmergencyContact, GroundingTechnique } from './types';

describe('Anchor Types & Data Structures', () => {
  it('validates ScriptOption data contract', () => {
    const script: ScriptOption = {
      id: 'sponsor_craving',
      title: 'Distress Alert',
      recipientLabel: 'Sponsor',
      defaultNumber: '555-0199',
      text: 'I am experiencing an intense craving right now.',
      instructions: ['Script copied to clipboard', 'Send SMS immediately']
    };

    expect(script.id).toBe('sponsor_craving');
    expect(script.instructions.length).toBeGreaterThan(0);
    expect(script.text).toContain('craving');
  });

  it('validates ScanResult schema contract', () => {
    const scanResult: ScanResult = {
      identifiedItem: 'Naloxone (Narcan) Nasal Spray',
      urgency: 'high',
      actionSteps: [
        'Peel packet back',
        'Insert tip into nostril',
        'Press plunger firmly',
        'Call 911 immediately'
      ],
      safetyWarning: 'Administer second dose if no response in 2 minutes',
      medicalDisclaimer: 'Call 911 for medical emergencies'
    };

    expect(scanResult.urgency).toBe('high');
    expect(scanResult.actionSteps.length).toBe(4);
    expect(scanResult.identifiedItem).toContain('Naloxone');
  });

  it('validates EmergencyContact storage structure', () => {
    const contacts: EmergencyContact = {
      sponsorName: 'Sarah',
      sponsorPhone: '555-123-4567',
      caregiverName: 'John',
      caregiverPhone: '555-987-6543'
    };

    expect(contacts.sponsorName).toBe('Sarah');
    expect(contacts.caregiverPhone).toBe('555-987-6543');
  });

  it('validates GroundingTechnique timing settings', () => {
    const technique: GroundingTechnique = {
      id: '478',
      name: '4-7-8 Calm Breath',
      inhaleSec: 4,
      holdSec: 7,
      exhaleSec: 8,
      pauseSec: 1,
      defaultPrompt: 'Take a deep breath.'
    };

    expect(technique.inhaleSec + technique.holdSec + technique.exhaleSec).toBe(19);
  });
});
