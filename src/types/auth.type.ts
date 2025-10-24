export interface ISendOtp {
  email: string;
}

export interface IVerifyOtp {
  email: string;
  otp: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export type UserRole = 'rider' | 'driver' | 'admin';
export type UserStatus = 'active' | 'blocked' | 'suspended';
export type DriverStatus = 'online' | 'offline';

// store/slices/authSlice.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  phone?: string;
  avatar?: string;
  emergencyContact?: string; // Add this
  emergencyContacts?: EmergencyContact[]; // Add this
  driverStatus?: DriverStatus;
  licenseNumber?: string;
  vehicleInfo?: {
    model: string;
    plate: string;
    color?: string;
  };
}

// Add this interface
export interface EmergencyContact {
  name: string;
  number: string;
  type: 'personal' | 'police' | 'hospital';
  relationship?: string;
  isPrimary?: boolean;
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}