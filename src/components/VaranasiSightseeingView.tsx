import React from 'react';
import type { Destination } from '../types.js';

interface VaranasiSightseeingViewProps {
  destinations: Destination[];
  onBookSightseeing: (option: string) => void;
}

export const VaranasiSightseeingView: React.FC<VaranasiSightseeingViewProps> = ({
  destinations,
  onBookSightseeing
}) => {
  const options = [
    {
      title: 'Half Day Sightseeing (4-5 Hours)',
      desc: 'Ideal for travelers with limited time. Covers Kashi Vishwanath, Annapurna, and Evening Ganga Aarti at Dashashwamedh.',
      kms: 'Approx 30-40 km',
      vehicles: 'Dzire, WagonR, Ertiga',
      fare: 'Starts ₹1,400'
    },
    {
      title: 'Full Day Sightseeing (8-10 Hours)',
      desc: 'The comprehensive Kashi darshan covering Vishwanath Corridor, Sankat Mochan, BHU, Durga Mandir, Bharat Mata Mandir, and Ganga Aarti.',
      kms: 'Approx 80 km',
      vehicles: 'Sedan, Ertiga, Innova Crysta, Traveller',
      fare: 'Starts ₹2,200'
    },
    {
      title: 'Customized & Sarnath Tour',
      desc: 'Custom route including morning sunrise boat at Assi Ghat, Sarnath Buddhist monasteries, silk saree weaving centers, and Ramnagar Fort.',
      kms: 'Flexible itinerary',
      vehicles: 'All vehicle fleet options',
      fare: 'Custom Quotation'
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block mb-2">
          THE SPIRITUAL CAPITAL OF INDIA
        </span>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-[#0d1c32] mb-3">
          Varanasi Local Sightseeing & Temple Tours
        </h1>
        <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
          Navigate ancient Varanasi with ease. Our experienced drivers know every ghat access point, temple timing, parking spot, and traffic shortcut.
        </p>
      </div>

      {/* Sightseeing Tour Options Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {options.map((opt, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-[#e2e2e2] shadow-xs hover:border-[#fed65b] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-[#0d1c32] text-[#fed65b] flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </span>
                <span className="text-[11px] font-bold text-[#735c00] uppercase tracking-wider">
                  Tour Package
                </span>
              </div>
              <h2 className="font-headline font-bold text-lg text-[#0d1c32] mb-2">
                {opt.title}
              </h2>
              <p className="text-xs text-[#44474d] leading-relaxed mb-4">
                {opt.desc}
              </p>
              <div className="space-y-1.5 text-xs text-[#1a1c1c] mb-6">
                <div><span className="font-semibold text-[#75777e]">Coverage:</span> {opt.kms}</div>
                <div><span className="font-semibold text-[#75777e]">Vehicles:</span> {opt.vehicles}</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2e2e2] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#75777e] block">Estimated Fare</span>
                <span className="text-xs font-bold text-[#0d1c32]">{opt.fare}</span>
              </div>
              <button
                onClick={() => onBookSightseeing(opt.title)}
                className="px-4 py-2 bg-[#000000] text-white rounded-lg text-xs font-bold hover:bg-[#0d1c32] transition-colors cursor-pointer"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Prominent Destinations Grid */}
      <div>
        <h2 className="font-headline font-bold text-2xl text-[#0d1c32] mb-6">
          Featured Attractions & Temples in Varanasi
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((dest) => (
            <div
              key={dest.id}
              className="bg-white rounded-xl overflow-hidden border border-[#e2e2e2] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div
                  className="h-44 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${dest.imageUrl}')` }}
                />
                <div className="p-4">
                  <h3 className="font-headline font-bold text-base text-[#0d1c32] mb-1.5">
                    {dest.name}
                  </h3>
                  <p className="text-xs text-[#44474d] leading-relaxed mb-3">
                    {dest.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {dest.highlights.map((h, i) => (
                      <span key={i} className="text-[10px] bg-[#f3f3f4] text-[#44474d] px-2 py-0.5 rounded">
                        • {h}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => onBookSightseeing(dest.name)}
                  className="w-full py-2 bg-[#f3f3f4] text-[#0d1c32] text-xs font-bold rounded-lg hover:bg-[#0d1c32] hover:text-white transition-colors cursor-pointer"
                >
                  Visit This Place
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
