// types/ride.ts
export type RideStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled' | 'rejected';

export interface RideFilters {
  status?: RideStatus;
  dateFrom?: string;
  dateTo?: string;
  driverId?: string;
  riderId?: string;
  minFare?: number;
  maxFare?: number;
  paymentMethod?: string;
  paymentStatus?: string;
}
// Extended interface to match API response
export interface ApiRide {
  _id: string;
  riderId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    picture?: string;
    role: string;
  };
  driverId?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    picture?: string;
    role: string;
    vehicleInfo?: {
      model: string;
      plate: string;
    };
  };
  pickupLocation: {
    address: string;
    coordinates: [number, number];
  };
  destination: {
    address: string;
    coordinates: [number, number];
  };
  distance: number;
  fare: number;
  status?: RideStatus; // Make status optional
  requestedAt: string;
  acceptedAt?: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
  paymentMethod: 'cash' | 'card' | 'mobile_wallet';
  paymentStatus: 'pending' | 'paid' | 'failed';
}
