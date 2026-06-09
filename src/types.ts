export interface EventConcept {
  id: string;
  title: string;
  vibe: string;
  palette: {
    name: string;
    colors: string[]; // hex or tailwind class strings
    description: string;
  };
  decorDetails: string[];
  flowerSelections: string[];
  ambientNotes: string;
  playlistVibe: string;
  checklist: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'nina';
  text: string;
  timestamp: Date;
}

export interface PresetTheme {
  id: string;
  name: string;
  tagline: string;
  bgHex: string;
  accentClass: string;
  hoverClass: string;
  textColor: string;
  icon: string;
}

export interface LeadSubmission {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  consentMarketing: boolean;
  consentPrivacy: boolean;
}
