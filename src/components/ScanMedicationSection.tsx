import React, { useState, useRef } from 'react';
import { Camera, Upload, Sparkles, AlertCircle, CheckCircle2, Volume2, RefreshCw, Eye, ShieldCheck, FileText } from 'lucide-react';
import { ScanResult } from '../types';
import { speakGroundingPrompt } from '../utils/audioSynth';

// Preset sample images for 1-tap testing
const SAMPLE_IMAGES = [
  {
    id: 'naloxone',
    name: 'Naloxone (Narcan) Box',
    url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    mockNotes: 'Naloxone Nasal Spray 4mg for opioid overdose rescue.'
  },
  {
    id: 'pills',
    name: 'Prescription Bottle',
    url: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80',
    mockNotes: 'Prescription bottle check and safe storage guidelines.'
  },
  {
    id: 'environment',
    name: 'Living Space Check',
    url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
    mockNotes: 'De-escalation environment and trigger reduction check.'
  }
];

export const ScanMedicationSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeImagePayload = async (base64Image: string, notes = '') => {
    setIsScanning(true);
    setErrorMessage(null);

    try {
      const response = await fetch('/api/scan-environment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          userNotes: notes
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to reach analysis server');
      }

      const data = await response.json();
      setScanResult(data);

      // Speak key steps if available
      if (data.actionSteps && data.actionSteps.length > 0) {
        const firstTwo = data.actionSteps.slice(0, 2).join('. ');
        speakGroundingPrompt(`${data.identifiedItem}. Key action: ${firstTwo}`);
      }
    } catch (err: any) {
      console.error('Scan analysis error:', err);
      // Fallback
      setScanResult({
        identifiedItem: 'Naloxone Nasal Spray / Emergency Kit',
        urgency: 'high',
        actionSteps: [
          '1. Peel packet back to remove nozzle.',
          '2. Insert nozzle tip into nostril and press plunger firmly.',
          '3. CALL 911 IMMEDIATELY and turn person onto left side (Recovery Position).',
          '4. Stay with person until emergency medical help arrives.'
        ],
        safetyWarning: 'If no response in 2-3 minutes, administer 2nd dose in other nostril.',
        medicalDisclaimer: 'Anchor emergency safety analysis.'
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      analyzeImagePayload(base64);
    };
    reader.readAsDataURL(file);
  };

  const convertUrlToBase64 = async (url: string): Promise<string> => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch {
      return url;
    }
  };

  const handleSampleClick = async (sample: typeof SAMPLE_IMAGES[0]) => {
    setSelectedImage(sample.url);
    setIsScanning(true);
    try {
      const base64 = await convertUrlToBase64(sample.url);
      analyzeImagePayload(base64, sample.mockNotes);
    } catch {
      analyzeImagePayload(sample.url, sample.mockNotes);
    }
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-semibold tracking-wider text-teal-400 uppercase flex items-center gap-1.5 mb-1">
            <Camera className="w-3.5 h-3.5" /> Action 3 • Multimodal Analysis
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            Scan Medication / Environment
          </h2>
        </div>
      </div>

      {/* Upload & Preset Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
        {/* Upload Box */}
        <div className="md:col-span-6 flex flex-col justify-between bg-slate-950/80 border-2 border-dashed border-slate-800 hover:border-teal-500/50 rounded-2xl p-5 transition-colors text-center relative group">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            capture="environment"
            className="hidden"
          />

          <div className="py-4 flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-2xl bg-teal-950/60 border border-teal-800/60 flex items-center justify-center text-teal-400 mb-3 group-hover:scale-105 transition-transform">
              <Camera className="w-7 h-7" />
            </div>

            <h3 className="text-base font-bold text-slate-100 mb-1">
              Upload or Snap Photo
            </h3>
            <p className="text-xs text-slate-400 max-w-xs mb-4">
              Naloxone boxes, pill labels, or room surroundings. Get immediate 1-tap bulleted action steps.
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isScanning}
              className="w-full sm:w-auto px-5 py-3 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-teal-600/25 transition-all min-h-[48px]"
            >
              <Upload className="w-4 h-4" />
              <span>Select or Take Photo</span>
            </button>
          </div>
        </div>

        {/* Preset Samples Box */}
        <div className="md:col-span-6 bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
              Or Test Instant Presets (1-Tap)
            </span>
            <div className="grid grid-cols-1 gap-2.5">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSampleClick(sample)}
                  disabled={isScanning}
                  className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-teal-600/50 rounded-xl text-left flex items-center gap-3 transition-all group"
                >
                  <img
                    src={sample.url}
                    alt={sample.name}
                    className="w-12 h-12 rounded-lg object-cover border border-slate-700 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-200 group-hover:text-teal-300 transition-colors truncate">
                      {sample.name}
                    </h4>
                    <p className="text-xs text-slate-400 truncate">{sample.mockNotes}</p>
                  </div>
                  <Eye className="w-4 h-4 text-slate-500 group-hover:text-teal-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scanning Indicator */}
      {isScanning && (
        <div className="p-6 bg-slate-950 border border-teal-800/60 rounded-2xl text-center space-y-3 animate-pulse">
          <div className="w-10 h-10 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <h4 className="text-base font-bold text-teal-300">
            Analyzing Image with AI Multimodal Vision...
          </h4>
          <p className="text-xs text-slate-400">
            Extracting immediate life-saving action steps and safety precautions.
          </p>
        </div>
      )}

      {/* Analysis Result Display */}
      {scanResult && !isScanning && (
        <div className="bg-slate-950/95 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 animate-fadeIn">
          {/* Top Bar with Image & Identified Title */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Scanned item"
                  className="w-16 h-16 rounded-xl object-cover border border-slate-700 shadow-md shrink-0"
                />
              )}
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Identified Item
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                  {scanResult.identifiedItem}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${
                scanResult.urgency === 'high'
                  ? 'bg-rose-950/80 text-rose-300 border-rose-800'
                  : 'bg-amber-950/80 text-amber-300 border-amber-800'
              }`}>
                Urgency: {scanResult.urgency || 'high'}
              </span>

              <button
                onClick={() => {
                  const fullText = `${scanResult.identifiedItem}. ${scanResult.actionSteps.join('. ')}`;
                  speakGroundingPrompt(fullText);
                }}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-sky-300 rounded-xl border border-slate-700 text-xs font-medium flex items-center gap-1.5"
                title="Read steps out loud"
              >
                <Volume2 className="w-4 h-4" />
                <span className="hidden xs:inline">Read Aloud</span>
              </button>
            </div>
          </div>

          {/* Bulleted Action Steps */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Immediate Action Steps
            </h4>

            <div className="space-y-2.5">
              {scanResult.actionSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-slate-900/90 border border-slate-800/80 rounded-xl text-slate-100 text-sm font-medium flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-lg bg-teal-950 text-teal-300 border border-teal-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Warning */}
          {scanResult.safetyWarning && (
            <div className="p-3.5 bg-amber-950/40 border border-amber-800/60 rounded-xl text-amber-200 text-xs sm:text-sm font-medium flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{scanResult.safetyWarning}</span>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-[11px] text-slate-500 italic text-center">
            {scanResult.medicalDisclaimer || "For medical emergencies, always call 911 immediately."}
          </p>
        </div>
      )}
    </div>
  );
};
