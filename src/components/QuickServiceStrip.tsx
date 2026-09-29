import React from 'react';

interface QuickServiceStripProps {
  onSelectService: (serviceName: string) => void;
}

export const QuickServiceStrip: React.FC<QuickServiceStripProps> = ({ onSelectService }) => {
  const items = [
    {
      icon: 'support_agent',
      title: '24/7 Availability',
      desc: 'Round the clock service',
      serviceKey: '24/7 Vehicle Availability'
    },
    {
      icon: 'local_taxi',
      title: 'Local & Outstation',
      desc: 'Comfortable taxi cabs',
      serviceKey: 'Local Taxi'
    },
    {
      icon: 'flight_takeoff',
      title: 'Airport & Railway',
      desc: 'Prompt station pickups',
      serviceKey: 'Airport Pickup & Drop'
    },
    {
      icon: 'temple_hindu',
      title: 'Pilgrimage Tours',
      desc: 'Kashi, Ayodhya, Prayagraj',
      serviceKey: 'Pilgrimage Tours'
    },
    {
      icon: 'celebration',
      title: 'Wedding & Events',
      desc: 'Luxury fleet rental',
      serviceKey: 'Wedding & Event Transportation'
    }
  ];

  return (
    <section className="bg-[#f3f3f4] py-8 border-y border-[#e2e2e2]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 overflow-x-auto">
        <div className="flex items-center gap-4 min-w-max pb-1">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onSelectService(item.serviceKey)}
              className="flex items-center gap-3 px-4 py-3 bg-white rounded-xl shadow-xs border border-[#e2e2e2] hover:border-[#fed65b] hover:shadow-md transition-all text-left cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-lg bg-[#f3f3f4] group-hover:bg-[#fed65b]/20 flex items-center justify-center transition-colors">
                <span className="material-symbols-outlined text-[#735c00] text-[24px]">
                  {item.icon}
                </span>
              </div>
              <div>
                <span className="block font-headline font-bold text-xs text-[#1a1c1c] group-hover:text-[#0d1c32]">
                  {item.title}
                </span>
                <span className="block text-[11px] text-[#44474d]">{item.desc}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
