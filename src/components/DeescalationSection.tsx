import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Volume2, Play, Square, RefreshCw, Sparkles, Heart, Waves } from 'lucide-react';
import { playCalmSynthTone, stopCalmSynth, speakGroundingPrompt, stopSpeech } from '../utils/audioSynth';
import { BreathingPhase, GroundingTechnique } from '../types';

const TECHNIQUES: GroundingTechnique[] = [
  {
    id: '478',
    name: '4-7-8 Calm Breath',
    inhaleSec: 4,
    holdSec: 7,
    exhaleSec: 8,
    pauseSec: 1,
    defaultPrompt: 'Take a deep breath. Focus on 3 things you can feel around you right now. You are safe.',
  },
  {
    id: '54321',
    name: '5-4-3-2-1 Grounding',
    inhaleSec: 5,
    holdSec: 5,
    exhaleSec: 5,
    pauseSec: 2,
    defaultPrompt: 'Look around. Name 5 things you can see, 4 you can touch, and feel your feet firmly on the ground.',
  },
  {
    id: 'box',
    name: 'Box Breathing 4x4',
    inhaleSec: 4,
    holdSec: 4,
    exhaleSec: 4,
    pauseSec: 4,
    defaultPrompt: 'Breathe in slowly. Hold steady. Let it out slowly. Feel yourself anchored in this moment.',
  },
];

interface DeescalationProps {
  isMuted: boolean;
  onTriggerAlert?: () => void;
}

