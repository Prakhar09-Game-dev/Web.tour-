import React, { useState } from 'react';
import type { Language } from '../i18n/translations.js';
import { translations } from '../i18n/translations.js';
import type { Vehicle } from '../types.js';

interface HeroSectionProps {
  lang: Language;
  vehicles: Vehicle[];
  onOpenBooking: (initialData?: {
    pickupLocation?: string;
    dropLocation?: string;
    travelDate?: string;
    pickupTime?: string;
    tripType?: string;
    vehicleId?: string;
  }) => void;
  onExploreFleet: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  vehicles,
  onOpenBooking,
  onExploreFleet
}) => {
  const t = translations[lang];

  const today = new Date().toISOString().split('T')[0];
  const [pickup, setPickup] = useState('Varanasi Junction');
  const [drop, setDrop] = useState('Kashi Vishwanath Temple');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('09:00');
  const [tripType, setTripType] = useState('Local Sightseeing');
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || 'veh-dzire');
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<{ available: boolean; message: string } | null>(null);

  const handleCheckAndBook = async (e: React.FormEvent) => {
    e.preventDefault();
    setChecking(true);
    setCheckResult(null);

    try {
      const res = await fetch('/api/vehicles/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: selectedVehicleId,
          travelDate: date
        })
      });
      const data = await res.json();

      if (!res.ok || !data.available) {
        setCheckResult({
          available: false,
          message: data.reason || 'This vehicle is reserved for this date. Please choose another vehicle or date.'
        });
      } else {
        // Vehicle is available! Pass directly to booking modal
        onOpenBooking({
          pickupLocation: pickup,
          dropLocation: drop,
          travelDate: date,
          pickupTime: time,
          tripType,
          vehicleId: selectedVehicleId
        });
      }
    } catch (err) {
      console.error('Availability check failed:', err);
      // Fallback open booking
      onOpenBooking({
        pickupLocation: pickup,
        dropLocation: drop,
        travelDate: date,
        pickupTime: time,
        tripType,
        vehicleId: selectedVehicleId
      });
    } finally {
      setChecking(false);
    }
  };

  return (
    <section className="relative min-h-[850px] lg:min-h-[900px] flex items-center justify-center bg-[#0d1c32] text-white overflow-hidden pt-28 pb-16 px-4 md:px-6">
      {/* Background with measured contrast overlay */}
      <div
        className="absolute inset-0 z-0 opacity-25 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDBxFSedgleJnO7BZ1_GZ0TPfFyVjBGEWusxy4EHucWtN9LxQx-PKGzk3e7ujzbxM0Kjk6tzTzp0_1LoXfwyhv0xtG6TwGbJRd_EFA9WskWr7NEftQ9Cjd2AavaC0_HsT00WncUXH3T2Ig46gAQvo90kc4-ShC1e8dTNnLUPKB0z2aS_U1RMaNij2tqPH3ZVl0On8Kz8McQDajB0bhy7WMfx13fhNt3GH_P0uRJTUY5S2I_t8GUlRM')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1c32] via-[#0d1c32]/85 to-[#0d1c32]/60 z-10" />

      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Value Column */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px] text-[#ffe088]">verified</span>
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="font-headline font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 tracking-tight leading-[1.15]">
            {t.heroTitlePart1}
            <span className="text-[#ffe088] underline decoration-[#ffe088]/40 underline-offset-8">
              {t.heroTitlePart2}
            </span>
          </h1>

          <p className="font-body text-sm sm:text-base text-[#b9c7e4] mb-8 max-w-2xl leading-relaxed">
            {t.heroSubtitle}
          </p>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-3.5 bg-[#fed65b] text-[#241a00] font-headline font-bold text-xs sm:text-sm rounded-xl hover:bg-[#ffe088] transition-all shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <span>{t.btnBookNow}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={onExploreFleet}
              className="px-6 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-headline font-semibold text-xs sm:text-sm rounded-xl hover:bg-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>{t.btnExploreFleet}</span>
              <span className="material-symbols-outlined text-[18px]">directions_car</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 w-full max-w-xl">
            <div>
              <span className="block font-headline font-bold text-2xl sm:text-3xl text-white">24/7</span>
              <span className="block text-xs text-[#b9c7e4] mt-0.5">{t.metricAvailability}</span>
            </div>
            <div>
              <span className="block font-headline font-bold text-2xl sm:text-3xl text-white">Clean</span>
              <span className="block text-xs text-[#b9c7e4] mt-0.5">{t.metricSanitized}</span>
            </div>
            <div>
              <span className="block font-headline font-bold text-2xl sm:text-3xl text-white">100%</span>
              <span className="block text-xs text-[#b9c7e4] mt-0.5">{t.metricReliable}</span>
            </div>
          </div>
        </div>

        {/* Quick Booking / Search Widget */}
        <div className="lg:col-span-5 bg-white text-[#1a1c1c] p-6 sm:p-8 rounded-2xl shadow-2xl relative border border-[#e2e2e2]">
          <div className="absolute -top-3 right-6 bg-[#735c00] text-white font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px] shadow-sm">
            {t.instantBookingBadge}
          </div>

          <h3 className="font-headline font-bold text-xl mb-4 text-[#0d1c32]">
            {t.bookRideTitle}
          </h3>

          <form className="space-y-3.5" onSubmit={handleCheckAndBook}>
            <div>
              <label className="block text-xs font-semibold text-[#44474d] mb-1">
                {t.pickupLocation}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 material-symbols-outlined text-[#75777e] text-[18px]">
                  trip_origin
                </span>
                <input
                  className="w-full pl-9 pr-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs font-medium"
                  placeholder={t.pickupPlaceholder}
                  required
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#44474d] mb-1">
                {t.dropLocation}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 material-symbols-outlined text-[#ba1a1a] text-[18px]">
                  location_on
                </span>
                <input
                  className="w-full pl-9 pr-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs font-medium"
                  placeholder={t.dropPlaceholder}
                  required
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#44474d] mb-1">
                  {t.travelDate}
                </label>
                <input
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs font-medium"
                  required
                  type="date"
                  min={today}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#44474d] mb-1">
                  {t.pickupTime}
                </label>
                <input
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs font-medium"
                  required
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#44474d] mb-1">
                  {t.tripType}
                </label>
                <select
                  className="w-full px-2.5 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs font-medium cursor-pointer"
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <option value="Local Sightseeing">Local Sightseeing</option>
                  <option value="Outstation One-Way">Outstation One-Way</option>
                  <option value="Round Trip">Round Trip</option>
                  <option value="Airport Transfer">Airport Transfer</option>
                  <option value="Railway Station Transfer">Railway Station Transfer</option>
                  <option value="Pilgrimage Package">Pilgrimage Package</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#44474d] mb-1">
                  {t.vehiclePreference}
                </label>
                <select
                  className="w-full px-2.5 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs font-medium cursor-pointer"
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.type})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Availability Warning if conflict */}
            {checkResult && !checkResult.available && (
              <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-1.5">
                <span className="material-symbols-outlined text-[16px] shrink-0 mt-0.5">error</span>
                <span>{checkResult.message}</span>
              </div>
            )}

            <button
              className="w-full py-3 bg-[#000000] text-white font-headline font-bold text-xs rounded-lg hover:bg-[#0d1c32] transition-colors shadow-md flex items-center justify-center gap-2 mt-4 cursor-pointer active:scale-[0.99]"
              type="submit"
              disabled={checking}
            >
              <span className="material-symbols-outlined text-[18px]">
                {checking ? 'progress_activity' : 'search'}
              </span>
              <span>{checking ? 'CHECKING FLEET...' : t.checkAvailability}</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
