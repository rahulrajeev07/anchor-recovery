# Anchor — Emergency Addiction Recovery & Harm Reduction Platform

Anchor is an emergency, instant-access harm reduction and addiction crisis intervention application powered by Google Gemini API.

## Features

- **Quick Craving Check**: Instant multi-modal assessment tool.
- **De-escalation Grounding**: Interactive 4-7-8 breathing exercises with Web Audio ambient synth and Web Speech API prompts.
- **Scan Medication & Harm Reduction**: Multi-modal vision analysis using Gemini 2.5 Flash for rapid Narcan (Naloxone) identification and step-by-step administration guides.
- **Emergency Script Templates**: One-tap SMS/call templates for sponsors, caregivers, or helpline dispatch.
- **Safety Bar**: Instant access to 988 Suicide & Crisis Lifeline and 911 emergency calls.

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Node.js / Express server proxying Gemini 2.5 Flash API calls safely
- **AI**: `@google/genai` SDK (`gemini-2.5-flash`)
- **Testing**: Vitest (`npm test`)

## Security & API Key Protection

- **No exposed frontend secrets**: All calls to the Gemini API are routed through server endpoints (`/api/gemini/scan-medication` and `/api/gemini/deescalate-chat`).
- **Environment variables**: Configured via `process.env.GEMINI_API_KEY`.
- `.gitignore` includes all secrets (`.env`, `.env.local`).

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env`:
   ```bash
   cp .env.example .env
   # Add your GEMINI_API_KEY
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Run unit tests:
   ```bash
   npm test
   ```
5. Build for production:
   ```bash
   npm run build
   ```
