import React from 'react';
import { ShieldAlert, Settings, Volume2, Globe } from 'lucide-react';
import { Language, Translations } from '../utils/translations';

interface HeaderProps {
  onOpenSettings: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  t: Translations;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSettings,
  isAudioMuted,
  onToggleAudio,
  language,
  onLanguageChange,
  t,
}) => {
  return (
    <header className="w-full bg-slate-900/90 border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-30 px-4 py-3 sm:px-6">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 p-0.5 flex items-center justify-center shadow-lg shadow-sky-500/10">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-sky-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-slate-100 flex items-center gap-1.5">
                {t.appName} <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-sky-950/80 text-sky-300 border border-sky-800/50 hidden sm:inline-block">{t.appBadge}</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium hidden sm:block">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Calm Status & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Quick Toggle Switcher */}
          <div className="flex items-center bg-slate-950/90 border border-slate-800 rounded-xl p-0.5">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => onLanguageChange('ml')}
              className={`px-2 py-1 text-xs font-bold rounded-lg transition-all ${
                language === 'ml'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="മലയാളത്തിലേക്ക് മാറ്റുക"
            >
              മലയാളം
            </button>
          </div>

          {/* Mute/Unmute Quick Toggle */}
          <button
            onClick={onToggleAudio}
            className={`p-2.5 rounded-xl border transition-all text-xs font-medium flex items-center gap-1.5 ${
              isAudioMuted
                ? 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800'
                : 'bg-sky-950/40 border-sky-800/60 text-sky-300 hover:bg-sky-900/40'
            }`}
            title={isAudioMuted ? t.audioMutedTooltip : t.audioActiveTooltip}
            aria-label="Toggle grounding audio"
          >
            <Volume2 className={`w-4 h-4 ${isAudioMuted ? 'opacity-40' : 'text-sky-400'}`} />
          </button>

          {/* Settings / Contacts Modal Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-700/80 transition-colors"
            title={t.settingsTitle}
            aria-label="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
