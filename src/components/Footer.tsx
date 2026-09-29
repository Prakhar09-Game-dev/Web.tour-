import React from 'react';
import type { Language } from '../i18n/translations.js';
import { translations } from '../i18n/translations.js';

interface FooterProps {
  lang: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = translations[lang];

  return (
    <footer className="w-full bg-[#0d1c32] text-[#76849f] py-14 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
        {/* Col 1 */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-[#fed65b] text-[#0d1c32] flex items-center justify-center font-bold text-sm">
              V
            </div>
            <h3 className="font-headline font-bold text-lg text-white">
              {t.brandName} {t.brandSubtitle}
            </h3>
          </div>
          <p className="text-xs text-[#b9c7e4] mb-4 leading-relaxed">
            Your trusted partner for Varanasi local sightseeing, outstation cabs, Babatpur airport transfers, corporate rentals, and sacred pilgrimage journeys across North India.
          </p>
          <div className="space-y-1 text-xs">
            <p className="text-[#b9c7e4]">
              {t.emergencyHelpline}:{' '}
              <a href="tel:9559113710" className="text-[#fed65b] font-mono font-bold hover:underline">
                +91 9559113710
              </a>
            </p>
            <p className="text-[#b9c7e4]">
              Secondary Helpline:{' '}
              <a href="tel:9453636321" className="text-[#fed65b] font-mono font-bold hover:underline">
                +91 9453636321
              </a>
            </p>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h3 className="font-headline font-bold text-base text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-xs">
            <li>
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.navHome}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('our-vehicles')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.navVehicles}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('tour-packages')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.navTourPackages}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('varanasi-sightseeing')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.navVaranasiSightseeing}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('pilgrimage-tours')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.navPilgrimage}
              </button>
            </li>
            <li>
              <button
                onClick={() => onNavigate('contact')}
                className="hover:text-white transition-colors cursor-pointer text-left"
              >
                {t.navContact}
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h3 className="font-headline font-bold text-base text-white mb-4">
            {t.officeAddressTitle}
          </h3>
          <p className="text-xs text-[#b9c7e4] mb-3 leading-relaxed">
            {t.officeAddress}
          </p>
          <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs text-[#b9c7e4]">
            <span className="block font-bold text-white mb-1">24/7 Operations Room</span>
            <span>{t.hours247}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-6 border-t border-white/10 text-center text-xs text-[#76849f]">
        © 2026 Vimal Tour & Travellers. {t.rightsReserved} • Varanasi, Uttar Pradesh
      </div>
    </footer>
  );
};
