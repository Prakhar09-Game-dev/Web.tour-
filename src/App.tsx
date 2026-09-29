import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.js';
import type { Language } from './i18n/translations.js';
import type { Vehicle, TourPackage, Destination, GalleryItem, Booking } from './types.js';

import { Header } from './components/Header.js';
import { HeroSection } from './components/HeroSection.js';
import { QuickServiceStrip } from './components/QuickServiceStrip.js';
import { FeaturedVehicles } from './components/FeaturedVehicles.js';
import { VaranasiToursSection } from './components/VaranasiToursSection.js';
import { WhyChooseUs } from './components/WhyChooseUs.js';
import { ServicesView } from './components/ServicesView.js';
import { TourPackagesView } from './components/TourPackagesView.js';
import { VaranasiSightseeingView } from './components/VaranasiSightseeingView.js';
import { PilgrimageToursView } from './components/PilgrimageToursView.js';
import { GalleryView } from './components/GalleryView.js';
import { AboutContactView } from './components/AboutContactView.js';
import { CustomerDashboard } from './components/CustomerDashboard.js';
import { AdminDashboard } from './components/AdminDashboard.js';
import { BookingModal } from './components/BookingModal.js';
import { VehicleDetailsModal } from './components/VehicleDetailsModal.js';
import { AuthModal } from './components/AuthModal.js';
import { Footer } from './components/Footer.js';
import { FloatingCTAs } from './components/FloatingCTAs.js';
import { MobileStickyBar } from './components/MobileStickyBar.js';

