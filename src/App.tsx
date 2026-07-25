import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DeescalationSection } from './components/DeescalationSection';
import { EmergencyScriptsSection } from './components/EmergencyScriptsSection';
import { ScanMedicationSection } from './components/ScanMedicationSection';
import { SafetyBar } from './components/SafetyBar';
import { QuickCravingCheck } from './components/QuickCravingCheck';
import { SettingsModal } from './components/SettingsModal';
import { EmergencyContact } from './types';
import { ShieldCheck, Heart, Info, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'anchor_emergency_contacts';

export default function App() {
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact>({
    sponsorName: '',
    sponsorPhone: '',
    caregiverName: '',
    caregiverPhone: '',
  });

  // Load stored contacts
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setContacts(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveContacts = (updated: EmergencyContact) => {
    setContacts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white flex flex-col relative pb-36">
      {/* Background soft ambient noise/gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Header */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={() => setIsAudioMuted(!isAudioMuted)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-6 pb-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Quick De-escalation Banner / assessment */}
        <QuickCravingCheck />

        {/* Action 1: Center De-escalation Button & Breathing Circle */}
        <DeescalationSection isMuted={isAudioMuted} />

        {/* Action 2: Emergency Scripts Generator (For Me / Caregiver) */}
        <EmergencyScriptsSection contacts={contacts} />

        {/* Action 3: Multimodal Medication / Environment Scanner */}
        <ScanMedicationSection />

        {/* Footer info & medical reassurance */}
        <footer className="pt-6 pb-4 border-t border-slate-900 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Anchor Crisis Intervention • Confidential & Safe</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
            If you or someone you know is in immediate life-threatening danger, call 911 or visit the nearest emergency department immediately.
          </p>
        </footer>
      </main>

      {/* Safety Bar (Hardcoded at Bottom) */}
      <SafetyBar />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        contacts={contacts}
        onSaveContacts={handleSaveContacts}
      />
    </div>
  );
}