export const DeescalationSection: React.FC<DeescalationProps> = ({ isMuted }) => {
  const [selectedTech, setSelectedTech] = useState<GroundingTechnique>(TECHNIQUES[0]);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>('idle');
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [currentPrompt, setCurrentPrompt] = useState<string>(TECHNIQUES[0].defaultPrompt);
  const [cycleCount, setCycleCount] = useState(0);
  const [isHoldingToSpeak, setIsHoldingToSpeak] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update prompt when technique changes
  useEffect(() => {
    setCurrentPrompt(selectedTech.defaultPrompt);
  }, [selectedTech]);

  // Main breathing timer loop
  useEffect(() => {
    if (!isActive) {
      setPhase('idle');
      setSecondsLeft(0);
      stopCalmSynth();
      stopSpeech();
      return;
    }

    let isMounted = true;

    const runPhase = (newPhase: BreathingPhase, duration: number, nextPhaseRunner: () => void) => {
      if (!isMounted) return;
      setPhase(newPhase);
      setSecondsLeft(duration);

      // Audio feedback per phase
      if (!isMuted) {
        if (newPhase === 'inhale') {
          playCalmSynthTone(174, duration * 1000);
        } else if (newPhase === 'hold') {
          playCalmSynthTone(220, duration * 1000);
        } else if (newPhase === 'exhale') {
          playCalmSynthTone(147, duration * 1000);
        }
      }

      let remaining = duration;
      const interval = setInterval(() => {
        remaining -= 1;
        if (remaining <= 0) {
          clearInterval(interval);
          nextPhaseRunner();
        } else {
          setSecondsLeft(remaining);
        }
      }, 1000);

      timerRef.current = interval as unknown as NodeJS.Timeout;
    };

    const startCycle = () => {
      // Inhale phase
      runPhase('inhale', selectedTech.inhaleSec, () => {
        // Hold phase
        runPhase('hold', selectedTech.holdSec, () => {
          // Exhale phase
          runPhase('exhale', selectedTech.exhaleSec, () => {
            setCycleCount(c => c + 1);
            // Loop automatically
            if (isMounted && isActive) {
              startCycle();
            }
          });
        });
      });
    };

    startCycle();

    return () => {
      isMounted = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, selectedTech, isMuted]);

  // Handle tap or hold to activate
  const handleStartDeescalation = () => {
    if (isActive) {
      setIsActive(false);
      stopSpeech();
      stopCalmSynth();
    } else {
      setIsActive(true);
      setCycleCount(1);
      // Play 15-word calm vocal grounding prompt
      if (!isMuted) {
        speakGroundingPrompt(currentPrompt);
      }
    }
  };

  // Hold to speak / distress simulation
  const handleTouchStart = () => {
    setIsHoldingToSpeak(true);
  };

  const handleTouchEnd = () => {
    if (isHoldingToSpeak) {
      setIsHoldingToSpeak(false);
      if (!isActive) {
        handleStartDeescalation();
      }
    }
  };

  const getPhaseColor = () => {
    switch (phase) {
      case 'inhale':
        return 'from-sky-500/30 to-teal-500/30 text-sky-300 border-sky-400/50 shadow-sky-500/20';
      case 'hold':
        return 'from-amber-500/30 to-indigo-500/30 text-amber-300 border-amber-400/50 shadow-amber-500/20';
      case 'exhale':
        return 'from-emerald-500/30 to-blue-500/30 text-emerald-300 border-emerald-400/50 shadow-emerald-500/20';
      default:
        return 'from-sky-600/20 to-indigo-600/20 text-slate-200 border-sky-500/30 shadow-sky-900/30';
    }
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe In Deeply...';
      case 'hold':
        return 'Hold Your Breath Gently...';
      case 'exhale':
        return 'Release & Breathe Out...';
      default:
        return 'Tap or Hold for De-escalation';
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-xl">
      {/* Background ambient gradient glow */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider text-sky-400 uppercase flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Action 1 • Zero-Typing Grounding
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Hold to Speak / Tap for De-escalation
          </h2>
        </div>

        {/* Technique Switcher Pills */}
        <div className="flex items-center gap-1.5 bg-slate-950/80 p-1 rounded-2xl border border-slate-800 self-start sm:self-auto">
          {TECHNIQUES.map((tech) => (
            <button
              key={tech.id}
              onClick={() => {
                setSelectedTech(tech);
                if (isActive) {
                  setIsActive(false);
                  setTimeout(() => setIsActive(true), 100);
                }
              }}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-xl transition-all ${
                selectedTech.id === tech.id
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {tech.id === '478' ? '4-7-8' : tech.id === '54321' ? '5-4-3-2-1' : 'Box 4x4'}
            </button>
          ))}
        </div>
      </div>

      {/* Center 1-Tap / Hold De-escalation Interactive Circle */}
      <div className="flex flex-col items-center justify-center my-4 sm:my-8">
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
          {/* Animated Outer Pulse Rings when active */}
          {isActive && (
            <>
              <motion.div
                animate={{
                  scale: phase === 'inhale' ? [1, 1.35] : phase === 'hold' ? 1.35 : [1.35, 1],
                  opacity: phase === 'hold' ? 0.6 : [0.2, 0.5, 0.2],
                }}
                transition={{
                  duration: phase === 'inhale' ? selectedTech.inhaleSec : phase === 'hold' ? selectedTech.holdSec : selectedTech.exhaleSec,
                  ease: 'easeInOut',
                }}
                className={`absolute inset-0 rounded-full border-2 border-sky-400/30 ${
                  phase === 'inhale' ? 'bg-sky-500/10' : phase === 'hold' ? 'bg-amber-500/10' : 'bg-emerald-500/10'
                }`}
              />
              <motion.div
                animate={{
                  scale: phase === 'inhale' ? [0.9, 1.2] : phase === 'hold' ? 1.2 : [1.2, 0.9],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: phase === 'inhale' ? selectedTech.inhaleSec : phase === 'hold' ? selectedTech.holdSec : selectedTech.exhaleSec,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute inset-2 rounded-full border border-indigo-400/20 bg-indigo-500/5"
              />
            </>
          )}

          {/* Main Breathing Button Circle */}
          <motion.button
            onClick={handleStartDeescalation}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            animate={{
              scale: isActive
                ? phase === 'inhale'
                  ? 1.15
                  : phase === 'hold'
                  ? 1.15
                  : 0.95
                : 1,
            }}
            transition={{
              duration: isActive
                ? phase === 'inhale'
                  ? selectedTech.inhaleSec
                  : phase === 'hold'
                  ? selectedTech.holdSec
                  : selectedTech.exhaleSec
                : 0.3,
              ease: 'easeInOut',
            }}
            whileHover={{ scale: isActive ? undefined : 1.03 }}
            whileTap={{ scale: 0.96 }}
            className={`w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-b border-2 flex flex-col items-center justify-center p-6 text-center cursor-pointer select-none transition-shadow duration-500 ${getPhaseColor()}`}
            aria-label={isActive ? "Stop grounding exercise" : "Start de-escalation grounding"}
          >
            {/* Inner Icon */}
            <div className="mb-2">
              {isActive ? (
                <div className="w-12 h-12 rounded-full bg-slate-950/60 border border-slate-700/60 flex items-center justify-center">
                  <span className="text-2xl font-bold text-slate-100">{secondsLeft}s</span>
                </div>
              ) : (
                <div className="w-14 h-14 rounded-full bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-300">
                  <Mic className="w-7 h-7" />
                </div>
              )}
            </div>

            {/* Instruction Label */}
            <h3 className="text-base sm:text-lg font-bold tracking-tight text-white px-2 leading-tight mb-1">
              {getPhaseInstruction()}
            </h3>

            <p className="text-xs text-slate-300 font-medium max-w-[170px] line-clamp-2">
              {isActive
                ? `Cycle ${cycleCount} • ${selectedTech.name}`
                : "Tap once or hold down to stream audio grounding prompt"}
            </p>
          </motion.button>
        </div>
      </div>

      {/* 15-Word Grounding Voice Text Box */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 bg-slate-950/80 border border-slate-800 rounded-2xl p-4 text-center relative"
          role="region"
          aria-live="assertive"
          aria-label="De-escalation grounding voice prompt"
        >
          <div className="flex items-center justify-center gap-2 mb-1">
            <Waves className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="text-xs font-semibold text-sky-400 tracking-wide uppercase">
              Audio Grounding Prompt
            </span>
          </div>
          <p className="text-base sm:text-lg font-medium text-slate-100 italic leading-relaxed max-w-xl mx-auto">
            "{currentPrompt}"
          </p>

          <div className="mt-3 flex items-center justify-center gap-2">
            <button
              onClick={() => speakGroundingPrompt(currentPrompt)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-xl text-xs font-medium flex items-center gap-1.5 border border-slate-700 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" /> Replay Voice Prompt
            </button>
            <button
              onClick={handleStartDeescalation}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-1.5 border transition-colors ${
                isActive
                  ? 'bg-rose-950/50 border-rose-800/80 text-rose-300 hover:bg-rose-900/60'
                  : 'bg-sky-600/80 border-sky-500/80 text-white hover:bg-sky-600'
              }`}
            >
              {isActive ? <Square className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isActive ? 'Stop Exercise' : 'Start 4-7-8 Loop'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
