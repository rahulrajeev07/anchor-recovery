export type Language = 'en' | 'ml';

export interface Translations {
  appName: string;
  appBadge: string;
  appSubtitle: string;
  statusReady: string;
  statusReadyShort: string;
  audioMutedTooltip: string;
  audioActiveTooltip: string;
  settingsTitle: string;

  // Assessment
  assessmentTag: string;
  assessmentHeading: string;
  loggedLevel: string;
  highDistressPrompt: string;
  medDistressPrompt: string;
  lowDistressPrompt: string;

  // Deescalation
  deescalationTag: string;
  holdToSpeakHeading: string;
  breatheIn: string;
  holdGently: string;
  releaseExhale: string;
  tapOrHold: string;
  audioGroundingLabel: string;
  replayVoice: string;
  stopExercise: string;
  start478Loop: string;
  cycle: string;

  // Techniques
  tech478Prompt: string;
  tech54321Prompt: string;
  techBoxPrompt: string;

  // Emergency Scripts
  scriptsTag: string;
  scriptsHeading: string;
  forMeTab: string;
  forCaregiverTab: string;
  autoCopied: string;
  copyText: string;
  copied: string;
  sendSms: string;
  stepByStepTitle: string;
  recipientLabel: string;

  // Scripts content
  scriptSponsorCravingTitle: string;
  scriptSponsorCravingText: string;
  scriptSafetyPlanTitle: string;
  scriptSafetyPlanText: string;
  script988Title: string;
  script988Text: string;
  scriptOverdoseTitle: string;
  scriptOverdoseText: string;
  scriptNaloxoneGivenTitle: string;
  scriptNaloxoneGivenText: string;

  // Scan
  scanTag: string;
  scanHeading: string;
  uploadTitle: string;
  uploadSub: string;
  selectPhotoBtn: string;
  presetsTitle: string;
  scanningText: string;
  identifiedItem: string;
  urgency: string;
  readAloud: string;
  actionStepsTitle: string;

  // Safety Bar
  call911: string;
  call988: string;
  text988: string;
  samhsa: string;

  // Settings
  contactsAndSettings: string;
  contactsSub: string;
  languageSelectLabel: string;
  englishOption: string;
  malayalamOption: string;
  sponsorHeader: string;
  sponsorNameLabel: string;
  sponsorPhoneLabel: string;
  caregiverHeader: string;
  caregiverNameLabel: string;
  caregiverPhoneLabel: string;
  saveSettingsBtn: string;
  savedSuccess: string;

  // Footer
  footerTitle: string;
  footerDisclaimer: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: "Anchor",
    appBadge: "Recovery",
    appSubtitle: "Zero-Typing De-escalation & Crisis Intervention",
    statusReady: "Connected & Ready",
    statusReadyShort: "Ready",
    audioMutedTooltip: "Audio Muted - Tap to enable voice grounding",
    audioActiveTooltip: "Audio Active",
    settingsTitle: "Configure Settings & Language",

    assessmentTag: "1-Tap Distress & Craving Assessment",
    assessmentHeading: "Current Craving / Distress Level (1 - 10)",
    loggedLevel: "Logged Level",
    highDistressPrompt: "High distress detected. Tap the center de-escalation button or text 988 immediately. You are not alone.",
    medDistressPrompt: "Moderate craving logged. Take 3 deep breaths and send your Sponsor text script.",
    lowDistressPrompt: "Mild craving noted. Stay anchored, drink water, and keep breathing.",

    deescalationTag: "Action 1 • Zero-Typing Grounding",
    holdToSpeakHeading: "Hold to Speak / Tap for De-escalation",
    breatheIn: "Breathe In Deeply...",
    holdGently: "Hold Your Breath Gently...",
    releaseExhale: "Release & Breathe Out...",
    tapOrHold: "Tap or Hold for De-escalation",
    audioGroundingLabel: "Audio Grounding Prompt",
    replayVoice: "Replay Voice Prompt",
    stopExercise: "Stop Exercise",
    start478Loop: "Start 4-7-8 Loop",
    cycle: "Cycle",

    tech478Prompt: "Take a deep breath. Focus on 3 things you can feel around you right now. You are safe.",
    tech54321Prompt: "Look around. Name 5 things you can see, 4 you can touch, and feel your feet firmly on the ground.",
    techBoxPrompt: "Breathe in slowly. Hold steady. Let it out slowly. Feel yourself anchored in this moment.",

