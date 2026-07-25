export interface ScriptOption {
  id: string;
  title: string;
  recipientLabel: string;
  defaultNumber: string;
  text: string;
  instructions: string[];
}

export interface ScanResult {
  identifiedItem: string;
  urgency: 'high' | 'medium' | 'info';
  confidence?: string;
  actionSteps: string[];
  safetyWarning?: string;
  medicalDisclaimer?: string;
}

export interface EmergencyContact {
  sponsorName: string;
  sponsorPhone: string;
  caregiverName: string;
  caregiverPhone: string;
}

export type BreathingPhase = 'idle' | 'inhale' | 'hold' | 'exhale';

export interface GroundingTechnique {
  id: string;
  name: string;
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
  pauseSec: number;
  defaultPrompt: string;
}
