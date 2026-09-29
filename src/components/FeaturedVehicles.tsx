import React from 'react';
import type { Vehicle } from '../types.js';
import type { Language } from '../i18n/translations.js';
import { translations } from '../i18n/translations.js';

interface FeaturedVehiclesProps {
  vehicles: Vehicle[];
  lang: Language;
  onBookVehicle: (vehicleId: string) => void;
  onViewDetails: (vehicle: Vehicle) => void;
  onViewAll: () => void;
}

export const FeaturedVehicles: React.FC<FeaturedVehiclesProps> = ({
  vehicles,
  lang,
  onBookVehicle,
  onViewDetails,
  onViewAll
}) => {
  const t = translations[lang];

  return (
    <section className="py-14 max-w-7xl mx-auto px-4 md:px-6 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
        <div>
          <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block mb-1">
            {t.ourFleet}
          </span>
          <h2 className="font-headline font-bold text-2xl md:text-3xl text-[#0d1c32]">
            {t.featuredVehiclesTitle}
          </h2>
        </div>
        <button
          onClick={onViewAll}
          className="mt-3 md:mt-0 text-xs font-bold text-[#0d1c32] hover:text-[#735c00] flex items-center gap-1 transition-colors cursor-pointer self-start md:self-auto"
        >
          <span>{t.viewAllVehicles}</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((v) => {
          const isTraveller = v.type === 'Group Tour Van' || v.seatingCapacity > 10;
          return (
            <div
              key={v.id}
              className={`bg-white rounded-xl shadow-xs overflow-hidden flex flex-col justify-between border border-[#e2e2e2] hover:shadow-md transition-shadow ${
                isTraveller ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div>
                <div
                  className="h-48 w-full bg-cover bg-center relative group"
                  style={{ backgroundImage: `url('${v.imageUrl}')` }}
                >
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-bold text-[#0d1c32] shadow-xs">
                    {v.baseFare ? `From ₹${v.baseFare}` : 'Contact for Quote'}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline font-bold text-lg text-[#0d1c32]">
                      {v.name}
                    </h3>
                    <span className="px-2.5 py-0.5 bg-[#fed65b]/30 text-[#745c00] font-bold text-[11px] rounded">
                      {v.type}
                    </span>
                  </div>

                  <p className="text-xs text-[#44474d] mb-4 line-clamp-2 leading-relaxed">
                    {v.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-[#44474d] mb-4">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#735c00]">
                        group
                      </span>
                      {v.seatingCapacity} {t.seater}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#735c00]">
                        ac_unit
                      </span>
                      {v.acType}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-[#735c00]">
                        luggage
                      </span>
                      {v.luggageCapacity} {t.bags}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 grid grid-cols-3 gap-2">
                <button
                  onClick={() => onBookVehicle(v.id)}
                  className="col-span-2 py-2.5 bg-[#000000] text-white text-center font-bold text-xs rounded-lg hover:bg-[#0d1c32] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">book_online</span>
                  <span>{isTraveller ? 'Book Group Van' : t.btnBookNow}</span>
                </button>
                <button
                  onClick={() => onViewDetails(v)}
                  className="py-2.5 bg-[#e8e8e8] text-[#1a1c1c] text-center font-bold text-xs rounded-lg hover:bg-[#dadada] transition-colors cursor-pointer"
                >
                  {t.details}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
