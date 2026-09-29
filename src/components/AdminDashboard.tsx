import React, { useState, useEffect } from 'react';
import type { Booking, Enquiry, Vehicle, AdminStats, BookingStatus, EnquiryStatus, VehicleStatus } from '../types.js';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [activeTab, setActiveTab] = useState<'bookings' | 'enquiries' | 'fleet'>('bookings');
  const [loading, setLoading] = useState(true);

  // Edit Booking Modal State
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [editStatus, setEditStatus] = useState<BookingStatus>('PENDING');
  const [editDriverName, setEditDriverName] = useState('');
  const [editDriverPhone, setEditDriverPhone] = useState('');
  const [editFinalPrice, setEditFinalPrice] = useState<string>('');
  const [editNotes, setEditNotes] = useState('');
  const [editVehicleId, setEditVehicleId] = useState('');
  const [savingBooking, setSavingBooking] = useState(false);

  // Add Vehicle Modal State
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    name: '',
    brand: 'Maruti Suzuki',
    type: 'Sedan',
    seatingCapacity: 4,
    luggageCapacity: 2,
    acType: 'AC',
    baseFare: 1800,
    perKmRate: 12,
    perDayRate: 2500,
    status: 'AVAILABLE',
    description: '',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjhN9_TWs8-IAgJRWHiKEiGET4r-WedIMlolYNBF6w1bdWAVZ5YbxA9IdVgCsddusTgGI3H8ouNshBDzIyzPM6mWR6Cqe6ttcHfd16T9m4EYYvpJOOecazlyCUnMJ5AKDKE14kCdb77O6ibiWZGez9RkMZrhTjF4MguGbvcIuS3pQQMwwlhsnxYEbsyZLhqOiwEGZuhK3PdsEwZJXnz997m5jMkeeGVaGMOtR8K08kbzS2Hb5b6Dk'
  });

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('vtt_token');
      const headers = { Authorization: `Bearer ${token}` };

      const [statsRes, bookRes, enqRes, vehRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/bookings', { headers }),
        fetch('/api/enquiries', { headers }),
        fetch('/api/vehicles')
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (bookRes.ok) setBookings(await bookRes.json());
      if (enqRes.ok) setEnquiries(await enqRes.json());
      if (vehRes.ok) setVehicles(await vehRes.json());
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openEditBooking = (b: Booking) => {
    setSelectedBooking(b);
    setEditStatus(b.status);
    setEditDriverName(b.driverName || '');
    setEditDriverPhone(b.driverPhone || '');
    setEditFinalPrice(b.finalPrice ? String(b.finalPrice) : (b.estimatedPrice ? String(b.estimatedPrice) : ''));
    setEditNotes(b.notes || '');
    setEditVehicleId(b.vehicleId);
  };

  const handleSaveBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    setSavingBooking(true);
    try {
      const token = localStorage.getItem('vtt_token');
      const res = await fetch(`/api/bookings/${selectedBooking.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          status: editStatus,
          driverName: editDriverName,
          driverPhone: editDriverPhone,
          finalPrice: editFinalPrice ? Number(editFinalPrice) : null,
          notes: editNotes,
          vehicleId: editVehicleId
        })
      });

      if (res.ok) {
        setSelectedBooking(null);
        await fetchData();
      }
    } catch (err) {
      console.error('Failed to update booking:', err);
    } finally {
      setSavingBooking(false);
    }
  };

  const handleUpdateEnquiryStatus = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      const token = localStorage.getItem('vtt_token');
      const res = await fetch(`/api/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error('Failed to update enquiry status:', err);
    }
  };

  const handleUpdateVehicleStatus = async (vehicleId: string, newStatus: VehicleStatus) => {
    try {
      const token = localStorage.getItem('vtt_token');
      const res = await fetch(`/api/vehicles/${vehicleId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        await fetchData();
      }
    } catch (err) {
      console.error('Failed to update vehicle status:', err);
    }
  };

  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('vtt_token');
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newVehicle)
      });
      if (res.ok) {
        setShowAddVehicle(false);
        await fetchData();
      }
    } catch (err) {
      console.error('Failed to add vehicle:', err);
    }
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 md:px-6">
      {/* Admin Header */}
      <div className="bg-[#0d1c32] text-white p-6 sm:p-8 rounded-2xl shadow-sm mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 bg-[#fed65b] text-[#0d1c32] font-bold text-[10px] uppercase rounded">
              ADMIN CONTROL CENTER
            </span>
            <span className="text-xs text-[#ffe088]">● Live Dispatch & Bookings</span>
          </div>
          <h1 className="font-headline font-bold text-2xl sm:text-3xl text-white">
            Vimal Tour & Travellers Operations
          </h1>
          <p className="text-xs text-[#b9c7e4] mt-1">
            Manage fleet availability, customer bookings, driver assignments, and customer inquiries.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddVehicle(true)}
            className="px-4 py-2 bg-white text-[#0d1c32] font-bold text-xs rounded-xl hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            Add Vehicle
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-[#e2e2e2] shadow-xs">
            <span className="text-[11px] text-[#75777e] block">Today's Trips</span>
            <span className="font-headline font-bold text-2xl text-[#0d1c32] font-mono">
              {stats.todayBookingsCount}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#e2e2e2] shadow-xs">
            <span className="text-[11px] text-[#75777e] block">Pending Bookings</span>
            <span className="font-headline font-bold text-2xl text-amber-600 font-mono">
              {stats.pendingBookingsCount}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#e2e2e2] shadow-xs">
            <span className="text-[11px] text-[#75777e] block">Confirmed Trips</span>
            <span className="font-headline font-bold text-2xl text-emerald-600 font-mono">
              {stats.confirmedBookingsCount}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#e2e2e2] shadow-xs">
            <span className="text-[11px] text-[#75777e] block">Available Fleet</span>
            <span className="font-headline font-bold text-2xl text-[#0d1c32] font-mono">
              {stats.availableVehiclesCount} / {stats.totalVehiclesCount}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#e2e2e2] shadow-xs">
            <span className="text-[11px] text-[#75777e] block">New Enquiries</span>
            <span className="font-headline font-bold text-2xl text-blue-600 font-mono">
              {stats.newEnquiriesCount}
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-[#e2e2e2] shadow-xs">
            <span className="text-[11px] text-[#75777e] block">Confirmed Pipeline</span>
            <span className="font-headline font-bold text-2xl text-[#0d1c32] font-mono">
              ₹{stats.totalRevenue.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#e2e2e2] pb-2 mb-6">
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-[#0d1c32] text-white'
              : 'text-[#44474d] hover:bg-[#f3f3f4]'
          }`}
        >
          Bookings Management ({bookings.length})
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'enquiries'
              ? 'bg-[#0d1c32] text-white'
              : 'text-[#44474d] hover:bg-[#f3f3f4]'
          }`}
        >
          Customer Enquiries ({enquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('fleet')}
          className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
            activeTab === 'fleet'
              ? 'bg-[#0d1c32] text-white'
              : 'text-[#44474d] hover:bg-[#f3f3f4]'
          }`}
        >
          Vehicle Fleet ({vehicles.length})
        </button>
      </div>

      {/* Bookings Tab */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl border border-[#e2e2e2] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f3f3f4] text-[#44474d] font-bold border-b border-[#e2e2e2]">
                <tr>
                  <th className="p-3.5">Booking ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Vehicle</th>
                  <th className="p-3.5">Trip Details</th>
                  <th className="p-3.5">Date & Time</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Chauffeur</th>
                  <th className="p-3.5">Fare</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e2]">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-[#f9f9f9]">
                    <td className="p-3.5 font-mono font-bold text-[#0d1c32]">
                      {b.id}
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-[#1a1c1c] block">{b.customerName}</span>
                      <span className="text-[#75777e] font-mono text-[11px] block">{b.customerPhone}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold block">{b.vehicleName}</span>
                      <span className="text-[10px] text-[#735c00]">{b.vehicleType}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="max-w-xs truncate font-medium">
                        {b.pickupLocation} → {b.dropLocation}
                      </div>
                      <span className="text-[10px] text-[#75777e]">{b.tripType}</span>
                    </td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className="block font-medium">{b.travelDate}</span>
                      <span className="text-[11px] text-[#75777e]">{b.pickupTime}</span>
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          b.status === 'CONFIRMED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : b.status === 'DRIVER_ASSIGNED'
                            ? 'bg-blue-100 text-blue-800'
                            : b.status === 'ON_TRIP'
                            ? 'bg-purple-100 text-purple-800'
                            : b.status === 'COMPLETED'
                            ? 'bg-gray-100 text-gray-800'
                            : b.status === 'CANCELLED'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <span className="text-xs text-[#1a1c1c] block">
                        {b.driverName || '— Unassigned —'}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-[#0d1c32]">
                      {b.finalPrice ? `₹${b.finalPrice}` : b.estimatedPrice ? `₹${b.estimatedPrice}` : '—'}
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <button
                        onClick={() => openEditBooking(b)}
                        className="px-3 py-1 bg-[#0d1c32] text-white rounded text-xs font-bold hover:bg-[#000000] cursor-pointer"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Enquiries Tab */}
      {activeTab === 'enquiries' && (
        <div className="bg-white rounded-xl border border-[#e2e2e2] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#f3f3f4] text-[#44474d] font-bold border-b border-[#e2e2e2]">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Client Name</th>
                  <th className="p-3.5">Phone (WhatsApp)</th>
                  <th className="p-3.5">Route</th>
                  <th className="p-3.5">Vehicle / Service</th>
                  <th className="p-3.5">Message</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e2e2e2]">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-[#f9f9f9]">
                    <td className="p-3.5 whitespace-nowrap text-[#75777e]">
                      {new Date(enq.createdAt).toLocaleDateString('en-GB')}
                    </td>
                    <td className="p-3.5 font-bold text-[#0d1c32]">{enq.name}</td>
                    <td className="p-3.5 font-mono">
                      <a href={`tel:${enq.phone}`} className="hover:underline font-bold">
                        {enq.phone}
                      </a>
                    </td>
                    <td className="p-3.5">
                      <div className="font-medium">{enq.pickup} → {enq.destination}</div>
                      <span className="text-[10px] text-[#75777e]">Travel: {enq.date}</span>
                    </td>
                    <td className="p-3.5">
                      <span className="font-semibold block">{enq.vehiclePreference}</span>
                      <span className="text-[10px] text-[#75777e]">{enq.service}</span>
                    </td>
                    <td className="p-3.5 max-w-xs truncate text-[#44474d]">
                      {enq.message || '—'}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                          enq.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : enq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'Quoted'
                            ? 'bg-purple-100 text-purple-800'
                            : enq.status === 'Closed'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <select
                        value={enq.status}
                        onChange={(e) => handleUpdateEnquiryStatus(enq.id, e.target.value as EnquiryStatus)}
                        className="px-2 py-1 bg-[#f3f3f4] border border-[#c5c6cd] rounded text-xs font-semibold cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Quoted">Quoted</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fleet Tab */}
      {activeTab === 'fleet' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map((veh) => (
            <div
              key={veh.id}
              className="bg-white rounded-xl border border-[#e2e2e2] shadow-xs overflow-hidden flex flex-col justify-between"
            >
              <div>
                <img
                  src={veh.imageUrl}
                  alt={veh.name}
                  className="h-44 w-full object-cover"
                />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline font-bold text-base text-[#0d1c32]">
                      {veh.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#f3f3f4] text-[#0d1c32]">
                      {veh.type}
                    </span>
                  </div>

                  <p className="text-xs text-[#44474d] mb-4">
                    {veh.seatingCapacity} Seater • {veh.acType} • {veh.luggageCapacity} Bags
                  </p>

                  <div className="bg-[#f9f9f9] p-3 rounded-lg text-xs space-y-1 mb-4 border border-[#e2e2e2]">
                    <div className="flex justify-between">
                      <span className="text-[#75777e]">Base 8hr/80km:</span>
                      <span className="font-bold text-[#0d1c32]">₹{veh.baseFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#75777e]">Rate per Km:</span>
                      <span className="font-bold text-[#0d1c32]">₹{veh.perKmRate}/km</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-[#e2e2e2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#75777e] block">Current Status</span>
                  <select
                    value={veh.status}
                    onChange={(e) => handleUpdateVehicleStatus(veh.id, e.target.value as VehicleStatus)}
                    className="px-2 py-1 bg-[#f3f3f4] border border-[#c5c6cd] rounded text-xs font-bold cursor-pointer"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="BOOKED">BOOKED</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Booking Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#e2e2e2] animate-in zoom-in-95 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#e2e2e2] mb-4">
              <div>
                <h3 className="font-headline font-bold text-lg text-[#0d1c32]">
                  Manage Booking {selectedBooking.id}
                </h3>
                <span className="text-xs text-[#75777e]">
                  Customer: {selectedBooking.customerName} ({selectedBooking.customerPhone})
                </span>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBooking} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#44474d] mb-1">Trip Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as BookingStatus)}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs font-bold"
                >
                  <option value="PENDING">PENDING (Awaiting Review)</option>
                  <option value="CONFIRMED">CONFIRMED (Booking Approved)</option>
                  <option value="DRIVER_ASSIGNED">DRIVER_ASSIGNED</option>
                  <option value="ON_TRIP">ON_TRIP (Vehicle In Transit)</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-[#44474d] mb-1">Assign / Change Vehicle</label>
                <select
                  value={editVehicleId}
                  onChange={(e) => setEditVehicleId(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                >
                  {vehicles.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} ({v.type})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#44474d] mb-1">Chauffeur Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh Kumar"
                    value={editDriverName}
                    onChange={(e) => setEditDriverName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#44474d] mb-1">Chauffeur Phone</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9453636321"
                    value={editDriverPhone}
                    onChange={(e) => setEditDriverPhone(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#44474d] mb-1">Final Agreed Fare (₹)</label>
                <input
                  type="number"
                  placeholder="Set final quote"
                  value={editFinalPrice}
                  onChange={(e) => setEditFinalPrice(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#44474d] mb-1">Internal Notes / Instructions</label>
                <textarea
                  rows={2}
                  placeholder="Add route guidelines, advance payment notes, or pickup remarks..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e2e2e2]">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 bg-gray-100 text-[#44474d] rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingBooking}
                  className="px-5 py-2 bg-[#0d1c32] text-white rounded-lg font-bold hover:bg-[#000000] cursor-pointer"
                >
                  {savingBooking ? 'Saving...' : 'Save & Update Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#e2e2e2] animate-in zoom-in-95 my-8">
            <h3 className="font-headline font-bold text-lg text-[#0d1c32] mb-3">
              Add Vehicle to Fleet
            </h3>

            <form onSubmit={handleAddVehicle} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-[#44474d] mb-1">Vehicle Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maruti Suzuki Ciaz"
                  value={newVehicle.name}
                  onChange={(e) => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#44474d] mb-1">Type</label>
                  <select
                    value={newVehicle.type}
                    onChange={(e) => setNewVehicle({ ...newVehicle, type: e.target.value })}
                    className="w-full px-2 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd]"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="MUV">MUV</option>
                    <option value="Luxury SUV">Luxury SUV</option>
                    <option value="Hatchback">Hatchback</option>
                    <option value="Group Tour Van">Group Tour Van</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#44474d] mb-1">Seating Capacity</label>
                  <input
                    type="number"
                    min={2}
                    value={newVehicle.seatingCapacity}
                    onChange={(e) => setNewVehicle({ ...newVehicle, seatingCapacity: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#44474d] mb-1">Base Fare (8hr/80km)</label>
                  <input
                    type="number"
                    value={newVehicle.baseFare}
                    onChange={(e) => setNewVehicle({ ...newVehicle, baseFare: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#44474d] mb-1">Per Km Rate (₹)</label>
                  <input
                    type="number"
                    value={newVehicle.perKmRate}
                    onChange={(e) => setNewVehicle({ ...newVehicle, perKmRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#44474d] mb-1">Image URL</label>
                <input
                  type="text"
                  value={newVehicle.imageUrl}
                  onChange={(e) => setNewVehicle({ ...newVehicle, imageUrl: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f3f3f4] rounded-lg border border-[#c5c6cd]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#e2e2e2]">
                <button
                  type="button"
                  onClick={() => setShowAddVehicle(false)}
                  className="px-4 py-2 bg-gray-100 text-[#44474d] rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#000000] text-white rounded-lg font-bold hover:bg-[#0d1c32]"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
