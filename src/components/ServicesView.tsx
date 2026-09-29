import React from 'react';
import type { Language } from '../i18n/translations.js';

interface ServicesViewProps {
  lang: Language;
  onBookService: (serviceName: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onBookService }) => {
  const services = [
    {
      id: 'local-taxi',
      name: 'Local Taxi Service',
      badge: 'City Commutes & Darshan',
      icon: 'local_taxi',
      description: 'Dedicated air-conditioned taxi cabs for city transfers, shopping, meeting clients, and hospital visits across Varanasi, BHU, Lanka, and Cantonment.',
      features: ['Hourly packages (4hr/40km, 8hr/80km)', 'Zero surge pricing', 'Doorstep pickup from hotel/home', 'Clean sanitized cabs'],
      starting: 'From ₹1,400'
    },
    {
      id: 'outstation-taxi',
      name: 'Outstation Taxi Service',
      badge: 'Intercity Highway Travel',
      icon: 'directions_car',
      description: 'Comfortable one-way and roundtrip cabs from Varanasi to Lucknow, Prayagraj, Gorakhpur, Patna, Ayodhya, Gaya, and Ghazipur with experienced highway drivers.',
      features: ['One-way & round-trip options', 'All highway tolls & taxes assisted', 'Flexible rest stop intervals', 'Commercial tourist permit vehicles'],
      starting: 'From ₹11/km'
    },
    {
      id: 'airport-transfer',
      name: 'Airport Pickup & Drop',
      badge: 'Lal Bahadur Shastri Airport (VNS)',
      icon: 'flight',
      description: 'Guaranteed punctual transfers to and from Babatpur Airport. Our drivers track flight arrival delays to ensure seamless greeting at the arrivals gate.',
      features: ['Flight delay tracking', 'Driver waiting at arrivals terminal', 'Luggage loading assistance', 'Fixed transparent airport pricing'],
      starting: 'From ₹800'
    },
    {
      id: 'railway-transfer',
      name: 'Railway Station Pickup & Drop',
      badge: 'All Major Stations',
      icon: 'train',
      description: 'Round the clock station cab service covering Varanasi Cantt (BSB), Banaras (Manduadih - BSBS), Pandit Deen Dayal Upadhyaya Junction (DDU/Mughalsarai), and Kashi Station.',
      features: ['24/7 midnight & early morning pickups', 'Assistance for heavy bags & elderly', 'Direct transfer to Ghat hotels & ashrams'],
      starting: 'From ₹400'
    },
    {
      id: 'family-tours',
      name: 'Family Tour Packages',
      badge: 'Relaxed Vacation Travel',
      icon: 'diversity_3',
      description: 'Tailored multi-day tours designed for families with children and elders. Spacious Ertiga, Innova Crysta, and Tempo Travellers ensuring ample legroom.',
      features: ['Child & senior citizen friendly pacing', 'Pre-planned hotel drop-offs', 'Customizable sightseeing stops', 'Chauffeurs trained in courteous etiquette'],
      starting: 'Get Custom Quote'
    },
    {
      id: 'pilgrimage-tours',
      name: 'Pilgrimage Tours (Tirth Yatra)',
      badge: 'Sacred UP & Bihar Circuits',
      icon: 'temple_hindu',
      description: 'Dedicated spiritual yatras covering Kashi Vishwanath, Ayodhya Ram Mandir, Prayagraj Triveni Sangam, Vindhyachal Devi, Chitrakoot, and Bodh Gaya.',
      features: ['Temple timing coordination', 'Guidance on puja & Ganga Aarti timings', 'Assistance for VIP darshan lines', 'Pushback seats for long distance comfort'],
      starting: 'From ₹3,800'
    },
    {
      id: 'wedding-events',
      name: 'Wedding & Event Transportation',
      badge: 'Fleet Logistics for Guests',
      icon: 'celebration',
      description: 'Flawless wedding logistics and fleet hiring for baraat, guest station/airport shuttles, and VIP delegate movements during grand celebrations in Varanasi.',
      features: ['Decorated bridal luxury cars', 'Bulk fleet coordination for 50-500 guests', 'On-ground transport manager assigned', '24-hour backup standby vehicles'],
      starting: 'Contact for Booking'
    },
    {
      id: '24-7-availability',
      name: '24/7 Vehicle Availability',
      badge: 'Always At Your Service',
      icon: 'schedule',
      description: 'Never get stranded in Varanasi. Whether you need a cab at 3:00 AM for early morning Subah-e-Banaras or a late night train emergency, we are just a call away.',
      features: ['Real-time phone hotline (9559113710)', 'Instant WhatsApp dispatch', 'Nearby drivers across Varanasi city', 'Immediate vehicle replacement guarantee'],
      starting: 'Always Available'
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block mb-2">
          OUR COMPREHENSIVE SOLUTIONS
        </span>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-[#0d1c32] mb-3">
          Travel & Transportation Services in Varanasi
        </h1>
        <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
          From convenient city hops to sacred multi-day pilgrim journeys across Uttar Pradesh, Vimal Tour & Travellers offers prompt, reliable, and comfortable cabs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((svc) => (
          <div
            key={svc.id}
            className="bg-white rounded-xl p-6 border border-[#e2e2e2] shadow-xs hover:border-[#fed65b] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0d1c32] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px] text-[#fed65b]">
                    {svc.icon}
                  </span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#f3f3f4] text-[#0d1c32]">
                  {svc.badge}
                </span>
              </div>

              <h3 className="font-headline font-bold text-lg text-[#0d1c32] mb-2">
                {svc.name}
              </h3>
              <p className="text-xs text-[#44474d] leading-relaxed mb-4">
                {svc.description}
              </p>

              <div className="space-y-1.5 mb-6">
                {svc.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#1a1c1c]">
                    <span className="material-symbols-outlined text-[16px] text-emerald-600">
                      check_circle
                    </span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#e2e2e2] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#75777e] block">Starting Rate</span>
                <span className="text-xs font-bold text-[#0d1c32] font-mono">{svc.starting}</span>
              </div>
              <button
                onClick={() => onBookService(svc.name)}
                className="px-4 py-2 bg-[#000000] text-white rounded-lg text-xs font-bold hover:bg-[#0d1c32] transition-colors cursor-pointer"
              >
                Book This Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
