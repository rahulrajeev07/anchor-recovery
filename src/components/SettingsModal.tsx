import React, { useState } from 'react';
import { X, Save, User, Phone, ShieldCheck, Heart } from 'lucide-react';
import { EmergencyContact } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContact;
  onSaveContacts: (contacts: EmergencyContact) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  contacts,
  onSaveContacts,
}) => {
  const [formData, setFormData] = useState<EmergencyContact>(contacts);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveContacts(formData);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-5 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-950 text-sky-400 rounded-2xl border border-sky-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Emergency Contacts</h3>
            <p className="text-xs text-slate-400">
              Preset your sponsor or caregiver phone numbers for 1-tap SMS scripts.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Sponsor Details */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" /> Sponsor / Peer Specialist
            </h4>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">
                Sponsor Name
              </label>
              <input
                type="text"
                placeholder="e.g., Alex (Sponsor)"
                value={formData.sponsorName}
                onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">
                Sponsor Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g., 555-123-4567"
                value={formData.sponsorPhone}
                onChange={(e) => setFormData({ ...formData, sponsorPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Caregiver Details */}
          <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-3">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5" /> Caregiver / Emergency Contact
            </h4>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">
                Caregiver Name
              </label>
              <input
                type="text"
                placeholder="e.g., Family Member / Caregiver"
                value={formData.caregiverName}
                onChange={(e) => setFormData({ ...formData, caregiverName: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">
                Caregiver Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g., 555-987-6543"
                value={formData.caregiverPhone}
                onChange={(e) => setFormData({ ...formData, caregiverPhone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-sky-600/30 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{savedSuccess ? 'Contacts Saved!' : 'Save Contacts'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
