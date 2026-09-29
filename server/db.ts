import fs from 'node:fs';
import path from 'node:path';
import type {
  User,
  Vehicle,
  Booking,
  Enquiry,
  TourPackage,
  Destination,
  Review,
  GalleryItem,
  ContactMessage,
  TripType
} from './types.js';
import { initialVehicles, initialTourPackages, initialDestinations, initialReviews, initialGallery } from './seedData.js';
import { hashPassword } from './auth.js';

interface DatabaseSchema {
  users: User[];
  vehicles: Vehicle[];
  bookings: Booking[];
  enquiries: Enquiry[];
  tourPackages: TourPackage[];
  destinations: Destination[];
  reviews: Review[];
  gallery: GalleryItem[];
  contactMessages: ContactMessage[];
  lastBookingNumber: number;
}

const DB_DIR = path.resolve('database');
const DB_FILE = path.join(DB_DIR, 'db.json');

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadDatabase();
  }

  private loadDatabase(): DatabaseSchema {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }

    if (fs.existsSync(DB_FILE)) {
      try {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(raw);
      } catch (err) {
        console.error('Failed reading database file, reinitializing:', err);
      }
    }

    // Default Seed
    const adminPass = hashPassword('admin123');
    const customerPass = hashPassword('customer123');

    const defaultAdmin: User = {
      id: 'usr-admin-1',
      name: 'Vimal Travel Admin',
      email: 'admin@vimaltravels.com',
      phone: '9559113710',
      passwordHash: adminPass.hash,
      salt: adminPass.salt,
      role: 'ADMIN',
      createdAt: new Date().toISOString()
    };

    const defaultCustomer: User = {
      id: 'usr-cust-1',
      name: 'Sunil Verma',
      email: 'customer@example.com',
      phone: '9876543210',
      passwordHash: customerPass.hash,
      salt: customerPass.salt,
      role: 'CUSTOMER',
      createdAt: new Date().toISOString()
    };

    const defaultBookings: Booking[] = [
      {
        id: 'VTT-2026-00001',
        customerId: defaultCustomer.id,
        customerName: 'Sunil Verma',
        customerPhone: '9876543210',
        customerEmail: 'customer@example.com',
        vehicleId: 'veh-dzire',
        vehicleName: 'Maruti Suzuki Dzire',
        vehicleType: 'Sedan',
        pickupLocation: 'Varanasi Junction (BSB)',
        dropLocation: 'Hotel Ganges Grand, Godowlia',
        travelDate: '2026-10-02',
        pickupTime: '09:00',
        tripType: 'Railway Station Transfer',
        passengers: 3,
        specialRequirements: 'Need infant car seat assistance and luggage space',
        status: 'CONFIRMED',
        estimatedPrice: 650,
        finalPrice: 650,
        driverName: 'Ramesh Kumar (Mob: 9453636321)',
        notes: 'Confirmed by operator. Chauffeur assigned.',
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'VTT-2026-00002',
        customerId: defaultCustomer.id,
        customerName: 'Pooja Agarwal',
        customerPhone: '9811223344',
        customerEmail: 'pooja.agarwal@example.com',
        vehicleId: 'veh-innova',
        vehicleName: 'Toyota Innova Crysta',
        vehicleType: 'Luxury SUV',
        pickupLocation: 'Lanka, BHU',
        dropLocation: 'Ayodhya Shri Ram Janmabhoomi & Return',
        travelDate: '2026-10-05',
        pickupTime: '06:00',
        tripType: 'Pilgrimage Package',
        passengers: 6,
        specialRequirements: 'Elderly parents travelling. Safe slow driving preferred.',
        status: 'PENDING',
        estimatedPrice: 6800,
        finalPrice: null,
        notes: 'Awaiting route schedule confirmation with client',
        createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    const defaultEnquiries: Enquiry[] = [
      {
        id: 'enq-1',
        name: 'Amitabh Mishra',
        phone: '9988776655',
        email: 'amitabh@gmail.com',
        pickup: 'Babatpur Airport (VNS)',
        destination: 'Assi Ghat',
        date: '2026-10-08',
        passengers: 4,
        vehiclePreference: 'Maruti Suzuki Ertiga',
        service: 'Airport Pickup & Drop',
        message: 'Looking for a prompt pickup from flight 6E-205 reaching 14:15.',
        status: 'New',
        createdAt: new Date().toISOString()
      }
    ];

    const initialDb: DatabaseSchema = {
      users: [defaultAdmin, defaultCustomer],
      vehicles: initialVehicles,
      bookings: defaultBookings,
      enquiries: defaultEnquiries,
      tourPackages: initialTourPackages,
      destinations: initialDestinations,
      reviews: initialReviews,
      gallery: initialGallery,
      contactMessages: [],
      lastBookingNumber: 2
    };

    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed writing initial DB file:', err);
    }

    return initialDb;
  }

  private save(): void {
    try {
      if (!fs.existsSync(DB_DIR)) {
        fs.mkdirSync(DB_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Failed writing database:', err);
    }
  }

  // --- Users ---
  getUsers(): User[] {
    return this.data.users;
  }

  findUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id: string): User | undefined {
    return this.data.users.find(u => u.id === id);
  }

  createUser(user: User): User {
    this.data.users.push(user);
    this.save();
    return user;
  }

  // --- Vehicles ---
  getVehicles(): Vehicle[] {
    return this.data.vehicles;
  }

  findVehicleById(id: string): Vehicle | undefined {
    return this.data.vehicles.find(v => v.id === id);
  }

  updateVehicle(id: string, updates: Partial<Vehicle>): Vehicle | null {
    const idx = this.data.vehicles.findIndex(v => v.id === id);
    if (idx === -1) return null;
    this.data.vehicles[idx] = { ...this.data.vehicles[idx], ...updates };
    this.save();
    return this.data.vehicles[idx];
  }

  createVehicle(vehicle: Vehicle): Vehicle {
    this.data.vehicles.push(vehicle);
    this.save();
    return vehicle;
  }

  deleteVehicle(id: string): boolean {
    const initialLen = this.data.vehicles.length;
    this.data.vehicles = this.data.vehicles.filter(v => v.id !== id);
    if (this.data.vehicles.length !== initialLen) {
      this.save();
      return true;
    }
    return false;
  }

  // --- Vehicle Availability Check ---
  checkAvailability(vehicleId: string, travelDate: string, returnDate?: string): { available: boolean; reason?: string } {
    const vehicle = this.findVehicleById(vehicleId);
    if (!vehicle) {
      return { available: false, reason: 'Vehicle does not exist.' };
    }
    if (vehicle.status !== 'AVAILABLE') {
      return { available: false, reason: `Vehicle is currently marked as ${vehicle.status.toLowerCase()}.` };
    }

    // Check collision with confirmed or pending bookings
    const checkStart = new Date(travelDate).getTime();
    const checkEnd = returnDate ? new Date(returnDate).getTime() : checkStart;

    const conflict = this.data.bookings.find(b => {
      if (b.vehicleId !== vehicleId) return false;
      if (b.status === 'CANCELLED' || b.status === 'COMPLETED') return false;

      const bStart = new Date(b.travelDate).getTime();
      const bEnd = b.returnDate ? new Date(b.returnDate).getTime() : bStart;

      // Overlap condition
      return checkStart <= bEnd && checkEnd >= bStart;
    });

    if (conflict) {
      return {
        available: false,
        reason: `Vehicle has a reserved trip on this date (Booking ID: ${conflict.id}). Please select another date or explore alternative vehicles in our fleet.`
      };
    }

    return { available: true };
  }

  // --- Bookings ---
  getBookings(): Booking[] {
    return [...this.data.bookings].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  findBookingById(id: string): Booking | undefined {
    return this.data.bookings.find(b => b.id.toLowerCase() === id.toLowerCase());
  }

  createBooking(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Booking {
    this.data.lastBookingNumber += 1;
    const seqStr = String(this.data.lastBookingNumber).padStart(5, '0');
    const newId = `VTT-2026-${seqStr}`;

    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.bookings.push(newBooking);
    this.save();
    return newBooking;
  }

  updateBooking(id: string, updates: Partial<Booking>): Booking | null {
    const idx = this.data.bookings.findIndex(b => b.id.toLowerCase() === id.toLowerCase());
    if (idx === -1) return null;

    this.data.bookings[idx] = {
      ...this.data.bookings[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.save();
    return this.data.bookings[idx];
  }

  // --- Enquiries ---
  getEnquiries(): Enquiry[] {
    return [...this.data.enquiries].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  createEnquiry(enquiryData: Omit<Enquiry, 'id' | 'createdAt'>): Enquiry {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      createdAt: new Date().toISOString()
    };
    this.data.enquiries.push(newEnquiry);
    this.save();
    return newEnquiry;
  }

  updateEnquiry(id: string, updates: Partial<Enquiry>): Enquiry | null {
    const idx = this.data.enquiries.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.data.enquiries[idx] = { ...this.data.enquiries[idx], ...updates };
    this.save();
    return this.data.enquiries[idx];
  }

  // --- Tour Packages ---
  getTourPackages(): TourPackage[] {
    return this.data.tourPackages;
  }

  createTourPackage(pkg: TourPackage): TourPackage {
    this.data.tourPackages.push(pkg);
    this.save();
    return pkg;
  }

  updateTourPackage(id: string, updates: Partial<TourPackage>): TourPackage | null {
    const idx = this.data.tourPackages.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.data.tourPackages[idx] = { ...this.data.tourPackages[idx], ...updates };
    this.save();
    return this.data.tourPackages[idx];
  }

  // --- Destinations ---
  getDestinations(): Destination[] {
    return this.data.destinations;
  }

  // --- Reviews ---
  getReviews(): Review[] {
    return this.data.reviews;
  }

  createReview(review: Review): Review {
    this.data.reviews.push(review);
    this.save();
    return review;
  }

  // --- Gallery ---
  getGallery(): GalleryItem[] {
    return this.data.gallery;
  }

  createGalleryItem(item: GalleryItem): GalleryItem {
    this.data.gallery.push(item);
    this.save();
    return item;
  }

  // --- Contact Messages ---
  getContactMessages(): ContactMessage[] {
    return this.data.contactMessages;
  }

  createContactMessage(msg: ContactMessage): ContactMessage {
    this.data.contactMessages.push(msg);
    this.save();
    return msg;
  }

  // --- Pricing Quote Calculator ---
  calculateQuote(params: {
    vehicleId: string;
    tripType: TripType;
    pickupLocation: string;
    dropLocation: string;
    pickupTime?: string;
    days?: number;
  }): {
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
  } {
    const vehicle = this.findVehicleById(params.vehicleId);
    if (!vehicle) {
      return { estimatedFare: null, breakdown: null, note: 'Vehicle not found' };
    }

    const { tripType, pickupTime, days = 1 } = params;
    let estimatedKm = 40;
    let tollTaxEstimate = 0;
    let driverAllowance = 0;
    let nightCharge = 0;

    // Check night charge (22:00 - 06:00)
    if (pickupTime) {
      const hour = parseInt(pickupTime.split(':')[0], 10);
      if (hour >= 22 || hour < 6) {
        nightCharge = 300;
      }
    }

    const lowerDrop = params.dropLocation.toLowerCase();
    const lowerPick = params.pickupLocation.toLowerCase();

    if (tripType === 'Airport Transfer' || lowerDrop.includes('airport') || lowerPick.includes('airport')) {
      estimatedKm = 30; // Babatpur Airport ~26-30 km from Lanka/Godowlia
      tollTaxEstimate = 0;
    } else if (tripType === 'Railway Station Transfer' || lowerDrop.includes('station') || lowerPick.includes('station')) {
      estimatedKm = 15;
    } else if (tripType === 'Local Sightseeing') {
      estimatedKm = 80; // Standard 8hr/80km package
    } else if (lowerDrop.includes('ayodhya') || lowerPick.includes('ayodhya')) {
      estimatedKm = 440; // Round trip Varanasi <-> Ayodhya
      driverAllowance = 400;
      tollTaxEstimate = 450;
    } else if (lowerDrop.includes('prayagraj') || lowerPick.includes('prayagraj')) {
      estimatedKm = 260; // Round trip Varanasi <-> Prayagraj
      driverAllowance = 350;
      tollTaxEstimate = 280;
    } else if (tripType === 'Outstation One-Way') {
      estimatedKm = 180;
      driverAllowance = 350;
      tollTaxEstimate = 200;
    } else if (tripType === 'Round Trip') {
      estimatedKm = 300 * Math.max(1, days);
      driverAllowance = 400 * Math.max(1, days);
      tollTaxEstimate = 400;
    }

    let estimatedFare: number;
    if (tripType === 'Local Sightseeing') {
      estimatedFare = vehicle.baseFare + nightCharge;
    } else {
      estimatedFare = Math.round(
        vehicle.baseFare +
        estimatedKm * vehicle.perKmRate +
        nightCharge +
        driverAllowance +
        tollTaxEstimate
      );
    }

    return {
      estimatedFare,
      breakdown: {
        baseFare: vehicle.baseFare,
        kmRate: vehicle.perKmRate,
        estimatedKm,
        nightCharge,
        driverAllowance,
        tollTaxEstimate
      },
      note: 'Transparent quote subject to exact route odometer readings, current toll tariffs, and parking receipts.'
    };
  }

  // --- Admin Statistics ---
  getStats() {
    const todayStr = new Date().toISOString().split('T')[0];
    const bookings = this.data.bookings;

    const todayBookings = bookings.filter(b => b.travelDate === todayStr);
    const pendingBookings = bookings.filter(b => b.status === 'PENDING');
    const confirmedBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'DRIVER_ASSIGNED');
    const completedBookings = bookings.filter(b => b.status === 'COMPLETED');
    const availableVehicles = this.data.vehicles.filter(v => v.status === 'AVAILABLE');
    const newEnquiries = this.data.enquiries.filter(e => e.status === 'New');
    const totalCustomers = this.data.users.filter(u => u.role === 'CUSTOMER').length;

    // Approximate revenue from confirmed & completed bookings with final/estimated price
    const totalRevenue = bookings
      .filter(b => b.status === 'COMPLETED' || b.status === 'CONFIRMED')
      .reduce((sum, b) => sum + (b.finalPrice || b.estimatedPrice || 0), 0);

    return {
      todayBookingsCount: todayBookings.length,
      pendingBookingsCount: pendingBookings.length,
      confirmedBookingsCount: confirmedBookings.length,
      completedBookingsCount: completedBookings.length,
      totalBookingsCount: bookings.length,
      availableVehiclesCount: availableVehicles.length,
      totalVehiclesCount: this.data.vehicles.length,
      newEnquiriesCount: newEnquiries.length,
      totalCustomersCount: totalCustomers,
      totalRevenue
    };
  }
}

export const db = new Database();
