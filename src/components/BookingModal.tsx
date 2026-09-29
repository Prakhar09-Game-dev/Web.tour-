import React, { useState, useEffect } from 'react';
import type { Vehicle, TripType, Booking } from '../types.js';
import { useAuth } from '../context/AuthContext.js';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicles: Vehicle[];
  initialData?: {
    pickupLocation?: string;
    dropLocation?: string;
    travelDate?: string;
    pickupTime?: string;
    tripType?: string;
    vehicleId?: string;
  };
  onBookingSuccess?: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  vehicles,
  initialData,
  onBookingSuccess
}) => {
  const { user } = useAuth();
  const today = new Date().toISOString().split('T')[0];

  const [pickup, setPickup] = useState('Varanasi Junction');
  const [drop, setDrop] = useState('Kashi Vishwanath Temple');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('09:00');
  const [tripType, setTripType] = useState<TripType>('Local Sightseeing');
  const [selectedVehicleId, setSelectedVehicleId] = useState(vehicles[0]?.id || 'veh-dzire');
  const [passengers, setPassengers] = useState(2);
  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [customerEmail, setCustomerEmail] = useState(user?.email || '');
  const [specialRequirements, setSpecialRequirements] = useState('');

  const [loadingQuote, setLoadingQuote] = useState(false);
  const [quoteData, setQuoteData] = useState<{
    estimatedFare: number | null;
    breakdown: {
      baseFare: number;
      kmRate: number;
      estimatedKm: number;
      nightCharge: number;
      driverAllowance: number;
      tollTaxEstimate: number;
    } | null;
    note: string;
  } | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);

  // Sync initialData
  useEffect(() => {
    if (initialData) {
      if (initialData.pickupLocation) setPickup(initialData.pickupLocation);
      if (initialData.dropLocation) setDrop(initialData.dropLocation);
      if (initialData.travelDate) setDate(initialData.travelDate);
      if (initialData.pickupTime) setTime(initialData.pickupTime);
      if (initialData.tripType) setTripType(initialData.tripType as TripType);
      if (initialData.vehicleId) setSelectedVehicleId(initialData.vehicleId);
    }
  }, [initialData]);

  // Sync logged in user data
  useEffect(() => {
    if (user) {
      if (!customerName) setCustomerName(user.name);
      if (!customerPhone) setCustomerPhone(user.phone);
      if (!customerEmail) setCustomerEmail(user.email);
    }
  }, [user]);

  // Fetch live transparent quote whenever route, time, or vehicle changes
  useEffect(() => {
    if (!selectedVehicleId) return;

    let isMounted = true;
    setLoadingQuote(true);

    fetch('/api/quotes/calculate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vehicleId: selectedVehicleId,
        tripType,
        pickupLocation: pickup,
        dropLocation: drop,
        pickupTime: time
      })
    })
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setQuoteData(data);
          setLoadingQuote(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadingQuote(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedVehicleId, tripType, pickup, drop, time]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    try {
      const token = localStorage.getItem('vtt_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          vehicleId: selectedVehicleId,
          pickupLocation: pickup,
          dropLocation: drop,
          travelDate: date,
          pickupTime: time,
          tripType,
          passengers,
          specialRequirements
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit booking request.');
      }

      setConfirmedBooking(data.booking);
      if (onBookingSuccess) {
        onBookingSuccess(data.booking);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Failed to process booking. Please contact 9559113710.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#e2e2e2] overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-[#0d1c32] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#fed65b] text-[#0d1c32] flex items-center justify-center font-bold">
              V
            </span>
            <div>
              <h2 className="font-headline font-bold text-base text-white">
                {confirmedBooking ? 'Booking Request Received' : 'Reserve Your Vehicle'}
              </h2>
              <span className="text-[11px] text-[#b9c7e4]">
                Vimal Tour & Travellers, Varanasi • 24/7 Available
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              setConfirmedBooking(null);
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {confirmedBooking ? (
            <div className="space-y-6">
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <span className="material-symbols-outlined text-emerald-600 text-[48px]">
                  check_circle
                </span>
                <span className="inline-block px-3 py-1 bg-emerald-700 text-white rounded-full font-mono font-bold text-xs">
                  Booking ID: {confirmedBooking.id}
                </span>
                <h3 className="font-headline font-bold text-xl text-emerald-950">
                  Booking Request Received!
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{confirmedBooking.customerName}</strong>. Our Varanasi operations manager has logged your booking. A courteous driver will be assigned to your itinerary.
                </p>
              </div>

              {/* Booking Summary Box */}
              <div className="bg-[#f9f9f9] p-4 rounded-xl border border-[#e2e2e2] text-xs space-y-2">
                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#e2e2e2]">
                  <div>
                    <span className="text-[#75777e] block">Vehicle:</span>
                    <span className="font-bold text-[#0d1c32]">{confirmedBooking.vehicleName} ({confirmedBooking.vehicleType})</span>
                  </div>
                  <div>
                    <span className="text-[#75777e] block">Estimated Fare:</span>
                    <span className="font-bold text-[#0d1c32] font-mono">
                      {confirmedBooking.estimatedPrice ? `₹${confirmedBooking.estimatedPrice}` : 'Quote on confirmation'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pb-2 border-b border-[#e2e2e2]">
                  <div>
                    <span className="text-[#75777e] block">Pickup:</span>
                    <span className="font-semibold text-[#1a1c1c]">{confirmedBooking.pickupLocation}</span>
                  </div>
                  <div>
                    <span className="text-[#75777e] block">Destination:</span>
                    <span className="font-semibold text-[#1a1c1c]">{confirmedBooking.dropLocation}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[#75777e] block">Date:</span>
                    <span className="font-semibold text-[#1a1c1c]">{confirmedBooking.travelDate}</span>
                  </div>
                  <div>
                    <span className="text-[#75777e] block">Time:</span>
                    <span className="font-semibold text-[#1a1c1c]">{confirmedBooking.pickupTime}</span>
                  </div>
                  <div>
                    <span className="text-[#75777e] block">Status:</span>
                    <span className="inline-block px-2 py-0.5 bg-amber-100 text-amber-900 rounded font-bold text-[10px]">
                      {confirmedBooking.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/919559113710?text=Hello%20Vimal%20Tour%20%26%20Travellers%2C%20I%20have%20submitted%20Booking%20ID%20${confirmedBooking.id}%20for%20${confirmedBooking.travelDate}%20from%20${confirmedBooking.pickupLocation}%20to%20${confirmedBooking.dropLocation}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-[#25D366] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:scale-[1.02] transition-transform text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Confirm on WhatsApp</span>
                </a>

                <a
                  href="tel:9559113710"
                  className="py-3 px-4 bg-[#0d1c32] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#000000] transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>Call Helpline (9559113710)</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
                  <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Route & Trip Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Trip Type
                  </label>
                  <select
                    value={tripType}
                    onChange={(e) => setTripType(e.target.value as TripType)}
                    className="w-full px-2.5 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs font-medium cursor-pointer"
                  >
                    <option value="Local Sightseeing">Local Sightseeing</option>
                    <option value="Outstation One-Way">Outstation One-Way</option>
                    <option value="Round Trip">Round Trip</option>
                    <option value="Airport Transfer">Airport Transfer</option>
                    <option value="Railway Station Transfer">Railway Station Transfer</option>
                    <option value="Pilgrimage Package">Pilgrimage Package</option>
                    <option value="Wedding & Event">Wedding & Event</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Pickup Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Varanasi Cantt, Airport, Hotel"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                  />
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Drop / Destination *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kashi Vishwanath, Ayodhya"
                    value={drop}
                    onChange={(e) => setDrop(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                  />
                </div>
              </div>

              {/* Date, Time, Passengers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Travel Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={today}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Pickup Time *
                  </label>
                  <input
                    type="time"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Passengers *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={selectedVehicle?.seatingCapacity || 17}
                    required
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                  />
                </div>
              </div>

              {/* Vehicle Selection with Capacity & Image thumbnail */}
              <div>
                <label className="block text-xs font-semibold text-[#44474d] mb-1">
                  Select Vehicle *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {vehicles.map((v) => {
                    const isSelected = selectedVehicleId === v.id;
                    return (
                      <div
                        key={v.id}
                        onClick={() => setSelectedVehicleId(v.id)}
                        className={`p-2.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#0d1c32] text-white border-[#0d1c32] shadow-sm'
                            : 'bg-[#f9f9f9] text-[#1a1c1c] border-[#e2e2e2] hover:bg-[#f3f3f4]'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <img
                            src={v.imageUrl}
                            alt={v.name}
                            className="w-10 h-7 object-cover rounded shrink-0"
                          />
                          <div className="overflow-hidden">
                            <span className="block font-bold text-[11px] truncate">{v.name}</span>
                            <span className={`text-[10px] block ${isSelected ? 'text-[#ffe088]' : 'text-[#735c00]'}`}>
                              {v.type} ({v.seatingCapacity} seat)
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Quotation Breakdown Box */}
              <div className="bg-[#f3f3f4] p-3.5 rounded-xl border border-[#c5c6cd]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-[#735c00]">
                      receipt_long
                    </span>
                    <span className="font-bold text-xs text-[#0d1c32]">
                      Transparent Estimated Fare:
                    </span>
                  </div>
                  <div>
                    {loadingQuote ? (
                      <span className="text-xs text-[#75777e]">Calculating fare...</span>
                    ) : quoteData && quoteData.estimatedFare ? (
                      <span className="font-headline font-bold text-base text-[#0d1c32] font-mono">
                        ₹{quoteData.estimatedFare.toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-xs text-[#75777e]">Price confirmed after enquiry</span>
                    )}
                  </div>
                </div>

                {quoteData?.breakdown && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-[#515f78] mt-2 pt-2 border-t border-[#e2e2e2]">
                    <div>Base Fare: ₹{quoteData.breakdown.baseFare}</div>
                    <div>Est. Distance: {quoteData.breakdown.estimatedKm} km</div>
                    <div>Night Charge: ₹{quoteData.breakdown.nightCharge}</div>
                    <div>Toll / Allowance: ₹{quoteData.breakdown.driverAllowance + quoteData.breakdown.tollTaxEstimate}</div>
                  </div>
                )}
                <span className="text-[10px] text-[#75777e] block mt-1 italic">
                  * No hidden charges. Tolls & parking as per actual receipts.
                </span>
              </div>

              {/* Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunil Verma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#44474d] mb-1">
                  Special Requirements (Luggage, Child, Elderly assistance)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need extra boot space for 3 suitcases, flight 6E-205 arrival..."
                  value={specialRequirements}
                  onChange={(e) => setSpecialRequirements(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#000000] text-white font-headline font-bold text-xs sm:text-sm rounded-xl hover:bg-[#0d1c32] transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {submitting ? 'progress_activity' : 'check_circle'}
                  </span>
                  <span>{submitting ? 'PROCESSING BOOKING...' : 'CONFIRM & SUBMIT BOOKING REQUEST'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
