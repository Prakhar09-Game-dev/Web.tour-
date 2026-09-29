import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { db } from './server/db.js';
import {
  hashPassword,
  verifyPassword,
  generateToken,
  authMiddleware,
  requireAuth,
  requireAdmin,
  type AuthRequest
} from './server/auth.js';
import type { BookingStatus, TripType, VehicleStatus, VehicleType } from './server/types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;
  const isProduction = process.env.NODE_ENV === 'production';

  app.use(express.json());
  app.use(authMiddleware);

  // ===================== AUTH ROUTES =====================
  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const { name, email, phone, password } = req.body;
      if (!name || !email || !password || !phone) {
        return res.status(400).json({ error: 'Name, email, phone, and password are required.' });
      }

      const existing = db.findUserByEmail(email);
      if (existing) {
        return res.status(400).json({ error: 'An account with this email already exists.' });
      }

      const { hash, salt } = hashPassword(password);
      const newUser = db.createUser({
        id: `usr-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        passwordHash: hash,
        salt,
        role: 'CUSTOMER',
        createdAt: new Date().toISOString()
      });

      const token = generateToken(newUser);
      return res.status(201).json({
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          role: newUser.role
        },
        token
      });
    } catch (err) {
      console.error('Registration error:', err);
      return res.status(500).json({ error: 'Internal server error during registration.' });
    }
  });

  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const user = db.findUserByEmail(email);
      if (!user || !verifyPassword(password, user.passwordHash, user.salt)) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      const token = generateToken(user);
      return res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role
        },
        token
      });
    } catch (err) {
      console.error('Login error:', err);
      return res.status(500).json({ error: 'Internal server error during login.' });
    }
  });

  app.get('/api/auth/me', (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.json({ user: null });
    }
    const user = db.findUserById(req.user.userId);
    if (!user) {
      return res.json({ user: null });
    }
    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role
      }
    });
  });

  // ===================== VEHICLES ROUTES =====================
  app.get('/api/vehicles', (_req: Request, res: Response) => {
    return res.json(db.getVehicles());
  });

  app.post('/api/vehicles', requireAdmin, (req: Request, res: Response) => {
    try {
      const {
        name,
        brand,
        model,
        type,
        seatingCapacity,
        luggageCapacity,
        acType,
        features,
        imageUrl,
        baseFare,
        perKmRate,
        perDayRate,
        status,
        localAvailable,
        outstationAvailable,
        description
      } = req.body;

      if (!name || !type) {
        return res.status(400).json({ error: 'Vehicle name and type are required.' });
      }

      const vehicle = db.createVehicle({
        id: `veh-${Date.now()}`,
        name,
        brand: brand || 'Maruti Suzuki',
        model: model || name,
        type: (type as VehicleType) || 'Sedan',
        seatingCapacity: Number(seatingCapacity) || 4,
        luggageCapacity: Number(luggageCapacity) || 2,
        acType: acType || 'AC',
        features: Array.isArray(features) ? features : ['AC', 'Music System'],
        imageUrl: imageUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjhN9_TWs8-IAgJRWHiKEiGET4r-WedIMlolYNBF6w1bdWAVZ5YbxA9IdVgCsddusTgGI3H8ouNshBDzIyzPM6mWR6Cqe6ttcHfd16T9m4EYYvpJOOecazlyCUnMJ5AKDKE14kCdb77O6ibiWZGez9RkMZrhTjF4MguGbvcIuS3pQQMwwlhsnxYEbsyZLhqOiwEGZuhK3PdsEwZJXnz997m5jMkeeGVaGMOtR8K08kbzS2Hb5b6Dk',
        baseFare: Number(baseFare) || 1800,
        perKmRate: Number(perKmRate) || 12,
        perDayRate: Number(perDayRate) || 2500,
        status: (status as VehicleStatus) || 'AVAILABLE',
        localAvailable: localAvailable !== false,
        outstationAvailable: outstationAvailable !== false,
        description: description || ''
      });

      return res.status(201).json(vehicle);
    } catch (err) {
      console.error('Vehicle create error:', err);
      return res.status(500).json({ error: 'Failed to create vehicle.' });
    }
  });

  app.patch('/api/vehicles/:id', requireAdmin, (req: Request, res: Response) => {
    const updated = db.updateVehicle(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }
    return res.json(updated);
  });

  app.delete('/api/vehicles/:id', requireAdmin, (req: Request, res: Response) => {
    const deleted = db.deleteVehicle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Vehicle not found.' });
    }
    return res.json({ success: true, message: 'Vehicle deleted successfully.' });
  });

  // Availability Check
  app.post('/api/vehicles/check-availability', (req: Request, res: Response) => {
    const { vehicleId, travelDate, returnDate } = req.body;
    if (!vehicleId || !travelDate) {
      return res.status(400).json({ error: 'Vehicle and travel date are required to verify availability.' });
    }
    const result = db.checkAvailability(vehicleId, travelDate, returnDate);
    return res.json(result);
  });

  // ===================== BOOKINGS ROUTES =====================
  app.get('/api/bookings', (req: AuthRequest, res: Response) => {
    const all = db.getBookings();
    // If admin, return all
    if (req.user && req.user.role === 'ADMIN') {
      return res.json(all);
    }
    // If logged-in customer, return their bookings
    if (req.user) {
      const userBookings = all.filter(
        b => b.customerId === req.user?.userId || b.customerEmail.toLowerCase() === req.user?.email.toLowerCase()
      );
      return res.json(userBookings);
    }
    // If non-authenticated query by phone/email/id parameter
    const { phone, email, bookingId } = req.query;
    if (bookingId) {
      const match = all.filter(b => b.id.toLowerCase() === String(bookingId).toLowerCase());
      return res.json(match);
    }
    if (phone || email) {
      const filtered = all.filter(b => {
        if (phone && b.customerPhone === phone) return true;
        if (email && b.customerEmail.toLowerCase() === String(email).toLowerCase()) return true;
        return false;
      });
      return res.json(filtered);
    }

    return res.json([]);
  });

  app.get('/api/bookings/:id', (req: Request, res: Response) => {
    const booking = db.findBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    return res.json(booking);
  });

  app.post('/api/bookings', (req: AuthRequest, res: Response) => {
    try {
      const {
        customerName,
        customerPhone,
        customerEmail,
        vehicleId,
        pickupLocation,
        dropLocation,
        travelDate,
        returnDate,
        pickupTime,
        tripType,
        passengers,
        specialRequirements
      } = req.body;

      if (!customerName || !customerPhone || !vehicleId || !pickupLocation || !dropLocation || !travelDate || !pickupTime) {
        return res.status(400).json({ error: 'Please provide all mandatory booking details.' });
      }

      // Check real vehicle availability
      const avail = db.checkAvailability(vehicleId, travelDate, returnDate);
      if (!avail.available) {
        return res.status(409).json({
          error: avail.reason || 'This vehicle is already booked for the selected date. Please choose another vehicle or date.'
        });
      }

      const vehicle = db.findVehicleById(vehicleId);
      if (!vehicle) {
        return res.status(404).json({ error: 'Selected vehicle not found.' });
      }

      // Calculate quote
      const quote = db.calculateQuote({
        vehicleId,
        tripType: (tripType as TripType) || 'Local Sightseeing',
        pickupLocation,
        dropLocation,
        pickupTime
      });

      const newBooking = db.createBooking({
        customerId: req.user?.userId,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: (customerEmail || req.user?.email || '').trim(),
        vehicleId,
        vehicleName: vehicle.name,
        vehicleType: vehicle.type,
        pickupLocation: pickupLocation.trim(),
        dropLocation: dropLocation.trim(),
        travelDate,
        returnDate,
        pickupTime,
        tripType: (tripType as TripType) || 'Local Sightseeing',
        passengers: Number(passengers) || 1,
        specialRequirements: specialRequirements ? specialRequirements.trim() : undefined,
        status: 'PENDING',
        estimatedPrice: quote.estimatedFare,
        finalPrice: null,
        notes: quote.note
      });

      return res.status(201).json({
        message: 'Booking request received. Our fleet manager will confirm your itinerary shortly.',
        booking: newBooking
      });
    } catch (err) {
      console.error('Booking creation error:', err);
      return res.status(500).json({ error: 'Failed to process booking request.' });
    }
  });

  app.patch('/api/bookings/:id', (req: AuthRequest, res: Response) => {
    try {
      const booking = db.findBookingById(req.params.id);
      if (!booking) {
        return res.status(404).json({ error: 'Booking not found.' });
      }

      const isAdmin = req.user?.role === 'ADMIN';
      const isOwner = req.user && (req.user.userId === booking.customerId || req.user.email === booking.customerEmail);

      // Customer can only cancel their own pending/confirmed booking
      if (!isAdmin) {
        if (!isOwner) {
          return res.status(403).json({ error: 'Unauthorized to modify this booking.' });
        }
        if (req.body.status && req.body.status !== 'CANCELLED') {
          return res.status(403).json({ error: 'Customers can only cancel bookings.' });
        }
        const updated = db.updateBooking(booking.id, {
          status: 'CANCELLED',
          notes: req.body.notes || 'Cancelled by customer'
        });
        return res.json(updated);
      }

      // Admin can update all fields
      const { status, finalPrice, driverName, driverPhone, vehicleId, notes, travelDate, pickupTime } = req.body;
      const updates: Partial<typeof booking> = {};

      if (status) updates.status = status as BookingStatus;
      if (finalPrice !== undefined) updates.finalPrice = finalPrice === null ? null : Number(finalPrice);
      if (driverName !== undefined) updates.driverName = driverName;
      if (driverPhone !== undefined) updates.driverPhone = driverPhone;
      if (notes !== undefined) updates.notes = notes;
      if (travelDate !== undefined) updates.travelDate = travelDate;
      if (pickupTime !== undefined) updates.pickupTime = pickupTime;

      if (vehicleId && vehicleId !== booking.vehicleId) {
        const newVeh = db.findVehicleById(vehicleId);
        if (newVeh) {
          updates.vehicleId = newVeh.id;
          updates.vehicleName = newVeh.name;
          updates.vehicleType = newVeh.type;
        }
      }

      const updated = db.updateBooking(booking.id, updates);
      return res.json(updated);
    } catch (err) {
      console.error('Booking update error:', err);
      return res.status(500).json({ error: 'Failed to update booking.' });
    }
  });

  // Cancel booking DELETE
  app.delete('/api/bookings/:id', (req: AuthRequest, res: Response) => {
    const booking = db.findBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found.' });
    }
    const updated = db.updateBooking(booking.id, {
      status: 'CANCELLED',
      notes: 'Booking cancelled.'
    });
    return res.json({ message: 'Booking has been cancelled.', booking: updated });
  });

  // ===================== QUOTE CALCULATOR =====================
  app.post('/api/quotes/calculate', (req: Request, res: Response) => {
    try {
      const { vehicleId, tripType, pickupLocation, dropLocation, pickupTime, days } = req.body;
      if (!vehicleId) {
        return res.status(400).json({ error: 'Vehicle is required for quotation.' });
      }
      const quote = db.calculateQuote({
        vehicleId,
        tripType: (tripType as TripType) || 'Local Sightseeing',
        pickupLocation: pickupLocation || 'Varanasi',
        dropLocation: dropLocation || 'Varanasi',
        pickupTime,
        days: Number(days) || 1
      });
      return res.json(quote);
    } catch (err) {
      console.error('Quote calculation error:', err);
      return res.status(500).json({ error: 'Failed to calculate quote.' });
    }
  });

  // ===================== ENQUIRIES ROUTES =====================
  app.get('/api/enquiries', requireAdmin, (_req: Request, res: Response) => {
    return res.json(db.getEnquiries());
  });

  app.post('/api/enquiries', (req: Request, res: Response) => {
    try {
      const { name, phone, email, pickup, destination, date, passengers, vehiclePreference, service, message } = req.body;
      if (!name || !phone || !pickup || !destination) {
        return res.status(400).json({ error: 'Name, phone, pickup, and destination are required.' });
      }

      const enquiry = db.createEnquiry({
        name: name.trim(),
        phone: phone.trim(),
        email: email ? email.trim() : undefined,
        pickup: pickup.trim(),
        destination: destination.trim(),
        date: date || new Date().toISOString().split('T')[0],
        passengers: Number(passengers) || 1,
        vehiclePreference: vehiclePreference || 'Any Available',
        service: service || 'General Enquiry',
        message: message ? message.trim() : undefined,
        status: 'New'
      });

      return res.status(201).json({
        message: 'Enquiry submitted successfully. Our team will contact you within 15 minutes.',
        enquiry
      });
    } catch (err) {
      console.error('Enquiry error:', err);
      return res.status(500).json({ error: 'Failed to submit enquiry.' });
    }
  });

  app.patch('/api/enquiries/:id', requireAdmin, (req: Request, res: Response) => {
    const updated = db.updateEnquiry(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    return res.json(updated);
  });

  // ===================== TOUR PACKAGES & DESTINATIONS =====================
  app.get('/api/tour-packages', (_req: Request, res: Response) => {
    return res.json(db.getTourPackages());
  });

  app.post('/api/tour-packages', requireAdmin, (req: Request, res: Response) => {
    const pkg = db.createTourPackage({
      id: `pkg-${Date.now()}`,
      name: req.body.name,
      destination: req.body.destination,
      duration: req.body.duration,
      description: req.body.description,
      vehicleOptions: req.body.vehicleOptions || ['Sedan', 'SUV'],
      includedServices: req.body.includedServices || [],
      excludedServices: req.body.excludedServices || [],
      imageUrl: req.body.imageUrl || '',
      startingPrice: req.body.startingPrice ? Number(req.body.startingPrice) : null,
      active: req.body.active !== false,
      category: req.body.category || 'Sightseeing'
    });
    return res.status(201).json(pkg);
  });

  app.patch('/api/tour-packages/:id', requireAdmin, (req: Request, res: Response) => {
    const updated = db.updateTourPackage(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Package not found' });
    return res.json(updated);
  });

  app.get('/api/destinations', (_req: Request, res: Response) => {
    return res.json(db.getDestinations());
  });

  // ===================== REVIEWS & GALLERY =====================
  app.get('/api/reviews', (_req: Request, res: Response) => {
    return res.json(db.getReviews());
  });

  app.post('/api/reviews', (req: Request, res: Response) => {
    const { customerName, rating, comment, vehicleOrTour } = req.body;
    if (!customerName || !rating || !comment) {
      return res.status(400).json({ error: 'Name, rating, and review text are required.' });
    }

    const review = db.createReview({
      id: `rev-${Date.now()}`,
      customerName: customerName.trim(),
      rating: Math.min(5, Math.max(1, Number(rating))),
      comment: comment.trim(),
      vehicleOrTour: vehicleOrTour || 'Varanasi Tour',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      verified: true,
      approved: true
    });

    return res.status(201).json({ message: 'Thank you for your review!', review });
  });

  app.get('/api/gallery', (_req: Request, res: Response) => {
    return res.json(db.getGallery());
  });

  app.post('/api/gallery', requireAdmin, (req: Request, res: Response) => {
    const item = db.createGalleryItem({
      id: `gal-${Date.now()}`,
      title: req.body.title || 'Varanasi Journey',
      category: req.body.category || 'Vehicles',
      imageUrl: req.body.imageUrl,
      caption: req.body.caption || ''
    });
    return res.status(201).json(item);
  });

  // ===================== CONTACT MESSAGES =====================
  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ error: 'Name, phone, and message are required.' });
    }

    const contact = db.createContactMessage({
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: (email || '').trim(),
      phone: phone.trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    });

    return res.status(201).json({ message: 'Message sent successfully. We will get back to you shortly.', contact });
  });

  // ===================== ADMIN STATS =====================
  app.get('/api/admin/stats', requireAdmin, (_req: Request, res: Response) => {
    return res.json(db.getStats());
  });

  // ===================== FRONTEND SERVING =====================
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`> Vimal Tour & Travellers server listening on port ${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
