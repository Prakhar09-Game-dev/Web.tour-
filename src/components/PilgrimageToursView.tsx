import React from 'react';

interface PilgrimageToursViewProps {
  onBookPilgrimage: (destination: string) => void;
}

export const PilgrimageToursView: React.FC<PilgrimageToursViewProps> = ({ onBookPilgrimage }) => {
  const pilgrimages = [
    {
      id: 'ayodhya',
      name: 'Ayodhya Shri Ram Mandir Dham',
      tag: 'Purvanchal Expressway Corridor',
      distance: '215 km (approx. 4.5 hours each way)',
      description: 'Same-day return or 2-day pilgrimage to Shri Ram Janmabhoomi Teerth Kshetra, Hanuman Garhi temple, Kanak Bhavan, and serene evening Aarti at Saryu River Ghats.',
      timing: 'Departure: 05:30 AM | Return: 10:00 PM',
      vehicles: 'Dzire, Ertiga, Innova Crysta, Force Traveller',
      fareEstimate: 'From ₹5,500 roundtrip (inclusive of fuel & tolls)',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd3Zud8rrwT73GqeiUrCEpFQrnoLPkwjGsDtE6wXx5J2TIKcoREnfrNWWY3W_eimmKFEUzW71E2OW8vPKIpR4hLvnylPqT4pSoObOOvHKtBExX5Vo6kMTNSukFIgdbh983wEQ-5dWAmpnsIPcIPp88YeJnCY6a2_Cgar7nDe5G-HAR6AseSVAGCXLHd2MC3L7JAkdxUit4Jt-hRECPNorWzGMfz1NJOk44F-jO1UKgpfWp8uCCmBc'
    },
    {
      id: 'prayagraj',
      name: 'Prayagraj Triveni Sangam Darshan',
      tag: 'Grand NH-19 Highway',
      distance: '125 km (approx. 2.5 hours each way)',
      description: 'Spiritual day trip for the holy bath at Triveni Sangam (confluence of Ganga, Yamuna, Saraswati), reclining Bade Hanuman Ji, Alopi Devi Shaktipeeth, and historic Anand Bhavan.',
      timing: 'Departure: 06:00 AM | Return: 06:00 PM',
      vehicles: 'Dzire, Ertiga, Innova Crysta, Force Traveller',
      fareEstimate: 'From ₹3,800 roundtrip',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQHa-V89Y8AAyJz2DMANlyTaL-q_uz8_OM5K5piRyh3RjOx5OvoN9p2VTVgMTYbP_afap8_GlXTdomfhSsSNEuqZOvPf81AAG0aAHk19hNmZ-SCfBiXA-6LMs5Bl8o9ipozV8p2cy6mELaEDQxKyFGweJsXs4GQ2Dr8sSD7MY3J52Vu7GCBHPt9jVgBmjqErVWvuwK3xx6SZpR4A6m662shY_odVUeTetez0UGkgc1PE-WSo9aW9c'
    },
    {
      id: 'vindhyachal',
      name: 'Maa Vindhyavasini Shaktipeeth & Sitamarhi',
      tag: 'Mirzapur Holy Circuit',
      distance: '75 km (approx. 2 hours each way)',
      description: 'Sacred Trikona Yatra covering Maa Vindhyavasini Temple, Kali Khoh, and Ashtabhuja Mandir in the Vindhya mountain range, with visit to Valmiki Ashram Sitamarhi.',
      timing: 'Departure: 07:00 AM | Return: 05:00 PM',
      vehicles: 'Sedan, Ertiga, Innova Crysta',
      fareEstimate: 'From ₹2,800 roundtrip',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZgkoIfJi7b_jIylM_E9rj1dls1l7skxDOZk4bTKw84VgVsuWZd1-8mkvLewVwXP8a86Y-ltCn0gmLMX8G4xQv1er6kj0zL1o9AslV_ZOEgX9PYWD8f662yyeozgHZfRySbTkuadmRW1tUCFHYBPfYRAnuIHw6_q-iOQOqRSy9Qs4lchbxJkylLcPKqcGEQ-OnWBdUP0v6Rd5TYiEIWR7iE4ZuFfzkbLV3FDSXtXpEibM3fSrvsY'
    },
    {
      id: 'gaya-pind-daan',
      name: 'Gaya & Bodh Gaya Pind Daan Yatra',
      tag: 'Spiritual Ancestral Rites',
      distance: '250 km (approx. 5.5 hours each way)',
      description: 'Complete pilgrimage for ancestral Pind Daan rituals at Vishnupad Temple on Falgu River, Falgu Akshayavat, and Mahabodhi Temple enlightenment tree in Bodh Gaya.',
      timing: 'Same day or 2-day package',
      vehicles: 'Ertiga, Innova Crysta, Force Traveller',
      fareEstimate: 'From ₹6,500 roundtrip',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrZ76-cK_-rfsaK9Q8ZB23WRQUZQxhfjWydmoByvcJvsmr5iewqNbyq6Vms2AYPQGZMG_3xe42d1ujzOdHh2LX8KXQcvAHFVyM0Tyb1qULoPXXxr9BHQsQOl9AMf0BzHevQ3ZJHhgqfU7OX2JivOsLWJnrHXiiqxNhESR5QIO_syMSdFQ2LMtEOKNiCsq2jVw17aR5z88GB8dQdIkhjy3_pheXC7i5n41UhSsg8kG6eIkITFFWNbY'
    }
  ];

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 md:px-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block mb-2">
          SACRED TIRTH YATRA CIRCUITS
        </span>
        <h1 className="font-headline font-bold text-3xl md:text-4xl text-[#0d1c32] mb-3">
          Pilgrimage Cabs & Tour Yatras from Varanasi
        </h1>
        <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
          Embark on your spiritual journeys with total peace of mind. Experienced chauffeurs, comfortable pushback seating, and disciplined driving for elders and families.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {pilgrimages.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl overflow-hidden border border-[#e2e2e2] shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              <div
                className="h-56 w-full bg-cover bg-center relative"
                style={{ backgroundImage: `url('${item.imageUrl}')` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#fed65b] text-[#0d1c32] px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                  <h2 className="font-headline font-bold text-xl sm:text-2xl mt-1 text-white">
                    {item.name}
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed mb-4">
                  {item.description}
                </p>

                <div className="space-y-2 text-xs bg-[#f9f9f9] p-4 rounded-xl border border-[#e2e2e2] mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#735c00]">distance</span>
                    <span className="font-semibold text-[#1a1c1c]">Distance:</span>
                    <span className="text-[#44474d]">{item.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#735c00]">schedule</span>
                    <span className="font-semibold text-[#1a1c1c]">Schedule:</span>
                    <span className="text-[#44474d]">{item.timing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] text-[#735c00]">directions_car</span>
                    <span className="font-semibold text-[#1a1c1c]">Vehicles:</span>
                    <span className="text-[#44474d]">{item.vehicles}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-[#e2e2e2] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-[#75777e] block">Estimated Roundtrip</span>
                <span className="font-headline font-bold text-sm text-[#0d1c32]">
                  {item.fareEstimate}
                </span>
              </div>
              <button
                onClick={() => onBookPilgrimage(item.name)}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#000000] text-white font-bold text-xs rounded-xl hover:bg-[#0d1c32] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book This Pilgrimage</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
