import React from 'react';
import { Phone, MessageSquare, AlertOctagon, HeartHandshake } from 'lucide-react';

export const SafetyBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t-2 border-rose-600/80 backdrop-blur-xl px-4 py-3 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.8)]">
      <div className="max-w-4xl mx-auto flex flex-col xs:flex-row items-center justify-between gap-2.5">
        
        {/* Urgent Call 911 Button */}
        <a
          href="tel:911"
          className="w-full xs:w-1/2 py-3.5 px-4 bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-rose-950/60 border border-rose-400/30 transition-all transform active:scale-95 min-h-[56px]"
          aria-label="Call 911 Emergency"
        >
          <AlertOctagon className="w-6 h-6 animate-pulse" />
          <span>CALL 911 EMERGENCY</span>
        </a>

        {/* 988 Crisis Lifeline Button */}
        <a
          href="tel:988"
          className="w-full xs:w-1/2 py-3.5 px-4 bg-gradient-to-r from-sky-600 to-indigo-700 hover:from-sky-500 hover:to-indigo-600 text-white rounded-2xl font-extrabold text-base sm:text-lg flex items-center justify-center gap-2.5 shadow-xl shadow-sky-950/60 border border-sky-400/30 transition-all transform active:scale-95 min-h-[56px]"
          aria-label="Call 988 Crisis Lifeline"
        >
          <Phone className="w-5 h-5" />
          <span>CALL 988 CRISIS LINE</span>
        </a>

        {/* Secondary Quick Text 988 & SAMHSA for Desktop/Tablet */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <a
            href="sms:988"
            className="p-3 bg-slate-900 hover:bg-slate-800 text-sky-300 border border-slate-700 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors min-h-[56px]"
            title="Text 988 Crisis Line"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Text 988</span>
          </a>

          <a
            href="tel:18006624357"
            className="p-3 bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700 rounded-2xl text-xs font-bold flex items-center gap-1.5 transition-colors min-h-[56px]"
            title="SAMHSA Substance Abuse Helpline 1-800-662-4357"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>SAMHSA 24/7</span>
          </a>
        </div>

      </div>
    </div>
  );
};
