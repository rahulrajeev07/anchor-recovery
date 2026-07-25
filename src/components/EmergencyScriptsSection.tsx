import React, { useState } from 'react';
import { Copy, Check, Send, AlertTriangle, UserCheck, HeartPulse, ShieldAlert, FileText, ChevronRight } from 'lucide-react';
import { EmergencyContact, ScriptOption } from '../types';
import { Translations } from '../utils/translations';

interface EmergencyScriptsProps {
  contacts: EmergencyContact;
  t: Translations;
}

export const EmergencyScriptsSection: React.FC<EmergencyScriptsProps> = ({ contacts, t }) => {
  const [activeTab, setActiveTab] = useState<'for_me' | 'for_caregiver'>('for_me');
  const [selectedScriptId, setSelectedScriptId] = useState<string>('sponsor_craving');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getForMeScripts = (): ScriptOption[] => [
    {
      id: 'sponsor_craving',
      title: t.scriptSponsorCravingTitle,
      recipientLabel: 'Sponsor / Trusted Contact',
      defaultNumber: '',
      text: t.scriptSponsorCravingText,
      instructions: [
        'Script automatically copied to your clipboard.',
        'Tap "Send SMS" to open messaging with pre-filled text.',
        'Drink cold water and start 4-7-8 breathing.',
        'If no reply in 5 minutes, call 988 directly.'
      ]
    },
    {
      id: 'safety_plan',
      title: t.scriptSafetyPlanTitle,
      recipientLabel: 'Sponsor / Peer Specialist',
      defaultNumber: '',
      text: t.scriptSafetyPlanText,
      instructions: [
        'Script copied to clipboard.',
        'Step away from any triggering environment immediately.',
        'Place hand on heart and focus on slow exhales.'
      ]
    },
    {
      id: 'crisis_988',
      title: t.script988Title,
      recipientLabel: '988 Lifeline',
      defaultNumber: '988',
      text: t.script988Text,
      instructions: [
        'Texting 988 is free, confidential, and 24/7.',
        'A trained crisis counselor will respond quickly.',
        'Stay in a safe, quiet room.'
      ]
    }
  ];

  const getForCaregiverScripts = (): ScriptOption[] => [
    {
      id: 'overdose_alert',
      title: t.scriptOverdoseTitle,
      recipientLabel: 'Emergency Contact / 911',
      defaultNumber: '',
      text: t.scriptOverdoseText,
      instructions: [
        'STEP 1: Call 911 IMMEDIATELY. State: "Unresponsive person, suspected overdose."',
        'STEP 2: Administer Naloxone (Narcan) nasal spray into nostril.',
        'STEP 3: Turn person onto their side in RECOVERY POSITION.',
        'STEP 4: If no response in 2-3 minutes, administer 2nd dose.'
      ]
    },
    {
      id: 'naloxone_given',
      title: t.scriptNaloxoneGivenTitle,
      recipientLabel: 'Family / Support Network',
      defaultNumber: '',
      text: t.scriptNaloxoneGivenText,
      instructions: [
        'Stay with person until paramedics arrive.',
        'Keep airway clear and perform rescue breathing if trained.',
        'Medical evaluation is essential as Naloxone wears off in 30-90 mins.'
      ]
    }
  ];

  const currentScripts = activeTab === 'for_me' ? getForMeScripts() : getForCaregiverScripts();
  const activeScript = currentScripts.find(s => s.id === selectedScriptId) || currentScripts[0];

  const getRecipientPhone = () => {
    if (activeScript.defaultNumber) return activeScript.defaultNumber;
    if (activeTab === 'for_me') return contacts.sponsorPhone || '';
    return contacts.caregiverPhone || '';
  };

  const handleCopy = (script: ScriptOption) => {
    navigator.clipboard.writeText(script.text);
    setCopiedId(script.id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const getSmsUrl = () => {
    const phone = getRecipientPhone();
    const encodedText = encodeURIComponent(activeScript.text);
    return phone ? `sms:${phone}?body=${encodedText}` : `sms:?body=${encodedText}`;
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider text-indigo-400 uppercase flex items-center gap-1.5 mb-1">
            <FileText className="w-3.5 h-3.5" /> {t.scriptsTag}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            {t.scriptsHeading}
          </h2>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 p-1 bg-slate-950/90 rounded-2xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveTab('for_me');
              setSelectedScriptId('sponsor_craving');
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'for_me'
                ? 'bg-sky-600 text-white shadow-lg shadow-sky-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" /> {t.forMeTab}
          </button>
          <button
            onClick={() => {
              setActiveTab('for_caregiver');
              setSelectedScriptId('overdose_alert');
            }}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all ${
              activeTab === 'for_caregiver'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HeartPulse className="w-4 h-4" /> {t.forCaregiverTab}
          </button>
        </div>
      </div>

      {/* Script Selection Chips */}
      <div className="flex flex-wrap gap-2 mb-5">
        {currentScripts.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setSelectedScriptId(s.id);
              handleCopy(s); // Auto-copy on select!
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${
              selectedScriptId === s.id
                ? activeTab === 'for_me'
                  ? 'bg-sky-950/80 border-sky-500 text-sky-200 shadow-md'
                  : 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-md'
                : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <span>{s.title}</span>
            {selectedScriptId === s.id && <ChevronRight className="w-3.5 h-3.5 text-sky-400" />}
          </button>
        ))}
      </div>

      {/* Active Script Card Box */}
      <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className={`w-4 h-4 ${activeTab === 'for_me' ? 'text-sky-400' : 'text-rose-400'}`} />
            <span className="text-xs font-semibold text-slate-300">
              {t.recipientLabel}: <span className="text-white font-bold">{getRecipientPhone() ? `${activeScript.recipientLabel} (${getRecipientPhone()})` : activeScript.recipientLabel}</span>
            </span>
          </div>

          {copiedId === activeScript.id && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full flex items-center gap-1 animate-pulse">
              <Check className="w-3.5 h-3.5" /> {t.autoCopied}
            </span>
          )}
        </div>

        {/* Text Area Content */}
        <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 text-slate-100 font-mono text-sm leading-relaxed relative">
          "{activeScript.text}"
        </div>

        {/* Action Buttons: 1-Tap Copy & 1-Tap Send SMS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <button
            onClick={() => handleCopy(activeScript)}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors min-h-[48px]"
          >
            {copiedId === activeScript.id ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-sky-400" />
                <span>{t.copyText}</span>
              </>
            )}
          </button>

          <a
            href={getSmsUrl()}
            onClick={() => handleCopy(activeScript)}
            className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg min-h-[48px] text-white ${
              activeTab === 'for_me'
                ? 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 shadow-sky-600/25'
                : 'bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 shadow-rose-600/25'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{t.sendSms}</span>
          </a>
        </div>

        {/* Step-by-Step Guidance */}
        <div className="mt-4 pt-4 border-t border-slate-800/80">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            {t.stepByStepTitle}
          </h4>

          <ul className="space-y-2">
            {activeScript.instructions.map((step, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  activeTab === 'for_me' ? 'bg-sky-950 text-sky-400 border border-sky-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {idx + 1}
                </span>
                <span className="leading-snug">{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
