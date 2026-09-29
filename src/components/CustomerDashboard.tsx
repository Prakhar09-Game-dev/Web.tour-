import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.js';
import type { Booking } from '../types.js';

interface CustomerDashboardProps {
  onOpenBooking: () => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ onOpenBooking }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  // Review state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('vtt_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/bookings', { headers });
      const data = await res.json();
      if (Array.isArray(data)) {
        setBookings(data);
      }
    } catch (err) {
      console.error('Error fetching customer bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm(`Are you sure you want to cancel booking ${bookingId}?`)) {
      return;
    }

    setCancellingId(bookingId);
    try {
      const token = localStorage.getItem('vtt_token');
      const res = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'CANCELLED', notes: 'Cancelled by customer' })
      });
      if (res.ok) {
        await fetchBookings();
      }
    } catch (err) {
      console.error('Failed to cancel booking:', err);
    } finally {
      setCancellingId(null);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBookingForReview) return;

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: user?.name || selectedBookingForReview.customerName,
          rating,
          comment,
          vehicleOrTour: `${selectedBookingForReview.vehicleName} (${selectedBookingForReview.tripType})`
        })
      });
      if (res.ok) {
        setReviewSubmitted(true);
        setTimeout(() => {
          setShowReviewModal(false);
          setReviewSubmitted(false);
          setComment('');
          setSelectedBookingForReview(null);
        }, 1500);
      }
    } catch (err) {
      console.error('Review submit failed:', err);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 md:px-6">
      {/* Top Banner */}
      <div className="bg-[#0d1c32] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold text-[#fed65b] uppercase tracking-wider block mb-1">
            CUSTOMER PORTAL
          </span>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-white">
            Welcome, {user?.name || 'Valued Traveler'}
          </h1>
          <p className="text-xs text-[#b9c7e4] mt-1">
            Track your Varanasi taxi bookings, chauffeur assignments, and tour itineraries.
          </p>
        </div>
        <button
          onClick={onOpenBooking}
          className="px-5 py-2.5 bg-[#fed65b] text-[#241a00] font-bold text-xs rounded-xl hover:bg-[#ffe088] transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Book Another Vehicle</span>
        </button>
      </div>

      {/* Bookings Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-headline font-bold text-xl text-[#0d1c32]">
            My Bookings & Trip History
          </h2>
          <span className="text-xs text-[#75777e] font-mono">
            {bookings.length} {bookings.length === 1 ? 'Trip' : 'Trips'} Found
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-xs text-[#75777e]">
            Loading your bookings...
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-[#e2e2e2] space-y-4">
            <span className="material-symbols-outlined text-[48px] text-[#c5c6cd]">
              directions_car
            </span>
            <h3 className="font-headline font-bold text-lg text-[#0d1c32]">
              No Bookings Found Yet
            </h3>
            <p className="text-xs text-[#44474d] max-w-md mx-auto">
              You haven't requested any vehicle rides yet. Plan your Varanasi sightseeing or outstation yatra now.
            </p>
            <button
              onClick={onOpenBooking}
              className="px-6 py-2.5 bg-[#000000] text-white font-bold text-xs rounded-xl hover:bg-[#0d1c32] transition-colors"
            >
              Book Your First Ride
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const isCancelled = booking.status === 'CANCELLED';
              const isCompleted = booking.status === 'COMPLETED';
              const canCancel = !isCancelled && !isCompleted;

              const statusColor =
                booking.status === 'CONFIRMED'
                  ? 'bg-emerald-100 text-emerald-800'
                  : booking.status === 'DRIVER_ASSIGNED'
                  ? 'bg-blue-100 text-blue-800'
                  : booking.status === 'ON_TRIP'
                  ? 'bg-purple-100 text-purple-800'
                  : booking.status === 'COMPLETED'
                  ? 'bg-gray-100 text-gray-800'
                  : booking.status === 'CANCELLED'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-amber-100 text-amber-800';

              return (
                <div
                  key={booking.id}
                  className="bg-white rounded-xl border border-[#e2e2e2] p-5 shadow-xs hover:border-[#c5c6cd] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e2e2e2] gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs px-2.5 py-1 bg-[#0d1c32] text-white rounded">
                        {booking.id}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${statusColor}`}>
                        {booking.status}
                      </span>
                    </div>

                    <div className="text-xs font-mono font-bold text-[#0d1c32]">
                      Fare: {booking.finalPrice ? `₹${booking.finalPrice}` : booking.estimatedPrice ? `₹${booking.estimatedPrice} (Est.)` : 'Pending quote'}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
                    <div>
                      <span className="text-[#75777e] block">Vehicle:</span>
                      <span className="font-bold text-[#1a1c1c]">{booking.vehicleName} ({booking.vehicleType})</span>
                      <span className="text-[11px] text-[#515f78] block">{booking.tripType}</span>
                    </div>

                    <div>
                      <span className="text-[#75777e] block">Pickup & Destination:</span>
                      <div className="font-medium text-[#1a1c1c]">
                        <span className="text-emerald-700 font-bold">From:</span> {booking.pickupLocation}
                      </div>
                      <div className="font-medium text-[#1a1c1c]">
                        <span className="text-red-700 font-bold">To:</span> {booking.dropLocation}
                      </div>
                    </div>

                    <div>
                      <span className="text-[#75777e] block">Schedule & Passengers:</span>
                      <span className="font-semibold text-[#1a1c1c]">
                        📅 {booking.travelDate} at {booking.pickupTime}
                      </span>
                      <span className="text-[11px] text-[#515f78] block">
                        👤 {booking.passengers} Passengers
                      </span>
                    </div>
                  </div>

                  {booking.driverName && (
                    <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg text-xs text-blue-900 mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-blue-700">badge</span>
                        <span><strong>Assigned Chauffeur:</strong> {booking.driverName}</span>
                      </div>
                      {booking.driverPhone && (
                        <a href={`tel:${booking.driverPhone}`} className="font-bold font-mono text-blue-800 underline">
                          Call Chauffeur
                        </a>
                      )}
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#f3f3f4]">
                    <div className="flex items-center gap-2">
                      <a
                        href="tel:9559113710"
                        className="px-3 py-1.5 bg-[#f3f3f4] text-[#0d1c32] rounded-lg text-xs font-bold hover:bg-[#e8e8e8] flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">call</span>
                        Call Operator
                      </a>

                      <a
                        href={`https://wa.me/919559113710?text=Hello%20Vimal%20Tour%20%26%20Travellers%2C%20status%20update%20for%20my%20booking%20${booking.id}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-[#25D366] text-white rounded-lg text-xs font-bold hover:scale-105 transition-transform flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">chat</span>
                        WhatsApp Status
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <button
                          onClick={() => {
                            setSelectedBookingForReview(booking);
                            setShowReviewModal(true);
                          }}
                          className="px-3 py-1.5 bg-[#fed65b] text-[#241a00] rounded-lg text-xs font-bold cursor-pointer hover:bg-[#ffe088]"
                        >
                          Write a Review
                        </button>
                      )}

                      {canCancel && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          disabled={cancellingId === booking.id}
                          className="px-3 py-1.5 border border-red-300 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 cursor-pointer"
                        >
                          {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Review Modal */}
      {showReviewModal && selectedBookingForReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e2e2e2] animate-in zoom-in-95">
            <h3 className="font-headline font-bold text-lg text-[#0d1c32] mb-1">
              Rate Your Trip with Vimal Tour & Travellers
            </h3>
            <p className="text-xs text-[#44474d] mb-4">
              Booking ID: {selectedBookingForReview.id} • {selectedBookingForReview.vehicleName}
            </p>

            {reviewSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center text-xs font-bold">
                ✓ Thank you! Your review has been submitted.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Rating (Stars)
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`text-2xl cursor-pointer ${
                          star <= rating ? 'text-[#fed65b]' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#44474d] mb-1">
                    Your Feedback
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about the vehicle cleanliness, driver punctuality, and route experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2.5 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-[#44474d] hover:bg-[#f3f3f4] rounded-lg cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#000000] text-white text-xs font-bold rounded-lg hover:bg-[#0d1c32] cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
