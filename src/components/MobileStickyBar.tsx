import React from 'react';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d1c32] text-white border-t border-white/10 px-3 py-2 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        <a
          href="tel:9559113710"
          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-white/10 rounded-lg text-xs font-bold text-white active:bg-white/20 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px] text-[#fed65b]">call</span>
          <span>CALL</span>
        </a>

        <a
          href="https://wa.me/919559113710?text=Hello%20Vimal%20Tour%20%26%20Travellers%2C%20I%20would%20like%20to%20book%20a%20vehicle."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2 px-1 bg-[#25D366] text-white rounded-lg text-xs font-bold active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>WHATSAPP</span>
        </a>

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
