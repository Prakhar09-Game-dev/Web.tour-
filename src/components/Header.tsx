import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';
import type { Language } from '../i18n/translations.js';
import { translations } from '../i18n/translations.js';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  openBookingModal: (initialVehicleId?: string) => void;
  openAuthModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  openBookingModal,
  openAuthModal
}) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const t = translations[lang];

  const navLinks = [
    { id: 'home', label: t.navHome },
    { id: 'our-vehicles', label: t.navVehicles },
    { id: 'services', label: t.navServices },
    { id: 'tour-packages', label: t.navTourPackages },
    { id: 'varanasi-sightseeing', label: t.navVaranasiSightseeing },
    { id: 'pilgrimage-tours', label: t.navPilgrimage },
    { id: 'about-us', label: t.navAbout },
    { id: 'gallery', label: t.navGallery },
    { id: 'contact', label: t.navContact }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9f9]/95 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.06)] border-b border-[#e2e2e2]/60">
      <div className="h-20 max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Brand Zone */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[#0d1c32] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
            V
          </div>
          <div>
            <span className="block font-headline font-bold text-xl leading-tight text-[#0d1c32] tracking-tight">
              {t.brandName}
            </span>
            <span className="block text-[11px] font-semibold text-[#515f78] uppercase tracking-wider">
              {t.brandSubtitle}
            </span>
          </div>
        </div>

        {/* Navigation Links (Desktop) */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#0d1c32] text-white shadow-sm font-bold'
                    : 'text-[#44474d] hover:text-[#0d1c32] hover:bg-[#e2e2e2]/50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#c5c6cd] text-xs font-bold text-[#0d1c32] hover:bg-[#e2e2e2]/60 transition-colors"
            title="Switch Language / भाषा बदलें"
          >
            <span className="material-symbols-outlined text-[16px]">translate</span>
            <span>{lang === 'en' ? 'हिन्दी' : 'EN'}</span>
          </button>

          {/* Call CTA */}
          <a
            className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#e8e8e8] rounded-lg text-[#0d1c32] hover:bg-[#dadada] transition-colors"
            href="tel:9559113710"
            title="Call Helpline"
          >
            <span className="material-symbols-outlined text-[18px] text-[#0d1c32]">call</span>
            <span className="text-xs font-bold font-mono">9559113710</span>
          </a>

          {/* WhatsApp CTA */}
          <a
            className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 bg-[#25D366] text-white rounded-lg shadow-sm hover:scale-105 transition-transform"
            href="https://wa.me/919559113710?text=Hello%20Vimal%20Tour%20%26%20Travellers%2C%20I%20would%20like%20to%20enquire%20about%20a%20vehicle%20booking."
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </a>

          {/* Book A Vehicle Button */}
          <button
            onClick={() => openBookingModal()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#000000] text-white rounded-lg text-xs font-bold hover:bg-[#0d1c32] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-[16px] text-[#fed65b]">directions_car</span>
            <span>{t.bookAVehicle}</span>
          </button>

          {/* User Account / Profile */}
          <div className="relative">
            <button
              onClick={() => {
                if (!user) {
                  openAuthModal();
                } else {
                  setProfileDropdownOpen(!profileDropdownOpen);
                }
              }}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                user
                  ? user.role === 'ADMIN'
                    ? 'bg-[#fed65b] text-[#0d1c32] ring-2 ring-[#0d1c32]'
                    : 'bg-[#0d1c32] text-white'
                  : 'bg-[#000000] text-white hover:bg-[#0d1c32]'
              }`}
              title={user ? `${user.name} (${user.role})` : 'Login / Register'}
            >
              <span className="material-symbols-outlined text-[18px]">
                {user ? (user.role === 'ADMIN' ? 'admin_panel_settings' : 'person') : 'person'}
              </span>
            </button>

            {/* Profile Dropdown */}
            {profileDropdownOpen && user && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#e2e2e2] py-2 z-50">
                <div className="px-4 py-2 border-b border-[#e2e2e2]">
                  <p className="text-xs font-bold text-[#0d1c32] truncate">{user.name}</p>
                  <p className="text-[11px] text-[#515f78] truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold rounded bg-[#f3f3f4] text-[#0d1c32]">
                    {user.role}
                  </span>
                </div>

                {user.role === 'ADMIN' ? (
                  <button
                    onClick={() => {
                      setCurrentTab('admin');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#0d1c32] hover:bg-[#f3f3f4] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">dashboard</span>
                    Admin Control Center
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentTab('dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-semibold text-[#0d1c32] hover:bg-[#f3f3f4] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                    My Bookings & Trips
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[16px]">logout</span>
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#0d1c32] hover:bg-[#e2e2e2] rounded-lg"
            aria-label="Toggle Navigation Menu"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-[#e2e2e2] px-4 py-4 space-y-2 shadow-xl animate-in slide-in-from-top duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#e2e2e2]">
            <a
              href="tel:9559113710"
              className="flex items-center justify-center gap-1.5 py-2.5 bg-[#f3f3f4] text-[#0d1c32] rounded-lg text-xs font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              Call 9559113710
            </a>
            <a
              href="https://wa.me/919559113710"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 bg-[#25D366] text-white rounded-lg text-xs font-bold"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              WhatsApp
            </a>
          </div>

          <div className="flex flex-col gap-1 py-1">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                  currentTab === item.id
                    ? 'bg-[#0d1c32] text-white'
                    : 'text-[#44474d] hover:bg-[#f3f3f4]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-[#e2e2e2]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openBookingModal();
              }}
              className="w-full py-3 bg-[#0d1c32] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">directions_car</span>
              {t.bookAVehicle}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
