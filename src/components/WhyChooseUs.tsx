import React from 'react';
import type { Language } from '../i18n/translations.js';
import { translations } from '../i18n/translations.js';

interface WhyChooseUsProps {
  lang: Language;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ lang }) => {
  const t = translations[lang];

  const features = [
    {
      icon: 'schedule',
      title: '24/7 Availability',
      desc: 'Ready for emergency bookings, late-night station pickups, and early morning temple tours at any hour.'
    },
    {
      icon: 'directions_car',
      title: 'Multiple Vehicle Options',
      desc: 'From economic hatchbacks and comfortable sedans to luxury SUVs and 17-seater tempo travellers.'
    },
    {
      icon: 'map',
      title: 'Local & Outstation Travel',
      desc: 'Expert drivers well-versed with Varanasi lanes, traffic shortcuts, and outstation highways across UP and Bihar.'
    },
    {
      icon: 'verified_user',
      title: 'Professional Service',
      desc: 'Polite, verified, and experienced chauffeurs ensuring absolute safety for families, women, and elderly pilgrims.'
    },
    {
      icon: 'receipt_long',
      title: 'Transparent Quotations',
      desc: 'No hidden toll or parking surprises. Clear upfront pricing with flexible hourly or per-kilometer packages.'
    },
    {
      icon: 'temple_buddhist',
      title: 'Varanasi Local Expertise',
      desc: 'Deep local knowledge of ghat timings, temple rituals, parking zones, and best routes in Kashi.'
    }
  ];

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 md:px-6 w-full">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block mb-2">
          OUR ADVANTAGE
        </span>
        <h2 className="font-headline font-bold text-2xl md:text-3xl text-[#0d1c32] mb-3">
          {t.whyChooseUsTitle}
        </h2>
        <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
          {t.whyChooseUsSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-xs border border-[#e2e2e2] hover:border-[#fed65b] hover:shadow-md transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0d1c32] text-white flex items-center justify-center mb-4 shadow-xs">
              <span className="material-symbols-outlined text-[24px] text-[#fed65b]">
                {item.icon}
              </span>
            </div>
            <h3 className="font-headline font-bold text-base text-[#0d1c32] mb-2">
              {item.title}
            </h3>
            <p className="text-xs text-[#44474d] leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
