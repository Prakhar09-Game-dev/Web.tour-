import React from 'react';
import type { TourPackage } from '../types.js';
import type { Language } from '../i18n/translations.js';
import { translations } from '../i18n/translations.js';

interface VaranasiToursSectionProps {
  packages: TourPackage[];
  lang: Language;
  onRequestQuote: (pkg: TourPackage) => void;
}

export const VaranasiToursSection: React.FC<VaranasiToursSectionProps> = ({
  packages,
  lang,
  onRequestQuote
}) => {
  const t = translations[lang];

  return (
    <section className="py-16 bg-[#0d1c32] text-white my-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#ffe088] uppercase tracking-widest block mb-2">
            {t.sacredDestinations}
          </span>
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-white mb-3">
            {t.sightseeingTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#b9c7e4] leading-relaxed">
            {t.sightseeingSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white text-[#1a1c1c] rounded-xl overflow-hidden shadow-xl flex flex-col justify-between border border-[#e2e2e2]/20 hover:scale-[1.01] transition-transform"
            >
              <div>
                <div
                  className="h-48 w-full bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${pkg.imageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-3 right-3 flex justify-between items-center text-white text-[11px] font-bold">
                    <span>{pkg.duration}</span>
                    {pkg.startingPrice && (
                      <span className="bg-[#fed65b] text-[#0d1c32] px-2 py-0.5 rounded text-[10px]">
                        Starts ₹{pkg.startingPrice}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-headline font-bold text-sm text-[#0d1c32] mb-1.5">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#44474d] mb-3 line-clamp-3 leading-relaxed">
                    {pkg.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {pkg.includedServices.slice(0, 2).map((inc, i) => (
                      <span key={i} className="text-[10px] bg-[#f3f3f4] text-[#44474d] px-1.5 py-0.5 rounded">
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => onRequestQuote(pkg)}
                  className="w-full py-2 bg-[#f3f3f4] text-[#0d1c32] font-bold text-xs rounded-lg hover:bg-[#000000] hover:text-white transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{t.requestQuote}</span>
                  <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
