import React, { useState } from 'react';
import { Activity, Flame, ShieldAlert, Sparkles, Check } from 'lucide-react';
import { speakGroundingPrompt } from '../utils/audioSynth';

export const QuickCravingCheck: React.FC = () => {
  const [cravingLevel, setCravingLevel] = useState<number | null>(null);

  const handleSelectLevel = (level: number) => {
    setCravingLevel(level);

    if (level >= 8) {
      speakGroundingPrompt("High distress detected. Tap the center de-escalation button or text 988 immediately. You are not alone.");
    } else if (level >= 5) {
      speakGroundingPrompt("Moderate craving logged. Take 3 deep breaths and send your Sponsor text script.");
    } else {
      speakGroundingPrompt("Mild craving noted. Stay anchored, drink water, and keep breathing.");
    }
  };

  return (
    <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> 1-Tap Distress & Craving Assessment
          </span>
          <h3 className="text-sm sm:text-base font-bold text-slate-200">
            Current Craving / Distress Level (1 - 10)
          </h3>
        </div>

        {cravingLevel !== null && (
          <span className={`px-3 py-1 rounded-full text-xs font-bold border self-start sm:self-auto ${
            cravingLevel >= 8
              ? 'bg-rose-950 text-rose-300 border-rose-800'
              : cravingLevel >= 5
              ? 'bg-amber-950 text-amber-300 border-amber-800'
              : 'bg-emerald-950 text-emerald-300 border-emerald-800'
          }`}>
            Logged Level: {cravingLevel}/10
          </span>
        )}
      </div>

      {/* 1 to 10 Scale Buttons */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 sm:gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
          const isSelected = cravingLevel === num;
          let colorClass = "bg-slate-950/80 text-slate-300 border-slate-800 hover:border-sky-500";
          if (num >= 8) {
            colorClass = isSelected ? "bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/30" : "bg-slate-950/80 text-rose-300 border-slate-800 hover:border-rose-500";
          } else if (num >= 5) {
            colorClass = isSelected ? "bg-amber-600 text-white border-amber-400 shadow-lg shadow-amber-600/30" : "bg-slate-950/80 text-amber-300 border-slate-800 hover:border-amber-500";
          } else {
            colorClass = isSelected ? "bg-sky-600 text-white border-sky-400 shadow-lg shadow-sky-600/30" : "bg-slate-950/80 text-sky-300 border-slate-800 hover:border-sky-500";
          }

          return (
            <button
              key={num}
              onClick={() => handleSelectLevel(num)}
              className={`py-2.5 sm:py-3 rounded-xl font-bold text-sm border transition-all flex flex-col items-center justify-center ${colorClass}`}
            >
              <span>{num}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
