import React, { useState } from 'react';
import type { TourPackage } from '../types.js';

interface TourPackagesViewProps {
  packages: TourPackage[];
  onSelectPackage: (pkg: TourPackage) => void;
}

export const TourPackagesView: React.FC<TourPackagesViewProps> = ({ packages, onSelectPackage }) => {
  const [filter, setFilter] = useState<'All' | 'Sightseeing' | 'Pilgrimage'>('All');

  const filtered = filter === 'All' ? packages : packages.filter(p => p.category === filter);

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block mb-2">
          CURATED ITINERARIES
        </span>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-[#0d1c32] mb-3">
          Varanasi & Sacred Pilgrimage Tour Packages
        </h1>
        <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
          Hand-crafted travel itineraries with dedicated chauffeurs, transparent quotations, and hassle-free spiritual tours across Uttar Pradesh.
        </p>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {(['All', 'Sightseeing', 'Pilgrimage'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filter === tab
                  ? 'bg-[#0d1c32] text-white shadow-sm'
                  : 'bg-white text-[#44474d] border border-[#e2e2e2] hover:bg-[#f3f3f4]'
              }`}
            >
              {tab === 'All' ? 'All Packages' : tab === 'Sightseeing' ? 'Varanasi Sightseeing' : 'Sacred Pilgrimage Yatras'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#e2e2e2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div
                className="h-60 w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url('${pkg.imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#fed65b] text-[#0d1c32] px-2 py-0.5 rounded">
                      {pkg.category}
                    </span>
                    <h2 className="font-headline font-bold text-xl sm:text-2xl mt-1 text-white">
                      {pkg.name}
                    </h2>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-gray-200 block">Duration</span>
                    <span className="text-xs font-bold">{pkg.duration}</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed mb-6">
                  {pkg.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {/* Inclusions */}
                  <div className="bg-[#f9f9f9] p-3.5 rounded-xl border border-[#e2e2e2]">
                    <h3 className="font-bold text-xs text-[#0d1c32] mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-emerald-600">
                        check_circle
                      </span>
                      Package Inclusions
                    </h3>
                    <ul className="space-y-1 text-xs text-[#44474d]">
                      {pkg.includedServices.map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold">•</span>
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Exclusions */}
                  <div className="bg-[#f9f9f9] p-3.5 rounded-xl border border-[#e2e2e2]">
                    <h3 className="font-bold text-xs text-[#0d1c32] mb-2 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">
                        cancel
                      </span>
                      Exclusions
                    </h3>
                    <ul className="space-y-1 text-xs text-[#44474d]">
                      {pkg.excludedServices.map((exc, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-[#ba1a1a] font-bold">•</span>
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Available Vehicles */}
                <div className="mb-2">
                  <span className="text-xs font-semibold text-[#75777e] block mb-2">
                    Available Fleet Options for this Tour:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {pkg.vehicleOptions.map((v, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#f3f3f4] text-[#0d1c32] text-xs font-medium rounded-lg border border-[#e2e2e2]"
                      >
                        🚗 {v}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#e2e2e2] mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-[#75777e] block">Transparent Pricing</span>
                <span className="font-headline font-bold text-lg text-[#0d1c32]">
                  {pkg.startingPrice ? `Starting from ₹${pkg.startingPrice}` : 'Contact for Custom Quote'}
                </span>
              </div>
              <button
                onClick={() => onSelectPackage(pkg)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#000000] text-white font-bold text-xs rounded-xl hover:bg-[#0d1c32] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book This Package</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
