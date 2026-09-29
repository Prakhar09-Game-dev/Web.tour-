import React from 'react';

export const FloatingCTAs: React.FC = () => {
  return (
    <div className="hidden md:flex fixed bottom-6 right-6 z-40 flex-col gap-3">
      <a
        aria-label="Chat on WhatsApp"
        className="w-13 h-13 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95"
        href="https://wa.me/919559113710?text=Hello%20Vimal%20Tour%20%26%20Travellers%2C%20I%20would%20like%20to%20enquire%20about%20a%20vehicle."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp (9559113710)"
      >
        <span className="material-symbols-outlined text-[26px]">chat</span>
      </a>

      <a
        aria-label="Call Helpline"
        className="w-13 h-13 bg-[#0d1c32] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform active:scale-95 border border-white/20"
        href="tel:9559113710"
        title="Call Helpline (9559113710)"
      >
        <span className="material-symbols-outlined text-[26px] text-[#fed65b]">call</span>
      </a>
    </div>
  );
};
