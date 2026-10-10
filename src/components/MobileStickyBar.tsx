import React from 'react';
import { CONTACT_PHONE } from '../config/contact.js';
import { WhatsAppCTA } from './WhatsAppCTA.js';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1c32] text-white border-t border-white/10 px-3 py-2 shadow-2xl pb-[calc(env(safe-area-inset-bottom)+0.5rem)]">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${CONTACT_PHONE}`}
          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-white/10 rounded-lg text-xs font-bold text-white active:bg-white/20 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] text-[#fed65b]">call</span>
          <span>CALL</span>
        </a>

        <WhatsAppCTA
          label="WHATSAPP"
          compact
          variant="button"
          message="Hello Vimal Tour & Travellers, I would like to book a taxi."
          className="!bg-[#25D366] !text-white !rounded-lg !font-bold !w-full"
        />

        <button
          onClick={onOpenBooking}
          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-[#fed65b] text-[#0d1c32] rounded-lg text-xs font-bold active:scale-95 transition-transform cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">directions_car</span>
          <span>BOOK NOW</span>
        </button>
      </div>
    </div>
  );
};
