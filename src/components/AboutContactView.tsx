import React, { useState } from 'react';

export const AboutContactView: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Booking Inquiry',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit contact message');
      }
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: 'Booking Inquiry', message: '' });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Something went wrong. Please call directly at 9559113710.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 md:px-6">
      {/* About Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs font-bold text-[#735c00] uppercase tracking-widest block">
            ABOUT OUR ENTERPRISE
          </span>
          <h1 className="font-headline font-bold text-3xl md:text-4xl text-[#0d1c32] tracking-tight">
            Vimal Tour & Travellers, Varanasi
          </h1>
          <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
            Headquartered near Paramhansh Ashram at Murari Chauk, Lanka in Varanasi, Vimal Tour & Travellers has been serving pilgrims, tourists, corporate clients, and local residents with dependable, comfortable taxi rentals and curated holiday packages.
          </p>
          <p className="text-xs sm:text-sm text-[#44474d] leading-relaxed">
            Our mission is simple: provide clean, well-maintained vehicles with polite, verified local chauffeurs who respect your schedule, prioritize passenger safety, and possess intimate knowledge of Kashi’s sacred ghats, temple rituals, and highway corridors.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-white rounded-xl border border-[#e2e2e2] shadow-xs">
              <span className="block font-headline font-bold text-xl text-[#0d1c32]">24/7 Availability</span>
              <span className="text-xs text-[#75777e]">Ready for emergency station & airport pickups at any hour.</span>
            </div>
            <div className="p-4 bg-white rounded-xl border border-[#e2e2e2] shadow-xs">
              <span className="block font-headline font-bold text-xl text-[#0d1c32]">100% Reliable</span>
              <span className="text-xs text-[#75777e]">Verified, courteous drivers with commercial highway licenses.</span>
            </div>
          </div>
        </div>

        {/* Real Vehicle Assets Card */}
        <div className="lg:col-span-6 bg-[#0d1c32] text-white p-6 sm:p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
            <div>
              <span className="font-headline font-bold text-xl block text-white">Vimal Tour & Travellers</span>
              <span className="text-xs text-[#b9c7e4]">Registered Travel & Fleet Operator</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#fed65b] text-[#0d1c32] flex items-center justify-center font-bold">
              V
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#fed65b] text-[20px] shrink-0 mt-0.5">location_on</span>
              <div>
                <span className="font-bold text-white block">Official Office Address:</span>
                <span className="text-[#b9c7e4] leading-relaxed">
                  Near Paramhansh Ashram Murari Chauk, Patel Nagar, Bhagwanpur, Lanka, Varanasi, Uttar Pradesh 221005, India
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#fed65b] text-[20px] shrink-0 mt-0.5">call</span>
              <div>
                <span className="font-bold text-white block">Helpline Numbers (Click to Call):</span>
                <div className="flex flex-wrap gap-3 mt-1">
                  <a href="tel:+919559113710" className="text-[#ffe088] font-bold font-mono text-sm underline hover:text-white">
                    +91 9559113710
                  </a>
                  <span className="text-white/40">|</span>
                  <a href="tel:+919453636321" className="text-[#ffe088] font-bold font-mono text-sm underline hover:text-white">
                    +91 9453636321
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#25D366] text-[20px] shrink-0 mt-0.5">chat</span>
              <div>
                <span className="font-bold text-white block">Instant WhatsApp Support:</span>
                <a
                  href="https://wa.me/919559113710?text=Hello%20Vimal%20Tour%20%26%20Travellers%2C%20I%20would%20like%20to%20enquire%20about%20a%20vehicle%20booking."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-bold hover:scale-105 transition-transform"
                >
                  <span>Chat with Us on WhatsApp</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Map Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-[#e2e2e2] shadow-xs">
          <h2 className="font-headline font-bold text-xl text-[#0d1c32] mb-2">
            Send Us an Enquiry / Message
          </h2>
          <p className="text-xs text-[#44474d] mb-6">
            Fill out your trip requirements below. Our reservations manager will contact you promptly with complete itinerary options.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
              <span className="material-symbols-outlined text-emerald-600 text-[36px]">check_circle</span>
              <h3 className="font-headline font-bold text-base text-emerald-900">Enquiry Received!</h3>
              <p className="text-xs text-emerald-700">
                Thank you for contacting Vimal Tour & Travellers. Our team has received your enquiry and will call you on your phone within 15 minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-1.5 bg-emerald-700 text-white rounded-lg text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">Mobile Number (WhatsApp) *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">Subject / Requirement</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs"
                  >
                    <option value="Booking Inquiry">Vehicle Booking Inquiry</option>
                    <option value="Varanasi Sightseeing">Kashi Sightseeing Package</option>
                    <option value="Ayodhya Yatra">Ayodhya Ram Mandir Yatra</option>
                    <option value="Prayagraj Sangam">Prayagraj Sangam Tour</option>
                    <option value="Airport Pickup">Airport / Station Pickup</option>
                    <option value="Wedding Bulk Fleet">Wedding & Event Bulk Fleet</option>
                    <option value="Other">Other Query</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44474d] mb-1">Your Trip Details / Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide details like expected travel date, pickup location, number of passengers, and preferred car..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] focus:outline-none focus:border-[#0d1c32] text-xs"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 bg-[#000000] text-white font-bold text-xs rounded-lg hover:bg-[#0d1c32] transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>{submitting ? 'Submitting...' : 'Submit Message'}</span>
              </button>
            </form>
          )}
        </div>

        {/* Location & Map Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#e2e2e2] shadow-xs">
            <h2 className="font-headline font-bold text-lg text-[#0d1c32] mb-3">
              Office Location in Varanasi
            </h2>
            <p className="text-xs text-[#44474d] leading-relaxed mb-4">
              Conveniently situated near the prominent Paramhansh Ashram at Murari Chauk, Lanka, ensuring quick access to Banaras Hindu University, Assi Ghat, and the Southern Ring Road.
            </p>

            {/* Google Map representation container */}
            <div className="w-full h-56 rounded-xl overflow-hidden border border-[#c5c6cd] relative bg-[#e8e8e8] flex flex-col items-center justify-center text-center p-4">
              <span className="material-symbols-outlined text-[#ba1a1a] text-[40px] mb-2 animate-bounce">
                location_on
              </span>
              <p className="font-bold text-xs text-[#0d1c32]">
                Murari Chauk, Patel Nagar, Bhagwanpur, Lanka, Varanasi
              </p>
              <p className="text-[11px] text-[#515f78] mt-1">
                Near Paramhansh Ashram • PIN 221005
              </p>
              <a
                href="https://maps.google.com/?q=Lanka+Varanasi+Uttar+Pradesh+India"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 px-3 py-1.5 bg-[#0d1c32] text-white rounded-lg text-[11px] font-bold inline-flex items-center gap-1 shadow-sm hover:bg-[#735c00] transition-colors"
              >
                <span>Open in Google Maps</span>
                <span className="material-symbols-outlined text-[14px]">open_in_new</span>
              </a>
            </div>
          </div>

          <div className="bg-[#f3f3f4] p-5 rounded-2xl border border-[#e2e2e2]">
            <h3 className="font-bold text-xs text-[#0d1c32] mb-1">Direct Emergency Dispatch</h3>
            <p className="text-[11px] text-[#44474d] leading-relaxed">
              If your train or flight is arriving in the next 1-2 hours, please call our 24/7 hotline directly at <a href="tel:9559113710" className="font-bold font-mono text-[#0d1c32] underline">9559113710</a> for fastest cab allocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
