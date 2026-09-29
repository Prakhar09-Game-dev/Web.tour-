export type UserRole = 'CUSTOMER' | 'ADMIN' | 'DRIVER';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
}

export type VehicleStatus = 'AVAILABLE' | 'BOOKED' | 'MAINTENANCE' | 'INACTIVE';
export type VehicleType = 'Sedan' | 'MUV' | 'Luxury SUV' | 'Hatchback' | 'Group Tour Van';

export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  model: string;
  type: VehicleType;
  seatingCapacity: number;
  luggageCapacity: number;
  acType: string;
  features: string[];
  imageUrl: string;
  baseFare: number;
  perKmRate: number;
  perDayRate: number;
  status: VehicleStatus;
  localAvailable: boolean;
  outstationAvailable: boolean;
  description: string;
}

export type BookingStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'DRIVER_ASSIGNED'
  | 'ON_TRIP'
  | 'COMPLETED'
  | 'CANCELLED';

export type TripType =
  | 'Local Sightseeing'
  | 'Outstation One-Way'
  | 'Round Trip'
  | 'Airport Transfer'
  | 'Railway Station Transfer'
  | 'Pilgrimage Package'
  | 'Wedding & Event';

export interface Booking {
  id: string;
  customerId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleId: string;
  vehicleName: string;
  vehicleType: string;
  pickupLocation: string;
  dropLocation: string;
  travelDate: string;
  returnDate?: string;
  pickupTime: string;
  tripType: TripType;
  passengers: number;
  specialRequirements?: string;
  status: BookingStatus;
  estimatedPrice: number | null;
  finalPrice: number | null;
  notes?: string;
  driverName?: string;
  driverPhone?: string;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'New' | 'Contacted' | 'Quoted' | 'Confirmed' | 'Closed';

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  pickup: string;
  destination: string;
  date: string;
  passengers: number;
  vehiclePreference: string;
  service: string;
  message?: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface TourPackage {
  id: string;
  name: string;
  destination: string;
  duration: string;
  description: string;
  vehicleOptions: string[];
  includedServices: string[];
  excludedServices: string[];
  imageUrl: string;
  startingPrice: number | null;
  active: boolean;
  category: 'Sightseeing' | 'Pilgrimage' | 'Custom';
}

export interface Destination {
  id: string;
  name: string;
  category: 'Sightseeing' | 'Pilgrimage';
  description: string;
  imageUrl: string;
  highlights: string[];
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  vehicleOrTour: string;
  date: string;
  verified: boolean;
  approved: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Vehicles' | 'Varanasi' | 'Tours' | 'Events' | 'Pilgrimage';
  imageUrl: string;
  caption: string;
}

export interface AdminStats {
  todayBookingsCount: number;
  pendingBookingsCount: number;
  confirmedBookingsCount: number;
  completedBookingsCount: number;
  totalBookingsCount: number;
  availableVehiclesCount: number;
  totalVehiclesCount: number;
  newEnquiriesCount: number;
  totalCustomersCount: number;
  totalRevenue: number;
}
