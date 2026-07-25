import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DeescalationSection } from './components/DeescalationSection';
import { EmergencyScriptsSection } from './components/EmergencyScriptsSection';
import { ScanMedicationSection } from './components/ScanMedicationSection';
import { SafetyBar } from './components/SafetyBar';
import { QuickCravingCheck } from './components/QuickCravingCheck';
import { SettingsModal } from './components/SettingsModal';
import { EmergencyContact } from './types';
import { ShieldCheck } from 'lucide-react';
import { Language, translations } from './utils/translations';

const STORAGE_KEY = 'anchor_emergency_contacts';
const LANG_STORAGE_KEY = 'anchor_language';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact>({
    sponsorName: '',
    sponsorPhone: '',
    caregiverName: '',
    caregiverPhone: '',
  });

  // Load stored language and contacts
  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(LANG_STORAGE_KEY) as Language;
      if (savedLang && (savedLang === 'en' || savedLang === 'ml')) {
        setLanguage(savedLang);
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setContacts(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {
      // ignore
    }
  };

  const handleSaveContacts = (updated: EmergencyContact) => {
    setContacts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white flex flex-col relative pb-36">
      {/* Background soft ambient noise/gradient */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))] pointer-events-none" />

      {/* Header */}
      <Header
        onOpenSettings={() => setIsSettingsOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={() => setIsAudioMuted(!isAudioMuted)}
        language={language}
        onLanguageChange={handleLanguageChange}
        t={t}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 pt-6 pb-8 space-y-6 sm:space-y-8 relative z-10">
        
        {/* Quick De-escalation Banner / assessment */}
        <QuickCravingCheck t={t} />

        {/* Action 1: Center De-escalation Button & Breathing Circle */}
        <DeescalationSection isMuted={isAudioMuted} t={t} />

        {/* Action 2: Emergency Scripts Generator (For Me / Caregiver) */}
        <EmergencyScriptsSection contacts={contacts} t={t} />

        {/* Action 3: Multimodal Medication / Environment Scanner */}
        <ScanMedicationSection t={t} language={language} />

        {/* Footer info & medical reassurance */}
        <footer className="pt-6 pb-4 border-t border-slate-900 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>{t.footerSafety}</span>
          </div>
          <p className="text-[11px] text-slate-500 max-w-md mx-auto leading-relaxed">
            {t.footerDisclaimer}
          </p>
        </footer>
      </main>

      {/* Safety Bar (Hardcoded at Bottom) */}
      <SafetyBar t={t} />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        contacts={contacts}
        onSaveContacts={handleSaveContacts}
        t={t}
      />
    </div>
  );
}