    scriptsTag: "Action 2 • 1-Tap Emergency Scripts",
    scriptsHeading: "Ready-to-Send SMS & Guidance",
    forMeTab: "For Me (Sponsor/988)",
    forCaregiverTab: "For Caregiver (Naloxone)",
    autoCopied: "Auto-Copied to Clipboard!",
    copyText: "1-Tap Copy Text",
    copied: "Copied!",
    sendSms: "1-Tap Send SMS",
    stepByStepTitle: "Step-by-Step Action Instructions",
    recipientLabel: "Recipient",

    scriptSponsorCravingTitle: "Distress / Craving Alert",
    scriptSponsorCravingText: "I am experiencing an intense craving/distress right now and need support. Please call or text me as soon as you get this.",
    scriptSafetyPlanTitle: "Sponsor Safety Plan Check-In",
    scriptSafetyPlanText: "Hey, I am reaching out because I'm in a high-risk situation right now and need to review my recovery safety plan with you.",
    script988Title: "988 Crisis Line Text",
    script988Text: "I need immediate support right now for recovery and intense substance use cravings.",
    scriptOverdoseTitle: "Overdose Emergency Alert",
    scriptOverdoseText: "EMERGENCY: Overdose suspected at my location. Calling 911 now and preparing Naloxone (Narcan).",
    scriptNaloxoneGivenTitle: "Naloxone Administered Update",
    scriptNaloxoneGivenText: "ALERT: 1 dose of Naloxone (Narcan) nasal spray has been administered. 911 has been contacted and paramedics are en route.",

    scanTag: "Action 3 • Multimodal Analysis",
    scanHeading: "Scan Medication / Environment",
    uploadTitle: "Upload or Snap Photo",
    uploadSub: "Naloxone boxes, pill labels, or room surroundings. Get immediate 1-tap bulleted action steps.",
    selectPhotoBtn: "Select or Take Photo",
    presetsTitle: "Or Test Instant Presets (1-Tap)",
    scanningText: "Analyzing Image with AI Multimodal Vision...",
    identifiedItem: "Identified Item",
    urgency: "Urgency",
    readAloud: "Read Aloud",
    actionStepsTitle: "Immediate Action Steps",

    call911: "CALL 911 EMERGENCY",
    call988: "CALL 988 CRISIS LINE",
    text988: "Text 988",
    samhsa: "SAMHSA 24/7",

    contactsAndSettings: "Emergency Contacts & Settings",
    contactsSub: "Preset your sponsor/caregiver numbers and select app language.",
    languageSelectLabel: "App Language / ആപ്പിന്റെ ഭാഷ",
    englishOption: "English",
    malayalamOption: "മലയാളം (Malayalam)",
    sponsorHeader: "Sponsor / Peer Specialist",
    sponsorNameLabel: "Sponsor Name",
    sponsorPhoneLabel: "Sponsor Phone Number",
    caregiverHeader: "Caregiver / Emergency Contact",
    caregiverNameLabel: "Caregiver Name",
    caregiverPhoneLabel: "Caregiver Phone Number",
    saveSettingsBtn: "Save Settings",
    savedSuccess: "Settings Saved!",

