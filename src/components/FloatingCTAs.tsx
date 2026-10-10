import React from 'react';
import { CONTACT_PHONE } from '../config/contact.js';
import { WhatsAppCTA } from './WhatsAppCTA.js';

export const FloatingCTAs: React.FC = () => {
  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
      <WhatsAppCTA
        variant="icon"
        className="w-13 h-13 rounded-full shadow-2xl"
        title={`Chat on WhatsApp (${CONTACT_PHONE})`}
      />

      <a
        aria-label="Call Helpline"
        className="w-13 h-13 bg-[#0d1c32] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 border border-white/20"
        href={`tel:${CONTACT_PHONE}`}
        title={`Call Helpline (${CONTACT_PHONE})`}
      >
        <span className="material-symbols-outlined text-[26px] text-[#fed65b]">call</span>
      </a>
    </div>
  );
};