function MainApp() {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [lang, setLang] = useState<Language>('en');

  // Application Data
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Modals
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [bookingInitialData, setBookingInitialData] = useState<{
    pickupLocation?: string;
    dropLocation?: string;
    travelDate?: string;
    pickupTime?: string;
    tripType?: string;
    vehicleId?: string;
  } | undefined>(undefined);
  const [detailsVehicle, setDetailsVehicle] = useState<Vehicle | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [vehRes, pkgRes, destRes, galRes] = await Promise.all([
          fetch('/api/vehicles'),
          fetch('/api/tour-packages'),
          fetch('/api/destinations'),
          fetch('/api/gallery')
        ]);

        if (vehRes.ok) setVehicles(await vehRes.json());
        if (pkgRes.ok) setPackages(await pkgRes.json());
        if (destRes.ok) setDestinations(await destRes.json());
        if (galRes.ok) setGallery(await galRes.json());
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const openBookingModalWithData = (data?: {
    pickupLocation?: string;
    dropLocation?: string;
    travelDate?: string;
    pickupTime?: string;
    tripType?: string;
    vehicleId?: string;
  }) => {
    setBookingInitialData(data);
    setBookingModalOpen(true);
  };

  const handleBookingCreated = (_newBooking: Booking) => {
    // If user is customer or admin, they can view in dashboard
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c] flex flex-col font-body pb-14 md:pb-0">
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        openBookingModal={() => openBookingModalWithData()}
        openAuthModal={() => setAuthModalOpen(true)}
      />

      <main className="flex-1 w-full pt-20">
        {loading ? (
          <div className="min-h-[500px] flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-10 h-10 border-4 border-[#0d1c32] border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs text-[#515f78] font-bold">Loading Vimal Tour & Travellers Fleet...</p>
            </div>
          </div>
        ) : (
          <>
            {currentTab === 'home' && (
              <>
                <HeroSection
                  lang={lang}
                  vehicles={vehicles}
                  onOpenBooking={(data) => openBookingModalWithData(data)}
                  onExploreFleet={() => setCurrentTab('our-vehicles')}
                />
                <QuickServiceStrip
                  onSelectService={(serviceKey) => {
                    openBookingModalWithData({ tripType: serviceKey });
                  }}
                />
                <FeaturedVehicles
                  vehicles={vehicles}
                  lang={lang}
                  onBookVehicle={(vehId) => openBookingModalWithData({ vehicleId: vehId })}
                  onViewDetails={(veh) => setDetailsVehicle(veh)}
                  onViewAll={() => setCurrentTab('our-vehicles')}
                />
                <VaranasiToursSection
                  packages={packages}
                  lang={lang}
                  onRequestQuote={(pkg) => {
                    openBookingModalWithData({
                      dropLocation: pkg.destination,
                      tripType: pkg.category === 'Pilgrimage' ? 'Pilgrimage Package' : 'Local Sightseeing'
                    });
                  }}
                />
                <WhyChooseUs lang={lang} />
              </>
            )}

            {currentTab === 'our-vehicles' && (
              <div className="py-6">
                <FeaturedVehicles
                  vehicles={vehicles}
                  lang={lang}
                  onBookVehicle={(vehId) => openBookingModalWithData({ vehicleId: vehId })}
                  onViewDetails={(veh) => setDetailsVehicle(veh)}
                  onViewAll={() => {}}
                />
              </div>
            )}

            {currentTab === 'services' && (
              <ServicesView
                lang={lang}
                onBookService={(serviceName) => {
                  openBookingModalWithData({ tripType: serviceName });
                }}
              />
            )}

            {currentTab === 'tour-packages' && (
              <TourPackagesView
                packages={packages}
                onSelectPackage={(pkg) => {
                  openBookingModalWithData({
                    dropLocation: pkg.destination,
                    tripType: pkg.category === 'Pilgrimage' ? 'Pilgrimage Package' : 'Local Sightseeing'
                  });
                }}
              />
            )}

            {currentTab === 'varanasi-sightseeing' && (
              <VaranasiSightseeingView
                destinations={destinations}
                onBookSightseeing={(destName) => {
                  openBookingModalWithData({
                    dropLocation: destName,
                    tripType: 'Local Sightseeing'
                  });
                }}
              />
            )}

            {currentTab === 'pilgrimage-tours' && (
              <PilgrimageToursView
                onBookPilgrimage={(pilgrimageName) => {
                  openBookingModalWithData({
                    dropLocation: pilgrimageName,
                    tripType: 'Pilgrimage Package'
                  });
                }}
              />
            )}

            {currentTab === 'about-us' && <AboutContactView />}
            {currentTab === 'contact' && <AboutContactView />}
            {currentTab === 'gallery' && <GalleryView items={gallery} />}

            {currentTab === 'dashboard' && (
              <CustomerDashboard onOpenBooking={() => openBookingModalWithData()} />
            )}

            {currentTab === 'admin' && (
              user && user.role === 'ADMIN' ? (
                <AdminDashboard />
              ) : (
                <div className="py-20 text-center space-y-4">
                  <span className="material-symbols-outlined text-[48px] text-[#ba1a1a]">
                    lock
                  </span>
                  <h2 className="font-headline font-bold text-xl text-[#0d1c32]">
                    Admin Access Required
                  </h2>
                  <p className="text-xs text-[#44474d]">
                    Please sign in using administrator credentials to view fleet logs.
                  </p>
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="px-5 py-2.5 bg-[#0d1c32] text-white font-bold text-xs rounded-xl"
                  >
                    Open Admin Sign In
                  </button>
                </div>
              )
            )}
          </>
        )}
      </main>

      <Footer
        lang={lang}
        onNavigate={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <FloatingCTAs />

      <MobileStickyBar onOpenBooking={() => openBookingModalWithData()} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        vehicles={vehicles}
        initialData={bookingInitialData}
        onBookingSuccess={handleBookingCreated}
      />

      {/* Vehicle Details Modal */}
      <VehicleDetailsModal
        vehicle={detailsVehicle}
        onClose={() => setDetailsVehicle(null)}
        onBookNow={(vehId) => {
          setDetailsVehicle(null);
          openBookingModalWithData({ vehicleId: vehId });
        }}
      />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          if (user?.role === 'ADMIN') {
            setCurrentTab('admin');
          } else {
            setCurrentTab('dashboard');
          }
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