    footerTitle: "Anchor Crisis Intervention • Confidential & Safe",
    footerDisclaimer: "If you or someone you know is in immediate life-threatening danger, call 911 or visit the nearest emergency department immediately."
  },
  ml: {
    appName: "ആങ്കർ",
    appBadge: "റിക്കവറി",
    appSubtitle: "സീറോ-ടൈപ്പിംഗ് വിഷമതാ നിവാരണവും അടിയന്തര സഹായവും",
    statusReady: "കണക്റ്റുചെയ്‌തു സജ്ജമാണ്",
    statusReadyShort: "സജ്ജമാണ്",
    audioMutedTooltip: "ശബ്ദം നിശബ്ദമാക്കി - വോയ്സ് ഓൺ ചെയ്യാൻ ടാപ്പ് ചെയ്യുക",
    audioActiveTooltip: "ശബ്ദം പ്രവർത്തിക്കുന്നു",
    settingsTitle: "ക്രമീകരണങ്ങളും ഭാഷയും തെരഞ്ഞെടുക്കുക",

    assessmentTag: "1-ടാപ്പ് അടിയന്തര & ക്രേവിംഗ് വിലയിരുത്തൽ",
    assessmentHeading: "നിലവിലെ ക്രേവിംഗ് / വിഷമത നില (1 - 10)",
    loggedLevel: "രേഖപ്പെടുത്തിയ നില",
    highDistressPrompt: "അതിതീവ്രമായ വിഷമം കണ്ടെത്തുകയുണ്ടായി. മധ്യത്തിലെ ബട്ടണിൽ ടാപ്പ് ചെയ്യുക അല്ലെങ്കിൽ 988 ലേക്ക് മെസ്സേജ് അയക്കുക. നിങ്ങൾ ഒറ്റയ്ക്കല്ല.",
    medDistressPrompt: "മിതമായ ക്രേവിംഗ് രേഖപ്പെടുത്തി. 3 തവണ ദീർഘശ്വാസമെടുക്കുക, സ്പോൺസർക്ക് സന്ദേശമയക്കുക.",
    lowDistressPrompt: "ചെറിയ ക്രേവിംഗ് രേഖപ്പെടുത്തി. ശാന്തമായിരിക്കുക, വെള്ളം കുടിക്കുക, ശ്വാസമെടുക്കുന്നത് തുടരുക.",

    deescalationTag: "നടപടി 1 • ടൈപ്പിംഗ് ഇല്ലാത്ത ഗ്രൗണ്ടിംഗ്",
    holdToSpeakHeading: "സംസാരിക്കാൻ അമർത്തിപ്പിടിക്കുക / ടാപ്പ് ചെയ്യുക",
    breatheIn: "ആഴത്തിൽ ശ്വാസമെടുക്കുക...",
    holdGently: "ശ്വാസം ചെറുതായി അടക്കിപ്പിടിക്കുക...",
    releaseExhale: "മെല്ലെ ശ്വാസം പുറത്തുവിടുക...",
    tapOrHold: "ആശ്വാസത്തിനായി ടാപ്പ് ചെയ്യുക",
    audioGroundingLabel: "വോയ്സ് ഗ്രൗണ്ടിംഗ് ഉപദേശം",
    replayVoice: "വോയ്സ് വീണ്ടും കേൾക്കുക",
    stopExercise: "വ്യായാമം നിർത്തുക",
    start478Loop: "4-7-8 വ്യായാമം ആരംഭിക്കുക",
    cycle: "ചക്രം",

    tech478Prompt: "ദീർഘശ്വാസമെടുക്കുക. നിങ്ങളുടെ ചുറ്റുമുള്ള 3 കാര്യങ്ങളിൽ ശ്രദ്ധ കേന്ദ്രീകരിക്കുക. നിങ്ങൾ സുരക്ഷിതനാണ്.",
    tech54321Prompt: "ചുറ്റും നോക്കുക. കാണാൻ കഴിയുന്ന 5 കാര്യങ്ങൾ, തൊടാൻ കഴിയുന്ന 4 കാര്യങ്ങൾ എന്നിവ ശ്രദ്ധിക്കുക.",
    techBoxPrompt: "മെല്ലെ ശ്വാസമെടുക്കുക. സ്ഥിരമായി പിടിക്കുക. സാവധാനം പുറത്തുവിടുക. ഉറച്ചുനിൽക്കുക.",

    scriptsTag: "നടപടി 2 • അടിയന്തര സന്ദേശങ്ങൾ",
    scriptsHeading: "അയക്കാൻ സജ്ജമായ എസ്.എം.എസ് & നിർദ്ദേശങ്ങൾ",
    forMeTab: "എനിക്ക് (സ്പോൺസർ/988)",
    forCaregiverTab: "പരിപാലകന് (നാലോക്സോൺ)",
    autoCopied: "ക്ലിപ്പ്ബോർഡിലേക്ക് കോപ്പി ചെയ്തു!",
    copyText: "1-ടാപ്പ് കോപ്പി ചെയ്യുക",
    copied: "കോപ്പി ചെയ്തു!",
    sendSms: "1-ടാപ്പ് എസ്.എം.എസ് അയക്കുക",
    stepByStepTitle: "ഘട്ടങ്ങളായുള്ള പ്രവർത്തന നിർദ്ദേശങ്ങൾ",
    recipientLabel: "ലഭിക്കേണ്ടയാൾ",

    scriptSponsorCravingTitle: "അടിയന്തര ക്രേവിംഗ് മുന്നറിയിപ്പ്",
    scriptSponsorCravingText: "എനിക്ക് ഇപ്പോൾ കടുത്ത ആഗ്രഹവും വിഷമതയും അനുഭവപ്പെടുന്നുണ്ട്, സഹായം വേണം. ദയവായി എന്നെ വിളിക്കുകയോ മെസ്സേജ് അയക്കുകയോ ചെയ്യുക.",
    scriptSafetyPlanTitle: "സ്പോൺസർ സേഫ്റ്റി പ്ലാൻ ചെക്ക്-ഇൻ",
    scriptSafetyPlanText: "ഹലോ, ഞാൻ ഉയർന്ന അപകടസാധ്യതയുള്ള അവസ്ഥയിലാണ്. എന്റെ റിക്കവറി പ്ലാൻ നിങ്ങളുമായി പരിശോധിക്കണം.",
    script988Title: "988 ക്രൈസിസ് ലൈൻ മെസ്സേജ്",
    script988Text: "അഡിക്ഷൻ റിക്കവറിക്കും അടിയന്തര സഹായത്തിനുമായി എനിക്ക് ഇപ്പോൾ സഹായം വേണം.",
    scriptOverdoseTitle: "ഓവർഡോസ് അടിയന്തര സന്ദേശം",
    scriptOverdoseText: "അടിയന്തരം: ഓവർഡോസ് സംശയിക്കുന്നു. 911 ലേക്ക് വിളിക്കുകയും നാലോക്സോൺ (നാര്കാൻ) നൽകുകയും ചെയ്യുന്നു.",
    scriptNaloxoneGivenTitle: "നാലോക്സോൺ നൽകിയ വിവര അറിയിപ്പ്",
    scriptNaloxoneGivenText: "അറിയിപ്പ്: 1 ഡോസ് നാലോക്സോൺ നൽകിയിട്ടുണ്ട്. അടിയന്തര മെഡിക്കൽ സഹായത്തിന് ബന്ധപ്പെട്ടിട്ടുണ്ട്.",

    scanTag: "നടപടി 3 • എ.ഐ മൾട്ടിമോഡൽ പരിശോധന",
    scanHeading: "മരുന്ന് / അന്തരീക്ഷം സ്കാൻ ചെയ്യുക",
    uploadTitle: "ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുക അല്ലെങ്കിൽ എടുക്കുക",
    uploadSub: "നാലോക്സോൺ ബോക്സ്, മരുന്ന് കുപ്പികൾ, അല്ലെങ്കിൽ മുറിയുടെ ചിത്രം സ്കാൻ ചെയ്യുക.",
    selectPhotoBtn: "ഫോട്ടോ തിരഞ്ഞെടുക്കുക",
    presetsTitle: "സാമ്പിളുകൾ പരീക്ഷിക്കുക (1-ടാപ്പ്)",
    scanningText: "എ.ഐ വിഷൻ വഴി ചിത്രം വിശകലനം ചെയ്യുന്നു...",
    identifiedItem: "തിരിച്ചറിഞ്ഞ വസ്തു",
    urgency: "അടിയന്തരാവസ്ഥ",
    readAloud: "വായിച്ചു കേൾപ്പിക്കുക",
    actionStepsTitle: "ഉടൻ ചെയ്യേണ്ട കാര്യങ്ങൾ",

    call911: "911 അടിയന്തരമായി വിളിക്കുക",
    call988: "988 ഹെൽപ്പ് ലൈൻ വിളിക്കുക",
    text988: "988 മെസ്സേജ്",
    samhsa: "SAMHSA ഹെൽപ്പ് ലൈൻ",

    contactsAndSettings: "അടിയന്തര കോൺടാക്റ്റുകളും ക്രമീകരണങ്ങളും",
    contactsSub: "സ്പോൺസർ/പരിപാലക ഫോൺ നമ്പറുകളും ആപ്പിന്റെ ഭാഷയും ക്രമീകരിക്കുക.",
    languageSelectLabel: "App Language / ആപ്പിന്റെ ഭാഷ",
    englishOption: "English",
    malayalamOption: "മലയാളം (Malayalam)",
    sponsorHeader: "സ്പോൺസർ / പിയർ സ്പെഷ്യലിസ്റ്റ്",
    sponsorNameLabel: "സ്പോൺസറുടെ പേര്",
    sponsorPhoneLabel: "സ്പോൺസറുടെ ഫോൺ നമ്പർ",
    caregiverHeader: "പരിപാലകൻ / അടിയന്തര കോൺടാക്റ്റ്",
    caregiverNameLabel: "പരിപാലകന്റെ പേര്",
    caregiverPhoneLabel: "പരിപാലകന്റെ ഫോൺ നമ്പർ",
    saveSettingsBtn: "ക്രമീകരണങ്ങൾ സേവ് ചെയ്യുക",
    savedSuccess: "സേവ് ചെയ്തു!",

    footerTitle: "ആങ്കർ അടിയന്തര സഹായം • രഹസ്യവും സുരക്ഷിതവും",
    footerDisclaimer: "നിങ്ങളോ മറ്റാരെങ്കിലുമോ അപകടനിലയിലാണെങ്കിൽ ഉടൻ തന്നെ അടിയന്തര മെഡിക്കൽ സഹായം തേടുക."
  }
};
