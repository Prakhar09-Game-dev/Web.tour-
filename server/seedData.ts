import type { Vehicle, TourPackage, Destination, Review, GalleryItem } from './types.js';

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh-dzire',
    name: 'Maruti Suzuki Dzire',
    brand: 'Maruti Suzuki',
    model: 'Dzire VXi/ZXi',
    type: 'Sedan',
    seatingCapacity: 5, // 4+1
    luggageCapacity: 2,
    acType: 'AC',
    features: ['4+1 Seater', 'AC', '2 Bags Luggage', 'Comfortable Legroom', 'Music System', 'Phone Charger'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjhN9_TWs8-IAgJRWHiKEiGET4r-WedIMlolYNBF6w1bdWAVZ5YbxA9IdVgCsddusTgGI3H8ouNshBDzIyzPM6mWR6Cqe6ttcHfd16T9m4EYYvpJOOecazlyCUnMJ5AKDKE14kCdb77O6ibiWZGez9RkMZrhTjF4MguGbvcIuS3pQQMwwlhsnxYEbsyZLhqOiwEGZuhK3PdsEwZJXnz997m5jMkeeGVaGMOtR8K08kbzS2Hb5b6Dk',
    baseFare: 1800,
    perKmRate: 12,
    perDayRate: 2500,
    status: 'AVAILABLE',
    localAvailable: true,
    outstationAvailable: true,
    description: 'Ideal for small families, business trips, airport transfers, and comfortable city commutes in Varanasi.'
  },
  {
    id: 'veh-ertiga',
    name: 'Maruti Suzuki Ertiga',
    brand: 'Maruti Suzuki',
    model: 'Ertiga ZXi Hybrid',
    type: 'MUV',
    seatingCapacity: 7, // 6+1
    luggageCapacity: 3,
    acType: 'AC with Rear Vents',
    features: ['6+1 Seater', 'AC', '3 Bags Luggage', 'Rear AC Vents', 'Foldable Seats', 'Spacious Cabin'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4zDhORrgdXFgh87H-wj2lFlFVTX1xspcK7pYUFZ2ciO2YkEqc56uO8HCiRDDI5hHUZqVma_qkEh6MPqQV4cXJzS6LpNgSjzTSLc0p5jzk5wKTlo5vNK3mFavecJH6UNoIJJmCfo0KU-oDMXg15K7eLTcTpUlk9KPleC6LWmk9vghBnRBH0N182sRXd2yr3HplJUDBPssRj3lu6zDsXr06DE9pQjcQoiye3HpqEQQg9MbVYa4hCUE',
    baseFare: 2400,
    perKmRate: 15,
    perDayRate: 3200,
    status: 'AVAILABLE',
    localAvailable: true,
    outstationAvailable: true,
    description: 'Spacious 6-7 seater MUV perfect for medium family tours, Ayodhya trips, and outstation pilgrimages.'
  },
  {
    id: 'veh-innova',
    name: 'Toyota Innova Crysta',
    brand: 'Toyota',
    model: 'Innova Crysta 2.4 VX',
    type: 'Luxury SUV',
    seatingCapacity: 8, // 7+1
    luggageCapacity: 4,
    acType: 'Dual Zone Climate Control',
    features: ['7+1 Seater', 'Dual AC', '4+ Bags Luggage', 'Captain Seats', 'Superior Suspension', 'Highway Stability'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXHUU5WWvYfu6qiaPyuw_YsmeetHvWem_X6p5P5fuTi37nIqirTAkukgvoyjwrLCcWKl1ARTj4T7Hd05WCoG-ig7B_3HKqkijPR9v7Hu0q25l5lrtR-n8eT5ZiI0Nv3JQcoboo66Abh0v2h5VFXYSHirWC3Jl2KqTgsW1BJFbfiNn2gVIOsJ_syIOPlkY3x9qCH81oSXTVXl2-h0QMRs1bN5Xkgx12r9KlJnbSmNBPUJz6i--mTZY',
    baseFare: 3200,
    perKmRate: 19,
    perDayRate: 4200,
    status: 'AVAILABLE',
    localAvailable: true,
    outstationAvailable: true,
    description: 'The gold standard for luxury travel, VIP protocol, pilgrimage journeys, and corporate executive hire.'
  },
  {
    id: 'veh-wagonr',
    name: 'Maruti Suzuki WagonR',
    brand: 'Maruti Suzuki',
    model: 'WagonR VXi',
    type: 'Hatchback',
    seatingCapacity: 5, // 4+1
    luggageCapacity: 2,
    acType: 'AC',
    features: ['4+1 Seater', 'AC', '2 Bags Luggage', 'Tall Boy Design', 'City Agility', 'Economical Fare'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBMnNv96qHHtrb3AHPOwP06oaxTQbD67RyGXTje1bw9HNOtj9RfnJ4nwPyTKz7kMcAeoCZwduR8uhuLpzjskEKJ5V9x0A3pu2YVSJx3uQJEj4Ccj3Cakcs62-hiMv5nn0G3dvQXg-5jac9PC1WyjriTH0riih1llbQkgCL7uRKPruzbfcr3c9ACJlcnEtgNvYxmDTIROhaPPV5WuzpjQD4VoLa0yoW6_nxkMdxrxbSBcNOpysYrgIg',
    baseFare: 1400,
    perKmRate: 11,
    perDayRate: 2000,
    status: 'AVAILABLE',
    localAvailable: true,
    outstationAvailable: false,
    description: 'Economical choice for solo travelers, couple sightseeing, quick ghat visits, and city drops.'
  },
  {
    id: 'veh-traveller',
    name: 'Force Traveller (12 to 17 Seater)',
    brand: 'Force Motors',
    model: 'Traveller 3350 Luxury',
    type: 'Group Tour Van',
    seatingCapacity: 17, // 16+1
    luggageCapacity: 8,
    acType: 'Powerful High-Capacity AC',
    features: ['12-17 Seater', 'Powerful AC', 'Pushback Reclining Seats', 'Overhead Luggage Rack', 'Surround Sound', 'Large Windows'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCivSFvF_p6SfdpuKHoirF1EdWSA8u5olfPXloNj8F3sCw1VDG--HhCpOb4tqXCfmsbk7_l0XD7loLCIvSbX5_JN9OrjCgIx_Tm2pvSnW2kPAJaPKauxdpC8syqpH4ZgCds0VgdDzVHivJqycDeEQnncfwa4b8P3hf__Cbjbjeka4BOKV75XW8avYskFGZrDP8i6Q69xV1h_o8q9eoub7mUslo7fUycECdXbJsmxHp1dxmxYj_a2to',
    baseFare: 4800,
    perKmRate: 25,
    perDayRate: 6500,
    status: 'AVAILABLE',
    localAvailable: true,
    outstationAvailable: true,
    description: 'Ultimate comfort for large family groups, pilgrimage yatras to Ayodhya and Prayagraj, and corporate outings.'
  }
];

export const initialTourPackages: TourPackage[] = [
  {
    id: 'pkg-kashi-ghats',
    name: 'Kashi Vishwanath & Ghats Darshan',
    destination: 'Varanasi',
    duration: 'Full Day (8-10 Hours)',
    description: 'Complete spiritual immersion in Varanasi covering Shri Kashi Vishwanath Corridor, Annapurna Mandir, Kaal Bhairav, Sankat Mochan, Tulsi Manas Mandir, BHU New Vishwanath, Durga Kund, and reserved boat pickup for the mesmerizing Evening Ganga Aarti at Dashashwamedh Ghat.',
    vehicleOptions: ['Sedan (Dzire)', 'MUV (Ertiga)', 'SUV (Innova Crysta)', 'Tempo Traveller'],
    includedServices: ['Dedicated AC Cab', 'Verified Chauffeur', 'Fuel, Toll & Parking', 'Local Temple Guidance', 'Complimentary Water Bottles'],
    excludedServices: ['Temple VIP ticket fees', 'Boat ride fee', 'Personal meals & offerings'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZgkoIfJi7b_jIylM_E9rj1dls1l7skxDOZk4bTKw84VgVsuWZd1-8mkvLewVwXP8a86Y-ltCn0gmLMX8G4xQv1er6kj0zL1o9AslV_ZOEgX9PYWD8f662yyeozgHZfRySbTkuadmRW1tUCFHYBPfYRAnuIHw6_q-iOQOqRSy9Qs4lchbxJkylLcPKqcGEQ-OnWBdUP0v6Rd5TYiEIWR7iE4ZuFfzkbLV3FDSXtXpEibM3fSrvsY',
    startingPrice: 2200,
    active: true,
    category: 'Sightseeing'
  },
  {
    id: 'pkg-sarnath-tour',
    name: 'Sarnath Buddhist Heritage Tour',
    destination: 'Sarnath',
    duration: 'Half Day (4-5 Hours)',
    description: 'Discover the holy birthplace of Dhamma where Lord Buddha delivered his first sermon. Tour includes Dhamek Stupa, Chaukhandi Stupa, the Archaeological Museum housing the original Ashoka Lion Capital, Mulagandha Kuti Vihar, and peaceful Japanese & Thai monasteries.',
    vehicleOptions: ['Hatchback (WagonR)', 'Sedan (Dzire)', 'Innova Crysta'],
    includedServices: ['Doorstep Hotel Pickup & Drop', 'AC Vehicle', 'Toll & Parking', 'Courteous Driver'],
    excludedServices: ['Museum entry ticket (₹25)', 'Guide fee'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrZ76-cK_-rfsaK9Q8ZB23WRQUZQxhfjWydmoByvcJvsmr5iewqNbyq6Vms2AYPQGZMG_3xe42d1ujzOdHh2LX8KXQcvAHFVyM0Tyb1qULoPXXxr9BHQsQOl9AMf0BzHevQ3ZJHhgqfU7OX2JivOsLWJnrHXiiqxNhESR5QIO_syMSdFQ2LMtEOKNiCsq2jVw17aR5z88GB8dQdIkhjy3_pheXC7i5n41UhSsg8kG6eIkITFFWNbY',
    startingPrice: 1600,
    active: true,
    category: 'Sightseeing'
  },
  {
    id: 'pkg-ayodhya-yatra',
    name: 'Ayodhya Ram Mandir Yatra',
    destination: 'Ayodhya',
    duration: 'Same Day Excursion (14-16 Hours)',
    description: 'Comfortable same-day pilgrimage from Varanasi to Ayodhya Dham via Purvanchal Expressway. Experience Shri Ram Janmabhoomi Teerth Kshetra, Hanuman Garhi temple darshan, Kanak Bhavan, Dashrath Mahal, and the tranquil evening Aarti at Saryu River Ghats before evening return to Varanasi.',
    vehicleOptions: ['Sedan (Dzire)', 'MUV (Ertiga)', 'Toyota Innova Crysta', '17-Seater Force Traveller'],
    includedServices: ['Smooth Highway AC Taxi', 'Expressway Toll & State Taxes', 'Chauffeur Allowance', 'Clean Sanitized Vehicle', 'Flexible Stops'],
    excludedServices: ['VIP Darshan pass fees', 'Meals & refreshments'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd3Zud8rrwT73GqeiUrCEpFQrnoLPkwjGsDtE6wXx5J2TIKcoREnfrNWWY3W_eimmKFEUzW71E2OW8vPKIpR4hLvnylPqT4pSoObOOvHKtBExX5Vo6kMTNSukFIgdbh983wEQ-5dWAmpnsIPcIPp88YeJnCY6a2_Cgar7nDe5G-HAR6AseSVAGCXLHd2MC3L7JAkdxUit4Jt-hRECPNorWzGMfz1NJOk44F-jO1UKgpfWp8uCCmBc',
    startingPrice: 5500,
    active: true,
    category: 'Pilgrimage'
  },
  {
    id: 'pkg-prayagraj-sangam',
    name: 'Prayagraj Triveni Sangam Darshan',
    destination: 'Prayagraj',
    duration: 'Same Day Excursion (10-12 Hours)',
    description: 'Varanasi to Prayagraj holy tour for the sacred Triveni Sangam snan (confluence of Ganga, Yamuna, and mythical Saraswati). Visit the legendary Bade Hanuman Mandir (reclining posture), Akshayavat tree, historic Anand Bhavan, and Allahabad Fort panorama.',
    vehicleOptions: ['Sedan (Dzire)', 'MUV (Ertiga)', 'Innova Crysta', 'Force Traveller'],
    includedServices: ['Roundtrip AC Cab', 'NH19 Tolls & Parking', 'Driver Food Allowance', 'Flexible Itinerary'],
    excludedServices: ['Sangam boat charges', 'Priest Dakshina'],
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQHa-V89Y8AAyJz2DMANlyTaL-q_uz8_OM5K5piRyh3RjOx5OvoN9p2VTVgMTYbP_afap8_GlXTdomfhSsSNEuqZOvPf81AAG0aAHk19hNmZ-SCfBiXA-6LMs5Bl8o9ipozV8p2cy6mELaEDQxKyFGweJsXs4GQ2Dr8sSD7MY3J52Vu7GCBHPt9jVgBmjqErVWvuwK3xx6SZpR4A6m662shY_odVUeTetez0UGkgc1PE-WSo9aW9c',
    startingPrice: 3800,
    active: true,
    category: 'Pilgrimage'
  }
];

export const initialDestinations: Destination[] = [
  {
    id: 'dest-kashi',
    name: 'Kashi Vishwanath Temple & Corridor',
    category: 'Sightseeing',
    description: 'One of the 12 Jyotirlingas, reconstructed into an expansive, world-class river corridor connecting directly to the Ganga at Lalita Ghat.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0ZgkoIfJi7b_jIylM_E9rj1dls1l7skxDOZk4bTKw84VgVsuWZd1-8mkvLewVwXP8a86Y-ltCn0gmLMX8G4xQv1er6kj0zL1o9AslV_ZOEgX9PYWD8f662yyeozgHZfRySbTkuadmRW1tUCFHYBPfYRAnuIHw6_q-iOQOqRSy9Qs4lchbxJkylLcPKqcGEQ-OnWBdUP0v6Rd5TYiEIWR7iE4ZuFfzkbLV3FDSXtXpEibM3fSrvsY',
    highlights: ['Golden Shikhara', 'Direct Ghat Connectivity', 'Mangala Aarti Darshan', 'Annapurna Shrine']
  },
  {
    id: 'dest-sarnath',
    name: 'Sarnath Archaeological Complex',
    category: 'Sightseeing',
    description: 'The ancient deer park where Lord Buddha gave the Dhammacakkappavattana Sutta, featuring the massive 5th-century Dhamek Stupa.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrZ76-cK_-rfsaK9Q8ZB23WRQUZQxhfjWydmoByvcJvsmr5iewqNbyq6Vms2AYPQGZMG_3xe42d1ujzOdHh2LX8KXQcvAHFVyM0Tyb1qULoPXXxr9BHQsQOl9AMf0BzHevQ3ZJHhgqfU7OX2JivOsLWJnrHXiiqxNhESR5QIO_syMSdFQ2LMtEOKNiCsq2jVw17aR5z88GB8dQdIkhjy3_pheXC7i5n41UhSsg8kG6eIkITFFWNbY',
    highlights: ['Dhamek Stupa', 'Ashoka Pillar', 'Thai Monastery & 80ft Buddha', 'Archaeological Museum']
  },
  {
    id: 'dest-ayodhya',
    name: 'Ayodhya Ram Janmabhoomi Temple',
    category: 'Pilgrimage',
    description: 'The sacred birthplace of Shri Rama in Ayodhya Dham, featuring the newly inaugurated grand Nagara-style stone temple and Ram Ki Paidi.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd3Zud8rrwT73GqeiUrCEpFQrnoLPkwjGsDtE6wXx5J2TIKcoREnfrNWWY3W_eimmKFEUzW71E2OW8vPKIpR4hLvnylPqT4pSoObOOvHKtBExX5Vo6kMTNSukFIgdbh983wEQ-5dWAmpnsIPcIPp88YeJnCY6a2_Cgar7nDe5G-HAR6AseSVAGCXLHd2MC3L7JAkdxUit4Jt-hRECPNorWzGMfz1NJOk44F-jO1UKgpfWp8uCCmBc',
    highlights: ['Ram Lalla Darshan', 'Hanuman Garhi', 'Saryu River Aarti', 'Kanak Bhavan']
  },
  {
    id: 'dest-prayagraj',
    name: 'Prayagraj Triveni Sangam',
    category: 'Pilgrimage',
    description: 'The holy confluence of three sacred rivers: Ganga, Yamuna, and mythical Saraswati. Site of the world-famous Maha Kumbh Mela.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQHa-V89Y8AAyJz2DMANlyTaL-q_uz8_OM5K5piRyh3RjOx5OvoN9p2VTVgMTYbP_afap8_GlXTdomfhSsSNEuqZOvPf81AAG0aAHk19hNmZ-SCfBiXA-6LMs5Bl8o9ipozV8p2cy6mELaEDQxKyFGweJsXs4GQ2Dr8sSD7MY3J52Vu7GCBHPt9jVgBmjqErVWvuwK3xx6SZpR4A6m662shY_odVUeTetez0UGkgc1PE-WSo9aW9c',
    highlights: ['Sangam Holy Snan', 'Reclining Hanuman Mandir', 'Alopi Devi Shaktipeeth', 'Anand Bhavan']
  }
];

export const initialReviews: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Rajesh Sharma',
    rating: 5,
    comment: 'Booked Innova Crysta for our family pilgrimage covering Kashi, Ayodhya, and Prayagraj. Driver Mr. Vimal was exceptionally polite, knowledgeable about temple timings, and handled elderly parents with great care.',
    vehicleOrTour: 'Toyota Innova Crysta / 3-City Yatra',
    date: '15 Sep 2026',
    verified: true,
    approved: true
  },
  {
    id: 'rev-2',
    customerName: 'Ananya Mukherjee',
    rating: 5,
    comment: 'Punctual airport pickup at midnight from Babatpur Airport to Lanka hotel in Varanasi. Dzire was spotless and AC was freezing cold. Transparent billing with no hidden extras!',
    vehicleOrTour: 'Maruti Suzuki Dzire / Airport Transfer',
    date: '10 Sep 2026',
    verified: true,
    approved: true
  },
  {
    id: 'rev-3',
    customerName: 'Dr. K. S. Venkatesh',
    rating: 5,
    comment: 'We booked the 17-seater Force Traveller for our 14-member group from Bangalore. Outstanding experience through the crowded Varanasi lanes and highway to Ayodhya. Highly recommended!',
    vehicleOrTour: 'Force Traveller / Ayodhya & Varanasi Tour',
    date: '02 Sep 2026',
    verified: true,
    approved: true
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Fleet Ready for Darshan',
    category: 'Vehicles',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjhN9_TWs8-IAgJRWHiKEiGET4r-WedIMlolYNBF6w1bdWAVZ5YbxA9IdVgCsddusTgGI3H8ouNshBDzIyzPM6mWR6Cqe6ttcHfd16T9m4EYYvpJOOecazlyCUnMJ5AKDKE14kCdb77O6ibiWZGez9RkMZrhTjF4MguGbvcIuS3pQQMwwlhsnxYEbsyZLhqOiwEGZuhK3PdsEwZJXnz997m5jMkeeGVaGMOtR8K08kbzS2Hb5b6Dk',
    caption: 'Sanitized Swift Dzire cabs ready for city transit at Lanka, Varanasi.'
  },
  {
    id: 'gal-2',
    title: 'Ganga Aarti Majesty',
    category: 'Varanasi',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBxFSedgleJnO7BZ1_GZ0TPfFyVjBGEWusxy4EHucWtN9LxQx-PKGzk3e7ujzbxM0Kjk6tzTzp0_1LoXfwyhv0xtG6TwGbJRd_EFA9WskWr7NEftQ9Cjd2AavaC0_HsT00WncUXH3T2Ig46gAQvo90kc4-ShC1e8dTNnLUPKB0z2aS_U1RMaNij2tqPH3ZVl0On8Kz8McQDajB0bhy7WMfx13fhNt3GH_P0uRJTUY5S2I_t8GUlRM',
    caption: 'Evening Maha Aarti lights on Dashashwamedh Ghat viewed from the holy river.'
  },
  {
    id: 'gal-3',
    title: 'Executive Innova Crysta',
    category: 'Vehicles',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXHUU5WWvYfu6qiaPyuw_YsmeetHvWem_X6p5P5fuTi37nIqirTAkukgvoyjwrLCcWKl1ARTj4T7Hd05WCoG-ig7B_3HKqkijPR9v7Hu0q25l5lrtR-n8eT5ZiI0Nv3JQcoboo66Abh0v2h5VFXYSHirWC3Jl2KqTgsW1BJFbfiNn2gVIOsJ_syIOPlkY3x9qCH81oSXTVXl2-h0QMRs1bN5Xkgx12r9KlJnbSmNBPUJz6i--mTZY',
    caption: 'Premium SUV ready for corporate and VIP pilgrimage tours.'
  },
  {
    id: 'gal-4',
    title: 'Ayodhya Shri Ram Mandir',
    category: 'Pilgrimage',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAd3Zud8rrwT73GqeiUrCEpFQrnoLPkwjGsDtE6wXx5J2TIKcoREnfrNWWY3W_eimmKFEUzW71E2OW8vPKIpR4hLvnylPqT4pSoObOOvHKtBExX5Vo6kMTNSukFIgdbh983wEQ-5dWAmpnsIPcIPp88YeJnCY6a2_Cgar7nDe5G-HAR6AseSVAGCXLHd2MC3L7JAkdxUit4Jt-hRECPNorWzGMfz1NJOk44F-jO1UKgpfWp8uCCmBc',
    caption: 'Ayodhya same-day return trip destination with comfortable highway transit.'
  }
];
